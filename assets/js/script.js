const projects = [
    {
        id: 0,
        kicker: "Application mobile",
        title: "TransFlash",
        role: "Flutter · Dart · UX mobile",
        desc: "Application de transfert d'argent pensée autour d'un parcours sensible : montant, pays, bénéficiaire, confirmation, puis validation côté admin.",
        points: [
            "Découpage en étapes pour éviter les erreurs avant validation d'une transaction.",
            "UI sombre et contrastée pour faire ressortir les montants, statuts et actions critiques.",
            "Écrans admin séparés pour valider, refuser et suivre les flux côté opération."
        ],
        tags: ["Flutter", "Dart", "Mobile", "UX/UI", "API REST"],
        media: [
            {
                src: "assets/img/transflash/transflash-01-auth-welcome.jpeg",
                title: "Accueil",
                alt: "Ecran d'accueil TransFlash avec actions creer un compte et se connecter"
            },
            {
                src: "assets/img/transflash/transflash-02-user-home-balance.jpeg",
                title: "Espace client",
                alt: "Tableau de bord client TransFlash avec solde et activite recente"
            },
            {
                src: "assets/img/transflash/transflash-03-send-amount-empty.jpeg",
                title: "Montant vide",
                alt: "Etape de saisie du montant TransFlash avant selection du montant"
            },
            {
                src: "assets/img/transflash/transflash-04-send-country-dropdown.jpeg",
                title: "Choix pays",
                alt: "Menu de selection pays dans le parcours d'envoi TransFlash"
            },
            {
                src: "assets/img/transflash/transflash-05-send-amount-filled.jpeg",
                title: "Montant rempli",
                alt: "Etape montant TransFlash avec calcul du montant recu"
            },
            {
                src: "assets/img/transflash/transflash-06-send-beneficiary.jpeg",
                title: "Beneficiaire",
                alt: "Formulaire beneficiaire TransFlash avec nom complet et telephone"
            },
            {
                src: "assets/img/transflash/transflash-07-send-summary.jpeg",
                title: "Recapitulatif",
                alt: "Recapitulatif du transfert TransFlash avant confirmation"
            },
            {
                src: "assets/img/transflash/transflash-08-send-success.jpeg",
                title: "Confirmation",
                alt: "Ecran de succes TransFlash indiquant une demande envoyee"
            },
            {
                src: "assets/img/transflash/transflash-09-admin-dashboard.jpeg",
                title: "Admin dashboard",
                alt: "Tableau de bord administrateur TransFlash avec volume et validations"
            },
            {
                src: "assets/img/transflash/transflash-10-admin-transactions.jpeg",
                title: "Transactions",
                alt: "Liste des transactions administrateur TransFlash avec actions valider et refuser"
            },
            {
                src: "assets/img/transflash/transflash-11-admin-clients.jpeg",
                title: "Clients",
                alt: "Liste des clients dans l'espace administrateur TransFlash"
            },
            {
                src: "assets/img/transflash/transflash-12-admin-new-member.jpeg",
                title: "Nouveau membre",
                alt: "Modale d'ajout de membre dans l'espace administrateur TransFlash"
            }
        ],
        link: null,
        linkLabel: "",
        sourceLink: null,
        sourceLabel: ""
    },
    {
        id: 1,
        kicker: "Site vitrine React",
        title: "FitZone",
        role: "React · JavaScript · Responsive",
        desc: "Site vitrine React pour transformer une offre fitness en parcours clair : découverte, preuve, planning, contact.",
        points: [
            "Sections modulaires pour réorganiser l'offre sans réécrire la page.",
            "CTA répétés mais contenus pour guider l'utilisateur sans bruit visuel.",
            "Responsive pensé pour une consultation rapide sur mobile avant inscription."
        ],
        tags: ["React", "JavaScript", "CSS", "Responsive"],
        link: "https://fitzone-pink.vercel.app/",
        linkLabel: "Voir en ligne",
        sourceLink: "https://github.com/gabrielhalimengone/fitzone",
        sourceLabel: "Code source"
    },
    {
        id: 2,
        kicker: "Collection web",
        title: "Vitrine Digitale",
        role: "HTML · CSS · JavaScript",
        desc: "Landing page de service digital centrée sur la clarté de l'offre, la confiance et la conversion.",
        points: [
            "HTML sémantique pour hiérarchiser l'offre et améliorer la lecture SEO.",
            "Animations CSS légères pour enrichir l'expérience sans ralentir la page.",
            "Formes et espacements calibrés pour garder une page lisible sur petits écrans."
        ],
        tags: ["HTML", "CSS", "JavaScript", "SEO"],
        link: "https://vitrine-digitale.vercel.app/",
        linkLabel: "Voir en ligne",
        sourceLink: "https://github.com/gabrielhalimengone/vitrine-digitale",
        sourceLabel: "Code source"
    },
    {
        id: 3,
        kicker: "Python tooling",
        title: "PyGames Pack",
        role: "Python · Algorithmique",
        desc: "Pack de mini-jeux Python pour montrer la logique d'état, les règles et les interactions au-delà d'une interface web.",
        points: [
            "Gestion de scoring, tours de jeu, erreurs et conditions de victoire.",
            "Séparation des règles pour rendre chaque mini-jeu plus simple à maintenir.",
            "Captures ajoutées pour rendre le résultat compréhensible sans lancer Python."
        ],
        tags: ["Python", "Tkinter", "Algorithmes"],
        media: [
            {
                src: "assets/img/pygames/pygames-01-snake.png",
                title: "Snake",
                alt: "Capture du mini-jeu Snake avec score, record, niveau et plateau de jeu",
                orientation: "landscape"
            },
            {
                src: "assets/img/pygames/pygames-02-morpion.png",
                title: "Morpion",
                alt: "Capture du mini-jeu Morpion en terminal avec plateau et score",
                orientation: "landscape"
            },
            {
                src: "assets/img/pygames/pygames-03-quiz-python.png",
                title: "Quiz Python",
                alt: "Capture du quiz Python en terminal avec question et reponse",
                orientation: "landscape"
            },
            {
                src: "assets/img/pygames/pygames-04-pendu.png",
                title: "Pendu",
                alt: "Capture du jeu Pendu en terminal avec mot, vies et lettres ratees",
                orientation: "landscape"
            }
        ],
        link: null,
        linkLabel: "",
        sourceLink: null,
        sourceLabel: ""
    },
    {
        id: 4,
        kicker: "Dashboard opérationnel",
        title: "Event Live Board",
        role: "Régie LED · Coordination · Live",
        desc: "Outil de coordination pour événements live, pensé pour transformer une régie technique en checklist exploitable.",
        points: [
            "Modèle de suivi orienté incidents, priorités et validation avant exploitation.",
            "Interface volontairement dense pour des équipes qui consultent vite pendant le live.",
            "Structure prête à brancher sur des données terrain ou une API d'exploitation."
        ],
        tags: ["Novastar", "Dashboard", "Ops", "Live"],
        link: "https://event-live-ruddy.vercel.app/",
        linkLabel: "Voir en ligne",
        sourceLink: "https://github.com/gabrielhalimengone/event-live",
        sourceLabel: "Code source"
    },
    {
        id: 5,
        kicker: "Plateforme éducative",
        title: "Mon Sikolo",
        role: "HTML · CSS · PHP · SQL",
        desc: "Plateforme éducative orientée parcours étudiant, avec une attention portée aux contenus, accès et corrections UI.",
        points: [
            "Organisation des écrans autour des besoins étudiants plutôt que des modules techniques.",
            "Travail PHP/SQL pour relier interface, contenus et comportements fonctionnels.",
            "Améliorations de lisibilité pour rendre l'outil plus accessible aux non-techniciens."
        ],
        tags: ["PHP", "SQL", "UX", "JavaScript"],
        link: "https://mon-sikolo.vercel.app/",
        linkLabel: "Voir en ligne",
        sourceLink: "https://github.com/gabrielhalimengone/Mon-sikolo",
        sourceLabel: "Code source"
    },
    {
        id: 6,
        kicker: "Dashboard IT live",
        title: "Nexus IT Dashboard",
        role: "HTML · CSS · JavaScript · Vercel",
        desc: "Dashboard web pour piloter un projet IT avec plusieurs vues métier sans perdre le contexte de l'équipe.",
        points: [
            "Choix d'une navigation latérale persistante pour garder la lecture SaaS immédiate.",
            "Découpage des vues Kanban, sprint et reporting pour limiter la surcharge cognitive.",
            "Données simulées structurées pour montrer le raisonnement produit avant branchement API."
        ],
        tags: ["HTML", "CSS", "JavaScript", "Dashboard", "Vercel"],
        link: "https://nx-dash-it.vercel.app/",
        linkLabel: "Voir en ligne",
        sourceLink: "https://github.com/gabrielhalimengone/nx-dash-it",
        sourceLabel: "Code source"
    },
    {
        id: 7,
        kicker: "Landing événementielle",
        title: "TechFest",
        role: "React · Vite · Tailwind CSS",
        desc: "Landing page événementielle conçue comme une vitrine immersive, avec galerie et animations contrôlées.",
        points: [
            "Build Vite pour itérer vite sur une interface React légère.",
            "Tailwind utilisé pour garder une cohérence d'espacements et de composants.",
            "Animations limitées aux zones utiles pour conserver une navigation fluide."
        ],
        tags: ["React", "Vite", "Tailwind", "Landing"],
        link: "https://festival-six-eta.vercel.app/",
        linkLabel: "Voir en ligne",
        sourceLink: "https://github.com/gabrielhalimengone/festival",
        sourceLabel: "Code source"
    }
];

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const modal = document.getElementById("projectModal");
const modalPanel = modal?.querySelector(".modal-panel");
const closeButton = modal?.querySelector(".modal-close");
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-form-status");
let previousFocus = null;

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function updateActiveNav() {
    const current = sections.findLast(section => section.offsetTop <= window.scrollY + 120);
    navLinks.forEach(link => {
        link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
    });
}

