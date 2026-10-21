import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const origin = "https://gabriel-halim-portfolio.pages.dev";

test("homepage has one descriptive heading and retains Google verification", () => {
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /<h1[^>]*>Développeur front-end à Casablanca/);
    assert.match(html, /name="google-site-verification" content="9AL40kXtD2xEu3FGGi-eggtDQlcEEiVyCNeya663VV8"/);
    assert.match(html, /Gabriel-Halim Endam'Engone/);
});

test("metadata and crawl files use the same production origin", () => {
    assert.ok(html.includes(`<link rel="canonical" href="${origin}/">`));
    assert.ok(html.includes(`<meta property="og:url" content="${origin}/">`));
    for (const name of ["index.html", "robots.txt", "sitemap.xml"]) {
        const text = readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
        assert.ok(text.includes(origin));
        assert.ok(!text.includes("myportfolio-nu-red.vercel.app"));
    }
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(graph["@graph"].find(item => item["@type"] === "Person").url, `${origin}/`);
});

test("search description and social preview describe the portfolio", () => {
    const description = html.match(/name="description"\s+content="([^"]+)"/)[1];
    assert.ok(description.length >= 120 && description.length <= 165);
    assert.match(description, /React/);
    assert.match(html, /property="og:image:alt"/);
    assert.match(html, /name="twitter:image"/);
});
