const PJ = [
    { id: 0, tag: 'Application Mobile // 001', title: 'TransFlash', role: 'Flutter · Dart · Mobile', desc: "Application de transfert d'argent mobile pensée pour la simplicité et la sécurité. Interface intuitive pour envoyer et recevoir de l'argent en quelques secondes.", features: ["Authentification sécurisée et vérification d'identité", "Transferts instantanés avec confirmation en temps réel", "Historique complet des transactions", "Interface adaptée aux marchés africains", "Design mobile-first avec Flutter"], tags: ['Flutter', 'Dart', 'Mobile', 'UX/UI', 'API REST', 'Sécurité'], link: 'https://github.com/GabrielENDAM', color: '#3A8DFF', images: ['C:\\Users\\dell\\.gemini\\antigravity\\brain\\8b2694d3-7e82-490e-b2c5-91e7d3490139\\transflash_1_1776722011145.png', 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\8b2694d3-7e82-490e-b2c5-91e7d3490139\\transflash_2_1776722025337.png'] },
    { id: 1, tag: 'Site Web React // 002', title: 'FitZone', role: 'React · JavaScript · Salle de Sport', desc: "Site vitrine et plateforme pour une salle de sport. Présentation des programmes, tarifs des abonnements, planning hebdomadaire des cours et formulaire de contact.", features: ["Page d'accueil immersive avec hero animé", "Catalogue des cours et programmes (cardio, muscu, yoga…)", "Planning interactif des séances de la semaine", "Section abonnements avec comparatif des formules", "Formulaire de contact et prise de rendez-vous", "Design responsive mobile-first"], tags: ['React', 'JavaScript', 'CSS', 'Responsive', 'Vitrine', 'UX'], link: 'https://fitzone-pink.vercel.app/', color: '#C9A84C' },
    { id: 2, tag: 'HTML/CSS/JS // 003', title: 'Vitrine Digitale', role: 'HTML · CSS · JavaScript', desc: "Collection de sites web aux objectifs variés : landing pages, portfolios créatifs, sites vitrine. Focus sur les animations CSS et l'accessibilité.", features: ["Landing pages avec animations d'entrée", "Formulaires de contact fonctionnels", "Intégration de cartes et géolocalisation", "Optimisation SEO et performance", "Responsive design tous écrans"], tags: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'SEO', 'Animations'], link: 'https://github.com/GabrielENDAM', color: '#C9A84C' },
    { id: 3, tag: 'Python · Jeux // 004', title: 'PyGames Pack', role: 'Python · Algorithmes', desc: "Série de mini-jeux rapides en Python pour aiguiser la logique algorithmique. Du Snake classique au quiz dynamique, chaque projet explore une mécanique de jeu différente.", features: ["Snake avec score progressif et niveaux de difficulté", "Morpion avec IA basique (algorithme minimax)", "Quiz dynamique avec chronomètre", "Jeu du Pendu avec dictionnaire chargeable", "Interface terminal et version Tkinter"], tags: ['Python', 'Tkinter', 'Algorithmes', 'POO', 'Terminal'], link: 'https://github.com/GabrielENDAM', color: '#8B5CF6', images: ['C:\\Users\\dell\\.gemini\\antigravity\\brain\\8b2694d3-7e82-490e-b2c5-91e7d3490139\\pygames_1_1776722043292.png', 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\8b2694d3-7e82-490e-b2c5-91e7d3490139\\pygames_2_1776722055641.png'] },
    { id: 4, tag: 'Régie LED // 005', title: 'Event Live Board', role: 'Novastar · Régie · Événementiel', desc: "Outil de coordination technique pour événements live. Centralise la gestion des équipements LED Novastar, le planning technique et la checklist de déploiement scène.", features: ["Plan de scène interactif pour murs LED", "Checklist technique pré-événement", "Coordination équipes son, vidéo, lumière", "Paramétrage Novastar documenté", "Gestion des incidents en temps réel"], tags: ['Novastar', 'Régie LED', 'Événementiel', 'Coordination', 'Live'], link: null, color: '#F97316' },
    { id: 5, tag: 'Plateforme Éducative // 006', title: 'Mon Sikolo', role: 'HTML · CSS · PHP · JS', desc: "Contribution au développement de cette plateforme éducative. Intégration de nouvelles fonctionnalités, amélioration de l'expérience utilisateur et correction de bugs.", features: ["Modules de cours interactifs", "Système de progression étudiant", "Interface responsive multi-appareils", "Intégration back-end PHP/SQL", "Tests et débogage fonctionnel"], tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'UX'], link: null, color: '#C9A84C' },
    { id: 6, tag: 'En Développement // 007', title: 'IT Project Dashboard', role: 'React · Agile · 2025', desc: "Projet en cours : dashboard de gestion de projet IT pour équipes Agile. Suivi des sprints, intégration Jira, reporting automatisé et vue Kanban interactive.", features: ["Vue Kanban drag & drop", "Suivi de sprints et vélocité d'équipe", "Reporting automatisé en PDF", "Connexion API Jira", "Notifications et alertes de délais"], tags: ['React', 'Agile', 'Dashboard', 'API Jira', '2025'], link: 'https://github.com/GabrielENDAM', color: '#C9A84C' },
    { id: 7, tag: 'Site Web React // 008', title: 'TechFest', role: 'React · Vite · Tailwind CSS', desc: "Landing page interactive pour l'événement festival TechFest. Refonte visuelle complète avec une interface dynamique, une galerie défilante et des animations immersives.", features: ["Galerie dynamique avec défilement infini", "Animations d'entrée fluides", "Responsive design premium", "Composants React isolés", "Stylisation moderne avec Tailwind CSS"], tags: ['React', 'Vite', 'Tailwind', 'Événementiel', 'Landing Page'], link: 'https://festival-six-eta.vercel.app/', color: '#F97316' }
];
const cur = document.getElementById('cursor'), rng = document.getElementById('cursor-ring'), glw = document.getElementById('bgGlow');
let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
let isMobile = window.matchMedia("(pointer: coarse)").matches;

// Audio Synth Engine (Retro Style)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (isMobile) return; // Save resources on mobile
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'hover') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.05);
        gain.gain.setValueAtTime(0.01, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
    } else if (type === 'click') {
        osc.type = 'square'; osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        gain.gain.setValueAtTime(0.02, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'levelup') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554, now + 0.1); osc.frequency.setValueAtTime(659, now + 0.2);
        gain.gain.setValueAtTime(0.03, now); gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
    }
}

