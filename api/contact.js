const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "gabrielhalim01@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Gabriel-Halim <onboarding@resend.dev>";

function cleanText(value, maxLength) {
    return String(value || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
}

function cleanMessage(value, maxLength) {
    return String(value || "")
        .replace(/\r/g, "")
        .trim()
        .slice(0, maxLength);
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

function getHeader(headers, name) {
    return headers?.[name] || headers?.[name.toLowerCase()] || "";
}

function isAllowedOrigin(req) {
    const origin = getHeader(req.headers, "origin");
    if (!origin) return true;

    const host = getHeader(req.headers, "x-forwarded-host") || getHeader(req.headers, "host");
    if (!host) return false;

    try {
        return new URL(origin).host === host;
    } catch {
        return false;
    }
}

async function readBody(req) {
    if (!req.body) return {};
    if (typeof req.body === "object") return req.body;

    try {
        return JSON.parse(req.body);
    } catch {
        return {};
    }
}

module.exports = async function contactHandler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ message: "Méthode non autorisée." });
    }

    if (!isAllowedOrigin(req)) {
        return res.status(403).json({ message: "Origine non autorisée." });
    }

    const contentType = getHeader(req.headers, "content-type");
    if (!contentType.includes("application/json")) {
        return res.status(415).json({ message: "Format non supporté." });
    }

    if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ message: "Configuration email manquante." });
    }

    const body = await readBody(req);
    const honeypot = cleanText(body.company, 120);
    if (honeypot) {
        return res.status(200).json({ message: "Demande envoyée." });
    }

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 180).toLowerCase();
    const project = cleanText(body.project, 100);
    const message = cleanMessage(body.message, 2400);

    if (!name || !isValidEmail(email) || !project || message.length < 12) {
        return res.status(400).json({ message: "Vérifie les champs du formulaire." });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
    const subject = `Nouvelle demande portfolio - ${project}`;
    const text = [
        "Nouvelle demande depuis le portfolio",
        "",
        `Nom : ${name}`,
        `Email : ${email}`,
        `Projet : ${project}`,
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
            <div style="margin-top:18px;padding:16px;border:1px solid #d8e2dc;border-radius:8px;background:#f5f7f3">
                ${escapeHTML(message).replace(/\n/g, "<br>")}
            </div>
        </div>
    `;

    try {
        const response = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Resend delivery failed", response.status, errorText);
            return res.status(502).json({ message: "Le message n'a pas pu être envoyé pour le moment." });
        }

        return res.status(200).json({ message: "Demande envoyée." });
    } catch (error) {
        console.error("Contact form error", error);
        return res.status(500).json({ message: "Erreur d'envoi. Réessaie dans quelques minutes." });
    }
};
