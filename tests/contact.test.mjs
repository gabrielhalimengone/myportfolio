import assert from "node:assert/strict";
import test from "node:test";
import { onRequest } from "../functions/api/contact.js";

const origin = "https://portfolio.example";
const env = {
    RESEND_API_KEY: "test-only-key",
    CONTACT_FROM_EMAIL: "Portfolio <contact@example.com>",
    CONTACT_TO_EMAIL: "owner@example.com"
};
const validBody = {
    name: "Test Visitor",
    email: "visitor@example.com",
    project: "Site vitrine",
    objective: "Creer une interface",
    message: "Un message de test suffisamment long."
};

function call({ method = "POST", body = validBody, headers = {}, bindings = env, raw } = {}) {
    return onRequest({
        env: bindings,
        request: new Request(`${origin}/api/contact`, {
            method,
            headers: { "Content-Type": "application/json", Origin: origin, ...headers },
            ...(method === "GET" ? {} : { body: raw ?? JSON.stringify(body) })
        })
    });
}

test("rejects methods, foreign origins and unsupported content types", async () => {
    const method = await call({ method: "GET" });
    assert.equal(method.status, 405);
    assert.equal(method.headers.get("allow"), "POST");
    assert.equal((await call({ headers: { Origin: "https://other.example" } })).status, 403);
    assert.equal((await call({ headers: { Origin: "http://portfolio.example" } })).status, 403);
    assert.equal((await call({ headers: { "Content-Type": "text/plain" } })).status, 415);
});

test("rejects malformed, oversized and invalid payloads before sending", async t => {
    const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected send"); });
    for (const raw of ["{", "null", "[]"]) assert.equal((await call({ raw })).status, 400);
    assert.equal((await call({ raw: "x".repeat(12_001) })).status, 413);
    assert.equal((await call({ headers: { "Content-Length": "12001" } })).status, 413);
    for (const body of [
        { ...validBody, name: {} },
        { ...validBody, email: "invalid" },
        { ...validBody, objective: "" },
        { ...validBody, message: "short" }
    ]) assert.equal((await call({ body })).status, 400);
    assert.equal(fetchMock.mock.callCount(), 0);
});

test("honeypot returns a neutral success without contacting Resend", async t => {
    const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected send"); });
    assert.equal((await call({ body: { company: "spam" }, bindings: {} })).status, 200);
    assert.equal(fetchMock.mock.callCount(), 0);
});

test("requires server-side credentials and a configured sender", async t => {
    const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected send"); });
    assert.equal((await call({ bindings: {} })).status, 500);
    assert.equal((await call({ bindings: { RESEND_API_KEY: "test-only-key" } })).status, 500);
    assert.equal(fetchMock.mock.callCount(), 0);
});

test("sends to the configured owner, sets reply_to and escapes submitted HTML", async t => {
    const fetchMock = t.mock.method(globalThis, "fetch", async () => Response.json({ id: "fake-id" }));
    const response = await call({ body: {
        ...validBody,
        name: "<script>alert(1)</script>",
        email: "Visitor@Example.com",
        message: "<b>Bonjour</b>\nUn projet web.",
        to: "attacker@example.com",
        from: "attacker@example.com"
    } });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const [url, options] = fetchMock.mock.calls[0].arguments;
    const payload = JSON.parse(options.body);
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options.headers.Authorization, "Bearer test-only-key");
    assert.deepEqual(payload.to, ["owner@example.com"]);
    assert.equal(payload.from, env.CONTACT_FROM_EMAIL);
    assert.equal(payload.reply_to, "visitor@example.com");
    assert.ok(payload.html.includes("&lt;script&gt;"));
    assert.ok(payload.html.includes("&lt;b&gt;Bonjour&lt;/b&gt;<br>"));
    assert.ok(!payload.html.includes("<script>"));
    assert.ok(!JSON.stringify(await response.json()).includes("test-only-key"));
});

test("handles Resend rejection and network failure without exposing upstream details", async t => {
    const fetchMock = t.mock.method(globalThis, "fetch", async () =>
        new Response("private upstream details", { status: 403 }));
    const rejected = await call();
    assert.equal(rejected.status, 502);
    assert.ok(!(await rejected.text()).includes("private upstream details"));
    fetchMock.mock.mockImplementation(async () => { throw new Error("private network details"); });
    const failed = await call();
    assert.equal(failed.status, 500);
    assert.ok(!(await failed.text()).includes("private network details"));
});