// Interactivity Sounds
const interactables = document.querySelectorAll('a, button, .btn, .ci, .skill-tag, .project-card, .filter-btn');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('active'); rng.classList.add('active'); playSound('hover'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('active'); rng.classList.remove('active'); });
    el.addEventListener('click', () => playSound('click'));
});

// Performant Animation Loop
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animLoop() {
    if (!isMobile) {
        rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
        cur.style.transform = `translate(${mx}px, ${my}px)`;
        rng.style.transform = `translate(${rx}px, ${ry}px)`;
        glw.style.transform = `translate(${rx}px, ${ry}px)`;
    }
    requestAnimationFrame(animLoop);
}
requestAnimationFrame(animLoop);

// Loader
const bar = document.getElementById('loaderBar'), pct = document.getElementById('loaderPct'), ldr = document.getElementById('loader');
let p = 0;
const iv = setInterval(() => {
    p += Math.random() * 4;
    if (p >= 100) {
        p = 100; clearInterval(iv);
        setTimeout(() => {
            ldr.classList.add('hide');
            document.querySelectorAll('.stat-fill').forEach(el => el.style.width = el.dataset.width + '%');
            playSound('levelup');
        }, 500);
    }
    bar.style.width = Math.min(p, 100) + '%'; pct.textContent = Math.round(Math.min(p, 100)) + '%';
}, 40);

// Intersection Observer
const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 });
document.querySelectorAll('.mission,.skill-cat,.edu-card').forEach((el, i) => { el.style.transitionDelay = (i * 0.08) + 's'; obs.observe(el); });

// Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.cat !== f));
    });
});

// Scroll Spy & XP Bar
const xpFill = document.getElementById('xpFill');
const sections = document.querySelectorAll('.section-wrap, #hero');
const navLinks = document.querySelectorAll('.nav-link');
let currentLevel = '';

window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    xpFill.style.width = (winScroll / height) * 100 + '%';

    let scrollPos = winScroll + window.innerHeight / 3;
    sections.forEach(sec => {
        if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
            const id = sec.getAttribute('id');
            if (id && id !== currentLevel) {
                currentLevel = id;
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    if (id !== 'hero') playSound('levelup');
                }
            }
        }
    });
});

// Modal Logic
const ov = document.getElementById('mo');
function closeModal() { ov.classList.remove('open'); document.body.style.overflow = ''; }

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const pj = PJ[parseInt(card.dataset.id)];
        document.getElementById('mt').textContent = pj.tag; document.getElementById('mt').style.color = pj.color;
        document.getElementById('mti').textContent = pj.title; document.getElementById('mr').textContent = pj.role;
        document.getElementById('mde').textContent = pj.desc;
        document.getElementById('mf').innerHTML = pj.features.map(f => `<div class="mfe">${f}</div>`).join('');
        document.getElementById('mtags').innerHTML = pj.tags.map(t => `<span class="mtag">${t}</span>`).join('');
        const mgal = document.getElementById('mgal');
        if (pj.images && pj.images.length > 0) {
            mgal.innerHTML = pj.images.map(img => `<img src="${img}" class="mgal-img" alt="Gallery image">`).join('');
            mgal.style.display = 'flex';
        } else {
            mgal.innerHTML = '';
            mgal.style.display = 'none';
        }
        const ac = document.getElementById('mac');
        const cl = `<button class="mb mbo" onclick="closeModal()">Fermer</button>`;
        const btnText = card.dataset.cat === 'web' ? 'Voir le site' : 'Voir sur GitHub';
        ac.innerHTML = pj.link ? `<a href="${pj.link}" target="_blank" class="mb mbp">${btnText}</a>${cl}` : cl.replace('mbo', 'mbp');
        ov.classList.add('open'); document.body.style.overflow = 'hidden';
    });
});

document.getElementById('mc').addEventListener('click', closeModal);
ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('open')) closeModal(); });
