import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, ArrowRight, X, Play, Images, Plus, Minus, ExternalLink } from "lucide-react";
import { projects } from "../../assets/js/data/projects.js";

const selectedIds = [6, 0, 1, 7];
const filters = [["all", "Tous"], ["web", "Web"], ["mobile", "Mobile"], ["product", "Produit"], ["tooling", "Tooling"]];
const previews = { 6: "nexus", 1: "fitzone", 7: "techfest" };
const categories = { 6: ["web", "product"], 0: ["mobile", "product"], 1: ["web"], 7: ["web"], 2: ["web"], 3: ["tooling"], 4: ["product", "tooling"], 5: ["web", "product"] };

function ProjectPreview({ project, onOpen }) {
    if (project.id === 0) return <button type="button" className="work-visual work-visual--mobile" onClick={() => onOpen(project, "detail")} aria-label="Voir les captures de TransFlash">
        <span className="phone-composition">
            <span className="phone phone--back"><img src="assets/img/transflash/transflash-07-send-summary.jpeg" width="803" height="1600" alt="Récapitulatif d'un transfert TransFlash" loading="lazy" /></span>
            <span className="phone phone--front"><img src="assets/img/transflash/transflash-02-user-home-balance.jpeg" width="803" height="1600" alt="Espace client TransFlash" loading="lazy" /></span>
        </span>
        <span className="preview-action"><Images size={17} /> 12 écrans à explorer <ArrowUpRight size={18} /></span>
    </button>;
    if (previews[project.id]) return <button type="button" className={`work-visual work-visual--${previews[project.id]}`} onClick={() => onOpen(project, "live")} aria-label={`Explorer la démo de ${project.title}`}>
        <span className="browser-preview">
            <span className="preview-chrome" aria-hidden="true"><i /><i /><i /><span>{new URL(project.link).hostname}</span><ArrowUpRight size={13} /></span>
            <img src={`assets/img/${previews[project.id]}-preview.webp`} width="1440" height="900" alt={`Capture réelle de ${project.title}`} loading={project.id === 6 ? "eager" : "lazy"} decoding="async" />
        </span>
        <span className="preview-action"><Play size={15} /> Explorer la démo <ArrowUpRight size={18} /></span>
    </button>;
    if (project.media?.length) return <button type="button" className="work-visual work-visual--archive" onClick={() => onOpen(project, "detail")} aria-label={`Voir les captures de ${project.title}`}><img src={project.media[0].src} alt={project.media[0].alt} loading="lazy" /></button>;
    return null;
}