function setContactStatus(message, type) {
    if (!contactStatus) return;
    contactStatus.textContent = message;
    contactStatus.classList.remove("success", "error");
    if (type) contactStatus.classList.add(type);
}

function updateContactFieldState(field) {
    field.setAttribute("aria-invalid", String(!field.checkValidity()));
}

function setContactLoading(isLoading) {
    const submitButton = contactForm?.querySelector("button[type='submit']");
    if (!submitButton) return;

    submitButton.disabled = isLoading;
    submitButton.dataset.defaultText ||= submitButton.innerHTML;
    submitButton.innerHTML = isLoading
        ? "Envoi en cours..."
        : submitButton.dataset.defaultText;
}

function openProject(card) {
    const project = projects.find(item => item.id === Number(card.dataset.id));
    if (!project || !modal || !modalPanel) return;

    previousFocus = document.activeElement;
    if (previousFocus instanceof HTMLElement) previousFocus.blur();
    modal.querySelector("#modalKicker").textContent = project.kicker;
    modal.querySelector("#modalTitle").textContent = project.title;
    modal.querySelector("#modalRole").textContent = project.role;
    modal.querySelector("#modalDesc").textContent = project.desc;
    const modalMedia = modal.querySelector("#modalMedia");
    if (modalMedia) {
        if (project.media?.length) {
            modalMedia.hidden = false;
            modalMedia.innerHTML = `
                <div class="modal-media-header">
                    <span>Visuels produit</span>
                    <strong>${project.media.length} écrans</strong>
                </div>
                <div class="modal-media-strip" aria-label="Captures du projet ${escapeHTML(project.title)}">
                    ${project.media.map(item => `
                        <figure class="modal-shot ${item.orientation === "landscape" ? "landscape" : "portrait"}">
                            <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}" loading="lazy" decoding="async">
                            <figcaption>${escapeHTML(item.title)}</figcaption>
                        </figure>
                    `).join("")}
                </div>
            `;
        } else {
            modalMedia.hidden = true;
            modalMedia.innerHTML = "";
        }
    }
    modal.querySelector("#modalPoints").innerHTML = project.points
        .map(point => `<div class="modal-point">${escapeHTML(point)}</div>`)
        .join("");
    modal.querySelector("#modalTags").innerHTML = project.tags
        .map(tag => `<span>${escapeHTML(tag)}</span>`)
        .join("");
    const projectActions = [
        project.link
            ? `<a href="${escapeHTML(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.linkLabel || "Voir en ligne")}</a>`
            : "",
        project.sourceLink
            ? `<a href="${escapeHTML(project.sourceLink)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.sourceLabel || "Code source")}</a>`
            : ""
    ].filter(Boolean).join("");

    modal.querySelector("#modalActions").innerHTML = `
        ${projectActions}
        <button type="button" data-close-modal>Fermer</button>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const firstModalControl = modal.querySelector(".modal-close");
    setTimeout(() => {
        firstModalControl?.focus({ preventScroll: true });
    }, 220);
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (previousFocus instanceof HTMLElement) {
        previousFocus.focus({ preventScroll: true });
    }
}

document.querySelectorAll(".project-card").forEach(card => {
    const title = card.querySelector("h3")?.textContent?.trim() || "projet";
    const trigger = card.querySelector("[data-project-trigger]");
    trigger?.setAttribute("aria-label", `Voir le détail du projet ${title}`);
    trigger?.addEventListener("click", event => {
        event.stopPropagation();
        openProject(card);
    });

    card.addEventListener("click", event => {
        if (event.target instanceof Element && event.target.closest("a, button")) return;
        openProject(card);
    });
});

document.querySelectorAll(".filter-btn").forEach(button => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        document.querySelectorAll(".project-card").forEach(card => {
            const categories = card.dataset.cat?.split(" ") || [];
            const hidden = filter !== "all" && !categories.includes(filter);
            card.classList.toggle("hidden", hidden);
            card.setAttribute("aria-hidden", String(hidden));
        });
    });
});

contactForm?.addEventListener("input", event => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
        updateContactFieldState(event.target);
        if (contactStatus?.classList.contains("error")) setContactStatus("", "");
    }
});

contactForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const fields = [...contactForm.querySelectorAll("input:not([tabindex='-1']), select, textarea")];
    fields.forEach(updateContactFieldState);
    const firstInvalid = fields.find(field => !field.checkValidity());

    if (firstInvalid) {
        setContactStatus("Complète les champs requis pour envoyer la demande.", "error");
        firstInvalid.focus({ preventScroll: false });
        return;
    }

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    setContactStatus("", "");
    setContactLoading(true);

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.message || "Le message n'a pas pu être envoyé.");
        }

        contactForm.reset();
        contactForm.querySelectorAll("[aria-invalid]").forEach(field => {
            field.removeAttribute("aria-invalid");
        });
        setContactStatus("Message envoyé. Je reviens vers vous rapidement.", "success");
    } catch (error) {
        setContactStatus(error.message || "Erreur d'envoi. Réessaie dans quelques minutes.", "error");
    } finally {
        setContactLoading(false);
    }
});

closeButton?.addEventListener("click", closeModal);
modal?.addEventListener("click", event => {
    if (event.target === modal) closeModal();
    if (event.target instanceof HTMLElement && event.target.matches("[data-close-modal]")) closeModal();
});

document.addEventListener("keydown", event => {
    if (!modal?.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeModal();
        return;
    }

    if (event.key !== "Tab" || !modalPanel) return;

    const focusable = [...modalPanel.querySelectorAll("a[href], button:not([disabled])")]
        .filter(element => element instanceof HTMLElement && element.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

window.addEventListener("scroll", () => {
    updateActiveNav();
});

updateActiveNav();
