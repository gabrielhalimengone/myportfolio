export const projects = [
    {
        id: 0,
        kicker: "Application mobile",
        title: "TransFlash",
        role: "Flutter · Dart · UX mobile",
        desc: "Application mobile Flutter de transfert d'argent : saisie du montant, choix du pays et du bénéficiaire, récapitulatif et suivi des validations dans l'espace administrateur.",
        points: [
            "Découpage en étapes pour éviter les erreurs avant validation d'une transaction.",
            "UI sombre et contrastée pour faire ressortir les montants, statuts et actions critiques.",
            "Écrans admin séparés pour valider, refuser et suivre les flux côté opération."
        ],
        tags: ["Flutter", "Dart", "Mobile", "UX/UI", "API REST"],
        media: [
            { src: "assets/img/transflash/transflash-01-auth-welcome.jpeg", title: "Accueil", alt: "Ecran d'accueil TransFlash avec actions creer un compte et se connecter" },
            { src: "assets/img/transflash/transflash-02-user-home-balance.jpeg", title: "Espace client", alt: "Tableau de bord client TransFlash avec solde et activite recente" },
            { src: "assets/img/transflash/transflash-03-send-amount-empty.jpeg", title: "Montant vide", alt: "Etape de saisie du montant TransFlash avant selection du montant" },
            { src: "assets/img/transflash/transflash-04-send-country-dropdown.jpeg", title: "Choix pays", alt: "Menu de selection pays dans le parcours d'envoi TransFlash" },
            { src: "assets/img/transflash/transflash-05-send-amount-filled.jpeg", title: "Montant rempli", alt: "Etape montant TransFlash avec calcul du montant recu" },
            { src: "assets/img/transflash/transflash-06-send-beneficiary.jpeg", title: "Beneficiaire", alt: "Formulaire beneficiaire TransFlash avec nom complet et telephone" },
            { src: "assets/img/transflash/transflash-07-send-summary.jpeg", title: "Recapitulatif", alt: "Recapitulatif du transfert TransFlash avant confirmation" },
            { src: "assets/img/transflash/transflash-08-send-success.jpeg", title: "Confirmation", alt: "Ecran de succes TransFlash indiquant une demande envoyee" },
            { src: "assets/img/transflash/transflash-09-admin-dashboard.jpeg", title: "Admin dashboard", alt: "Tableau de bord administrateur TransFlash avec volume et validations" },
            { src: "assets/img/transflash/transflash-10-admin-transactions.jpeg", title: "Transactions", alt: "Liste des transactions administrateur TransFlash avec actions valider et refuser" },
            { src: "assets/img/transflash/transflash-11-admin-clients.jpeg", title: "Clients", alt: "Liste des clients dans l'espace administrateur TransFlash" },
            { src: "assets/img/transflash/transflash-12-admin-new-member.jpeg", title: "Nouveau membre", alt: "Modale d'ajout de membre dans l'espace administrateur TransFlash" }
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
        desc: "Site vitrine développé avec React pour une offre de fitness. Présentation des activités, planning et prise de contact dans une interface adaptée au mobile.",
        points: [
            "Sections modulaires pour réorganiser l'offre sans réécrire la page.",
            "Boutons de contact placés aux étapes clés de la découverte de l'offre.",
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
        desc: "Page de présentation de services numériques en HTML, CSS et JavaScript : une offre structurée, des animations légères et une mise en page responsive.",
        points: [
            "HTML sémantique pour structurer les titres, les contenus et la navigation.",
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
        kicker: "Mini-jeux Python",
        title: "PyGames Pack",
        role: "Python · Algorithmique",
        desc: "Collection de jeux Python : Snake, morpion, quiz et pendu. Travail sur les règles, les scores, les tours de jeu et la gestion des erreurs.",
        points: [
            "Gestion de scoring, tours de jeu, erreurs et conditions de victoire.",
            "Séparation des règles pour rendre chaque mini-jeu plus simple à maintenir.",
            "Captures ajoutées pour rendre le résultat compréhensible sans lancer Python."
        ],
        tags: ["Python", "Tkinter", "Algorithmes"],
        media: [
            { src: "assets/img/pygames/pygames-01-snake.png", title: "Snake", alt: "Capture du mini-jeu Snake avec score, record, niveau et plateau de jeu", orientation: "landscape" },
            { src: "assets/img/pygames/pygames-02-morpion.png", title: "Morpion", alt: "Capture du mini-jeu Morpion en terminal avec plateau et score", orientation: "landscape" },
            { src: "assets/img/pygames/pygames-03-quiz-python.png", title: "Quiz Python", alt: "Capture du quiz Python en terminal avec question et reponse", orientation: "landscape" },
            { src: "assets/img/pygames/pygames-04-pendu.png", title: "Pendu", alt: "Capture du jeu Pendu en terminal avec mot, vies et lettres ratees", orientation: "landscape" }
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
        desc: "Tableau de bord de coordination événementielle pour suivre les incidents, les priorités et les vérifications d'une régie technique avant et pendant un événement.",
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
        desc: "Projet de plateforme éducative en HTML, CSS, PHP et SQL. Organisation du parcours étudiant, accès aux contenus et amélioration de la lisibilité des écrans.",
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
        kicker: "Tableau de bord IT",
        title: "Nexus IT Dashboard",
        role: "HTML · CSS · JavaScript · Vercel",
        desc: "Tableau de bord JavaScript de suivi de projet IT : synthèse, Kanban, sprint et reporting. Une démo interactive sur données simulées, avec navigation persistante.",
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
        kicker: "Site événementiel React",
        title: "TechFest",
        role: "React · Vite · Tailwind CSS",
        desc: "Site événementiel développé avec React, Vite et Tailwind CSS. Une galerie et des animations accompagnent la présentation de l'événement sur ordinateur et mobile.",
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