function ProjectCard({ project, onOpen }) {
    const ref = useRef(null);
    const number = selectedIds.indexOf(project.id);
    useEffect(() => {
        const element = ref.current;
        if (!("IntersectionObserver" in window)) { element.classList.add("work-entered"); return; }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { element.classList.add("work-entered"); observer.disconnect(); }
        }, { threshold: .08 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return <article ref={ref} className={`work-item work-item--${project.id === 6 ? "featured" : project.id === 0 ? "mobile" : number >= 0 ? "compact" : "archive"}`}>
        <ProjectPreview project={project} onOpen={onOpen} />
        <div className="work-copy">
            {number >= 0 && <span className="work-number" aria-hidden="true">0{number + 1}</span>}
            <p className="work-kicker">{project.kicker}</p>
            <h3>{project.title}</h3>
            <p className="work-tech">{project.id === 6 ? "HTML · CSS · JavaScript" : project.role}</p>
            {project.id === 6 && <p className="work-disclosure">Démo · Données simulées</p>}
            <p className="work-description">{project.desc}</p>
            <div className="work-links">
                {project.link && <button type="button" className="work-link work-link--primary" onClick={() => onOpen(project, "live")}>Explorer le projet <ArrowUpRight size={19} /></button>}
                {!project.link && <button type="button" className="work-link work-link--primary" onClick={() => onOpen(project, "detail")}>Voir les captures <ArrowRight size={19} /></button>}
                {project.id === 6 && <a className="work-link" href="#nexus-study">Étude de cas <ArrowRight size={17} /></a>}
                {project.sourceLink && <a className="work-link work-link--quiet" href={project.sourceLink} target="_blank" rel="noopener noreferrer">Code source <ArrowUpRight size={15} /></a>}
            </div>
            <details className="work-details"><summary>Choix de conception <Plus size={15} /></summary><ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>{project.id === 6 && <p><strong>Mon rôle :</strong> direction frontend et système d'interface. Rendre les données actionnables en un coup d'œil.</p>}<div className="work-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></details>
        </div>
    </article>;
}

function ProjectDialog({ selection, onClose }) {
    const ref = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [slow, setSlow] = useState(false);
    const project = selection?.project;
    useEffect(() => {
        if (!project) return;
        const previous = document.activeElement;
        ref.current.showModal();
        document.body.classList.add("modal-open");
        setLoaded(false); setSlow(false);
        const timer = setTimeout(() => setSlow(true), 8000);
        return () => { clearTimeout(timer); document.body.classList.remove("modal-open"); if (previous instanceof HTMLElement) previous.focus({ preventScroll: true }); };
    }, [project]);
    if (!project) return null;
    return <dialog className={`project-dialog ${selection.mode === "live" ? "project-dialog--live" : ""}`} ref={ref} aria-labelledby="project-dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
        <div className="dialog-toolbar"><div><strong id="project-dialog-title">{project.title}</strong><span>{project.id === 6 ? "Démonstration · Données simulées" : project.kicker}</span></div><div className="dialog-commands">{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le site dans un nouvel onglet" title="Ouvrir dans un nouvel onglet"><ExternalLink size={20} /></a>}<button type="button" onClick={onClose} aria-label="Fermer l'aperçu" title="Fermer"><X size={23} /></button></div></div>
        {selection.mode === "live" ? <div className="live-demo-stage">
            {!loaded && <div className="demo-loading" role="status"><span className="loading-line" />{slow ? "Le site met du temps à répondre." : "Ouverture de la démo…"}<a href={project.link} target="_blank" rel="noopener noreferrer">Ouvrir dans un nouvel onglet <ArrowUpRight size={17} /></a></div>}
            <iframe src={project.link} title={`Démo interactive de ${project.title}`} onLoad={() => setLoaded(true)} referrerPolicy="no-referrer" />
        </div> : <div className="dialog-content"><p>{project.desc}</p>{project.media?.length > 0 && <div className="capture-gallery">{project.media.map(item => <figure key={item.src} className={item.orientation === "landscape" ? "capture-wide" : ""}><img src={item.src} alt={item.alt} loading="lazy" /><figcaption>{item.title}</figcaption></figure>)}</div>}<ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul></div>}
    </dialog>;
}

function Projects() {
    const [filter, setFilter] = useState("all");
    const [archiveOpen, setArchiveOpen] = useState(false);
    const [selection, setSelection] = useState(null);
    const ordered = [...projects].sort((a, b) => {
        const ai = selectedIds.indexOf(a.id), bi = selectedIds.indexOf(b.id);
        return (ai < 0 ? a.id + 10 : ai) - (bi < 0 ? b.id + 10 : bi);
    });
    const visible = ordered.filter(project => (selectedIds.includes(project.id) || archiveOpen) && (filter === "all" || categories[project.id].includes(filter)));
    return <>
        <div className="work-filters" aria-label="Filtrer les projets">{filters.map(([value, label]) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}<span>{value === "all" ? (archiveOpen ? "08" : "04") : ""}</span></button>)}</div>
        <div className="work-list">{visible.map(project => <ProjectCard key={project.id} project={project} onOpen={(project, mode) => setSelection({ project, mode })} />)}</div>
        {visible.length === 0 && <p className="work-empty">Les projets de cette catégorie se trouvent dans les projets complémentaires.</p>}
        <button className="work-archive-toggle" type="button" aria-expanded={archiveOpen} onClick={() => setArchiveOpen(open => !open)}>{archiveOpen ? "Masquer les projets complémentaires" : "Voir les projets complémentaires"}{archiveOpen ? <Minus size={18} /> : <Plus size={18} />}</button>
        <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
    </>;
}

const root = document.getElementById("projects-react-root");
if (root) createRoot(root).render(<Projects />);
