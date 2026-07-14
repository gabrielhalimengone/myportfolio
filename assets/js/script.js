const projects = [
    {
        id: 0,
        kicker: "Application mobile",
        title: "TransFlash",
        role: "Flutter · Dart · UX mobile",
        desc: "Application de transfert d'argent pensée pour un parcours clair : envoyer, confirmer, suivre et consulter l'historique sans friction.",
        points: [
            "Structuration mobile-first des écrans et des parcours clés.",
            "Priorité donnée à la lisibilité des actions sensibles.",
            "Interface adaptée aux usages mobiles et aux marchés africains."
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
        linkLabel: ""
    },
    {
        id: 1,
        kicker: "Site vitrine React",
        title: "FitZone",
        role: "React · JavaScript · Responsive",
        desc: "Site vitrine pour salle de sport avec présentation des programmes, abonnements, planning et prise de contact.",
        points: [
            "Navigation structurée pour découvrir rapidement l'offre.",
            "Composants React pour sections, tarifs et planning.",
            "Rendu responsive pour consultation mobile."
        ],
        tags: ["React", "JavaScript", "CSS", "Responsive"],
        link: "https://fitzone-pink.vercel.app/",
        linkLabel: "Voir le site"
    },
    {
        id: 2,
        kicker: "Collection web",
        title: "Vitrine Digitale",
        role: "HTML · CSS · JavaScript",
        desc: "Collection de pages vitrines et landing pages avec attention portée à la structure HTML, au responsive et aux animations légères.",
        points: [
            "Bases SEO et structure sémantique.",
            "Animations CSS sobres et utiles.",
            "Formulaires et sections conversion."
        ],
        tags: ["HTML", "CSS", "JavaScript", "SEO"],
        link: "https://vitrine-digitale.vercel.app/",
        linkLabel: "Voir le site"
    },
    {
        id: 3,
        kicker: "Python tooling",
        title: "PyGames Pack",
        role: "Python · Algorithmique",
        desc: "Série de mini-jeux pour renforcer logique, gestion d'état, interactions et structure de code.",
        points: [
            "Jeux Snake, Morpion, Quiz et Pendu.",
            "Interface terminal et essais Tkinter.",
            "Travail sur logique, scoring et règles."
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
        linkLabel: ""
    },
    {
        id: 4,
        kicker: "Dashboard opérationnel",
        title: "Event Live Board",
        role: "Régie LED · Coordination · Live",
        desc: "Outil de coordination technique pour événements live : plan LED, checklist, points de contrôle et suivi incident.",
        points: [
            "Centralisation des besoins de production live.",
            "Checklist pré-événement pour réduire les oublis.",
            "Coordination entre son, vidéo, lumière et client."
        ],
        tags: ["Novastar", "Dashboard", "Ops", "Live"],
        link: "https://event-live-ruddy.vercel.app/",
        linkLabel: "Voir le site"
    },
    {
        id: 5,
        kicker: "Plateforme éducative",
        title: "Mon Sikolo",
        role: "HTML · CSS · PHP · SQL",
        desc: "Contribution à une plateforme éducative : intégration d'interface, nouvelles fonctionnalités et corrections fonctionnelles.",
        points: [
            "Améliorations d'interface sur parcours étudiant.",
            "Intégration de modules et contenus.",
            "Débogage fonctionnel et ajustements back-end."
        ],
        tags: ["PHP", "SQL", "UX", "JavaScript"],
        link: "https://mon-sikolo.vercel.app/",
        linkLabel: "Voir le site"
    },
    {
        id: 6,
        kicker: "Dashboard IT live",
        title: "Nexus IT Dashboard",
        role: "HTML · CSS · JavaScript · Vercel",
        desc: "Dashboard web responsive pour piloter un projet IT : synthèse temps réel, Kanban, sprint, reporting, synchronisation Jira, alertes et équipe.",
        points: [
            "Navigation latérale multi-vues inspirée des produits SaaS.",
            "Composants dashboard pour métriques, Kanban, backlog, reporting et alertes.",
            "Interface déployée sur Vercel avec interactions JavaScript claires."
        ],
        tags: ["HTML", "CSS", "JavaScript", "Dashboard", "Vercel"],
        link: "https://nx-dash-it.vercel.app/",
        linkLabel: "Voir le dashboard"
    },
    {
        id: 7,
        kicker: "Landing événementielle",
        title: "TechFest",
        role: "React · Vite · Tailwind CSS",
        desc: "Landing page événementielle avec galerie dynamique, animations et composition responsive.",
        points: [
            "Structure React avec composants isolés.",
            "Build Vite et stylisation Tailwind CSS.",
            "Galerie et animations pour renforcer l'immersion."
        ],
        tags: ["React", "Vite", "Tailwind", "Landing"],
        link: "https://festival-six-eta.vercel.app/",
        linkLabel: "Voir le site"
    }
];

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const modal = document.getElementById("projectModal");
const modalPanel = modal?.querySelector(".modal-panel");
const closeButton = modal?.querySelector(".modal-close");
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
    modal.querySelector("#modalActions").innerHTML = `
        ${project.link ? `<a href="${escapeHTML(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.linkLabel)}</a>` : ""}
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
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Voir le détail du projet ${title}`);
    card.addEventListener("click", () => openProject(card));
    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject(card);
        }
    });
});

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        document.querySelectorAll(".project-card").forEach(card => {
            const categories = card.dataset.cat?.split(" ") || [];
            const hidden = filter !== "all" && !categories.includes(filter);
            card.classList.toggle("hidden", hidden);
            card.setAttribute("aria-hidden", String(hidden));
        });
    });
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
