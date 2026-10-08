import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const projectOptions = ["Site vitrine", "Interface web", "Refonte UI", "Mission frontend", "Autre collaboration"];
const objectiveOptions = ["Créer une interface", "Améliorer une interface existante", "Créer un prototype"];
const budgetOptions = ["À définir", "1 000 - 3 000 €", "3 000 € et plus"];
const timelineOptions = ["À définir", "Moins d'un mois", "1 à 3 mois", "Plus de 3 mois"];

function ContactForm() {
    const [channel, setChannel] = useState("email");
    const [status, setStatus] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);

    const clearError = (event) => {
        event.currentTarget.removeAttribute("aria-invalid");
        if (status.type === "error") setStatus({ message: "", type: "" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const fields = [...form.querySelectorAll("input:not([tabindex='-1']), select, textarea")];
        fields.forEach(field => field.setAttribute("aria-invalid", String(!field.checkValidity())));
        const firstInvalid = fields.find(field => !field.checkValidity());
        if (firstInvalid) {
            setStatus({ message: "Complète les champs requis pour envoyer la demande.", type: "error" });
            firstInvalid.focus({ preventScroll: false });
            return;
        }

        const payload = Object.fromEntries(new FormData(form).entries());
        if (payload.channel === "whatsapp") {
            const phoneDigits = String(payload.phone || "").replace(/\D/g, "");
            if (phoneDigits.length < 8 || phoneDigits.length > 15) {
                document.getElementById("contact-phone")?.setAttribute("aria-invalid", "true");
                setStatus({ message: "Indique un numéro WhatsApp valide avec son indicatif pays.", type: "error" });
                document.getElementById("contact-phone")?.focus({ preventScroll: false });
                return;
            }
            const whatsappMessage = [
                "Bonjour Gabriel,", "", `Je vous contacte au sujet de : ${payload.project}.`,
                `Objectif : ${payload.objective}.`, `Budget : ${payload.budget || "À définir"}.`,
                `Délai : ${payload.timeline || "À définir"}.`, `Mon numéro WhatsApp : ${payload.phone}.`, "",
                payload.message, "", `Nom : ${payload.name}`, `Email : ${payload.email}`
            ].join("\n");
            window.open(`https://wa.me/212674346915?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
            form.reset();
            setChannel("email");
            setStatus({ message: "WhatsApp est prêt avec votre demande préremplie.", type: "success" });
            return;
        }

        setLoading(true);
        setStatus({ message: "", type: "" });
        try {
            const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.message || "Le message n'a pas pu être envoyé.");
            form.reset();
            setChannel("email");
            setStatus({ message: "Message envoyé. Je reviens vers vous rapidement.", type: "success" });
        } catch (error) {
            setStatus({ message: error.message || "Erreur d'envoi. Réessaie dans quelques minutes.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const select = (id, name, label, options, required = false) => <label htmlFor={id}>{label}<select id={id} name={name} required={required} defaultValue={required ? "" : options[0]} onChange={clearError}><option value="" disabled={required}>Choisir {label.toLowerCase()}</option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select></label>;

    return <form className="contact-form" id="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-heading"><span>Brief rapide</span><strong>Réponse sous 24-48h</strong></div>
        <div className="form-grid">
            <label htmlFor="contact-name">Nom<input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Votre nom" required onInput={clearError} /></label>
            <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="vous@email.com" required onInput={clearError} /></label>
        </div>
        {select("contact-project", "project", "Projet", projectOptions, true)}
        <div className="form-grid">{select("contact-objective", "objective", "Objectif", objectiveOptions, true)}{select("contact-budget", "budget", "Budget indicatif", budgetOptions)}</div>
        {select("contact-timeline", "timeline", "Délai souhaité", timelineOptions)}
        <fieldset className="contact-channel"><legend>Recevoir une réponse par</legend><div className="channel-options">
            <label className="channel-option" htmlFor="contact-channel-email"><input id="contact-channel-email" name="channel" type="radio" value="email" checked={channel === "email"} onChange={(event) => setChannel(event.target.value)} /><span>Email</span></label>
            <label className="channel-option" htmlFor="contact-channel-whatsapp"><input id="contact-channel-whatsapp" name="channel" type="radio" value="whatsapp" checked={channel === "whatsapp"} onChange={(event) => setChannel(event.target.value)} /><span>WhatsApp</span></label>
        </div><p className="channel-hint">WhatsApp ouvrira une conversation préremplie ; il restera à appuyer sur Envoyer.</p></fieldset>
        {channel === "whatsapp" && <label id="contact-phone-field" htmlFor="contact-phone">Numéro WhatsApp<input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Ex. +212 6 00 00 00 00" required onInput={clearError} /></label>}
        <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows="5" placeholder="Objectif, délai, contexte du projet..." required onInput={clearError}></textarea></label>
        <label className="form-honeypot" htmlFor="contact-company" aria-hidden="true">Société<input id="contact-company" name="company" type="text" tabIndex="-1" autoComplete="off" /></label>
        <button className="button primary" type="submit" disabled={loading}>{loading ? "Envoi en cours..." : "Envoyer la demande"}</button>
        <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>
    </form>;
}

const root = document.getElementById("contact-react-root");
if (root) createRoot(root).render(<ContactForm />);
