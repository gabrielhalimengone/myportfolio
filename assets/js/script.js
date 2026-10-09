document.documentElement.classList.add("js");

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");

function closeMenu({ restoreFocus = false } = {}) {
    if (!menuToggle || !siteHeader) return;
    siteHeader.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuToggle.focus({ preventScroll: true });
}

menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    siteHeader.classList.toggle("menu-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
});

navLinks.forEach(link => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
        closeMenu({ restoreFocus: true });
    }
});

function updateActiveNav() {
    const current = sections.findLast(section => section.offsetTop <= window.scrollY + 120);
    navLinks.forEach(link => {
        link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
    });
}

const interactiveCardGrids = [
    document.querySelector(".terrain-grid"),
    document.querySelector(".expertise-grid")
].filter(Boolean);

interactiveCardGrids.forEach(grid => {
    const cards = [...grid.querySelectorAll("article")];
    if (!cards.length) return;

    grid.classList.add("js-ready");
    const setActiveCard = card => {
        cards.forEach(item => item.classList.toggle("is-active", item === card));
    };

    setActiveCard(cards[0]);
    cards.forEach(card => {
        card.addEventListener("pointerenter", () => setActiveCard(card));
        card.addEventListener("focusin", () => setActiveCard(card));
    });
    grid.addEventListener("pointerleave", () => setActiveCard(cards[0]));
    grid.addEventListener("focusout", event => {
        if (!grid.contains(event.relatedTarget)) setActiveCard(cards[0]);
    });
});

window.addEventListener("scroll", () => {
    updateActiveNav();
});

const revealTargets = [
    ...document.querySelectorAll("main > section:not(.hero), .capabilities article, .project-card, .case-study-grid article, .expertise-grid article, .timeline article, .contact-card")
];

function revealVisibleContent() {
    revealTargets.forEach(element => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 1.15 && bounds.bottom > -40) {
            element.classList.add("is-visible");
        }
    });
}

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    revealTargets.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms`;
        revealObserver.observe(element);
    });
    revealVisibleContent();
} else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
}

window.addEventListener("scroll", revealVisibleContent, { passive: true });
window.addEventListener("hashchange", () => window.setTimeout(revealVisibleContent, 50));

updateActiveNav();
