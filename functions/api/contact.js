const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "gabrielhalim01@gmail.com";
const MAX_BODY_LENGTH = 12_000;

function jsonResponse(body, status = 200, headers = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers }
    });
}

function cleanText(value, maxLength) {
    return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maxLength) : "";
}

function cleanMessage(value, maxLength) {
    return typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, maxLength) : "";
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAllowedOrigin(request) {
    const origin = request.headers.get("origin");
    if (!origin) return true;

    try {
        return new URL(origin).origin === new URL(request.url).origin;
    } catch {
        return false;
    }
}

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method !== "POST") {
        return jsonResponse({ message: "Méthode non autorisée." }, 405, { Allow: "POST" });
    }

    if (!isAllowedOrigin(request)) {
        return jsonResponse({ message: "Origine non autorisée." }, 403);
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
        return jsonResponse({ message: "Format non supporté." }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_LENGTH) {
        return jsonResponse({ message: "Le message est trop volumineux." }, 413);
    }

    let body;
    try {
        const rawBody = await request.text();
        if (rawBody.length > MAX_BODY_LENGTH) {
            return jsonResponse({ message: "Le message est trop volumineux." }, 413);
        }
        body = JSON.parse(rawBody);
    } catch {
        return jsonResponse({ message: "Requête invalide." }, 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return jsonResponse({ message: "Requête invalide." }, 400);
    }

    const honeypot = cleanText(body.company, 120);
    if (honeypot) {
        return jsonResponse({ message: "Demande envoyée." });
    }

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 180).toLowerCase();
    const project = cleanText(body.project, 100);
    const objective = cleanText(body.objective, 140);
    const budget = cleanText(body.budget, 80);
    const timeline = cleanText(body.timeline, 80);
    const message = cleanMessage(body.message, 2400);

    if (!name || !isValidEmail(email) || !project || !objective || message.length < 12) {
        return jsonResponse({ message: "Vérifie les champs du formulaire." }, 400);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
        return jsonResponse({ message: "Configuration email manquante." }, 500);
    }

    const toEmail = env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
    const fromEmail = env.CONTACT_FROM_EMAIL;
    const subject = `Nouvelle demande portfolio - ${project}`;
    const text = [
        "Nouvelle demande depuis le portfolio",
        "",
        `Nom : ${name}`,
        `Email : ${email}`,
        `Projet : ${project}`,
        `Objectif : ${objective}`,
        `Budget : ${budget || "À définir"}`,
        `Délai : ${timeline || "À définir"}`,
        "",
        "Message :",
        message
    ].join("\n");
    const html = `
        <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#101a18">
            <h1 style="font-size:22px;margin:0 0 18px">Nouvelle demande portfolio</h1>
            <p><strong>Nom :</strong> ${escapeHTML(name)}</p>
            <p><strong>Email :</strong> <a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a></p>
            <p><strong>Projet :</strong> ${escapeHTML(project)}</p>
            <p><strong>Objectif :</strong> ${escapeHTML(objective)}</p>
            <p><strong>Budget :</strong> ${escapeHTML(budget || "À définir")}</p>
            <p><strong>Délai :</strong> ${escapeHTML(timeline || "À définir")}</p>
            <div style="margin-top:18px;padding:16px;border:1px solid #d8e2dc;border-radius:8px;background:#f5f7f3">
                ${escapeHTML(message).replace(/\n/g, "<br>")}
            </div>
        </div>
    `;

    try {
        const resendResponse = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            signal: AbortSignal.timeout(10_000),
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [toEmail],
                reply_to: email,
                subject,
                text,
                html
            })
        });

        if (!resendResponse.ok) {
            return jsonResponse({ message: "Le message n'a pas pu être envoyé pour le moment." }, 502);
        }

        return jsonResponse({ message: "Demande envoyée." });
    } catch {
        return jsonResponse({ message: "Erreur d'envoi. Réessaie dans quelques minutes." }, 500);
    }
}
