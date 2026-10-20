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
        "GABRIEL-HALIM | PORTFOLIO",
        "Nouvelle demande de projet",
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
    const replySubject = encodeURIComponent(`Re : ${subject}`);
    const replyUrl = `mailto:${encodeURIComponent(email)}?subject=${replySubject}`;
    const html = `
        <div style="margin:0;padding:32px 14px;background:#f1f3f8;font-family:Arial,Helvetica,sans-serif;color:#182039">
            <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden">Nouvelle demande de ${escapeHTML(project)} envoyée depuis le portfolio de Gabriel.</span>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #e2e6ef;border-radius:12px;overflow:hidden">
                <tr><td style="height:4px;background:#7c5cff;font-size:0;line-height:0">&nbsp;</td></tr>
                <tr><td style="padding:26px 30px 28px;background:#0b1020;color:#f5f6fb">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
                        <td style="width:46px;vertical-align:top"><div style="width:38px;height:38px;border-radius:9px;background:#7c5cff;color:#ffffff;text-align:center;font-size:17px;font-weight:700;line-height:38px">GH</div></td>
                        <td style="vertical-align:middle"><div style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.2px;color:#c7b8ff">GABRIEL-HALIM</div><div style="font-size:12px;line-height:18px;color:#aeb6cb">PORTFOLIO · NOUVELLE DEMANDE</div></td>
                    </tr></table>
                    <h1 style="margin:25px 0 7px;font-size:25px;line-height:32px;font-weight:700;color:#ffffff">Une nouvelle demande de projet</h1>
                    <p style="margin:0;font-size:15px;line-height:23px;color:#c1c8d9">${escapeHTML(project)} <span style="color:#7f8aa6">·</span> reçue depuis le formulaire du portfolio</p>
                </td></tr>
                <tr><td style="padding:25px 30px 30px">
                    <p style="margin:0 0 16px;font-size:13px;line-height:20px;color:#66718a">Coordonnées et détails transmis par le visiteur</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e5e8f0;border-radius:8px">
                        <tr><td style="width:34%;padding:12px 14px;border-bottom:1px solid #e9ecf2;font-size:12px;color:#737d94">NOM</td><td style="padding:12px 14px;border-bottom:1px solid #e9ecf2;font-size:14px;font-weight:700;color:#182039">${escapeHTML(name)}</td></tr>
                        <tr><td style="padding:12px 14px;border-bottom:1px solid #e9ecf2;font-size:12px;color:#737d94">E-MAIL</td><td style="padding:12px 14px;border-bottom:1px solid #e9ecf2;font-size:14px;color:#182039"><a href="mailto:${escapeHTML(email)}" style="color:#6042d8;text-decoration:underline">${escapeHTML(email)}</a></td></tr>
                        <tr><td style="padding:12px 14px;border-bottom:1px solid #e9ecf2;font-size:12px;color:#737d94">OBJECTIF</td><td style="padding:12px 14px;border-bottom:1px solid #e9ecf2;font-size:14px;color:#182039">${escapeHTML(objective)}</td></tr>
                        <tr><td style="padding:12px 14px;font-size:12px;color:#737d94">BUDGET · DÉLAI</td><td style="padding:12px 14px;font-size:14px;color:#182039">${escapeHTML(budget || "À définir")} <span style="color:#aab1c0">·</span> ${escapeHTML(timeline || "À définir")}</td></tr>
                    </table>
                    <h2 style="margin:24px 0 9px;font-size:14px;line-height:20px;color:#182039">Son message</h2>
                    <div style="padding:16px 18px;border-left:3px solid #7c5cff;border-radius:5px;background:#f5f6fa;font-size:14px;line-height:23px;color:#303a52;white-space:normal">${escapeHTML(message).replace(/\n/g, "<br>")}</div>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:24px 0 0"><tr><td style="border-radius:7px;background:#7c5cff"><a href="${escapeHTML(replyUrl)}" style="display:inline-block;padding:12px 18px;color:#ffffff;font-size:14px;line-height:20px;font-weight:700;text-decoration:none">Répondre à ${escapeHTML(name)}</a></td></tr></table>
                    <p style="margin:10px 0 0;font-size:12px;line-height:18px;color:#788198">La réponse sera adressée directement à ${escapeHTML(email)}.</p>
                </td></tr>
                <tr><td style="padding:15px 30px;border-top:1px solid #e9ecf2;background:#fafbfc;font-size:11px;line-height:17px;color:#8991a3">Message envoyé depuis le formulaire de contact de <span style="color:#4b5570">Gabriel-Halim · Développeur front-end</span></td></tr>
            </table>
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
