import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { projects } from "../../assets/js/data/projects.js";

const selectedIds = new Set([6, 0, 1, 7]);
const projectOrder = [6, 0, 1, 2, 3, 4, 5, 7];
const filters = [["all", "Tous"], ["web", "Web"], ["mobile", "Mobile"], ["product", "Produit"], ["tooling", "Tooling"]];
const livePreviewIds = new Set([1, 6, 7]);

function ProjectPreview({ project }) {
    if (project.id === 0) return <div className="project-preview project-preview--transflash" aria-hidden="true"><div className="transflash-device transflash-device--summary"><img src="assets/img/transflash/transflash-07-send-summary.jpeg" alt="" loading="lazy" decoding="async" /></div><div className="transflash-device"><img src="assets/img/transflash/transflash-02-user-home-balance.jpeg" alt="" loading="lazy" decoding="async" /></div></div>;
    if (livePreviewIds.has(project.id)) return <div className="project-preview project-preview--live" aria-hidden="true"><iframe src={project.link} title={`Aperçu en direct de ${project.title}`} loading="lazy" referrerPolicy="no-referrer" tabIndex={-1} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" /><span className="live-preview-label">SITE EN DIRECT</span></div>;
    return null;
}

function ProjectCard({ project, archiveOpen, onOpen }) {
    const isFeatured = project.id === 6;
    const isArchive = !selectedIds.has(project.id);
    const tags = isFeatured ? ["HTML", "CSS", "JavaScript", "Vercel"] : project.tags.slice(0, 3);
    return <article className={`project-card${isFeatured ? " featured" : ""}${isArchive ? " project-card--archive" : ""}${isArchive && archiveOpen ? " archive-visible" : ""}`} data-id={project.id} data-cat={isFeatured ? "web product" : project.tags.map(tag => tag.toLowerCase()).join(" ")}>
        <ProjectPreview project={project} />
        <div className="project-meta">{project.role}</div><h3>{project.title}</h3><p>{project.desc}</p>
        <ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>
        {isFeatured && <div className="featured-details" aria-label="Détails de la contribution"><div><span>Mon rôle</span><strong>Direction frontend · UI system</strong></div><div><span>Résultat visé</span><strong>Rendre les données actionnables en un coup d'oeil</strong></div></div>}
        <div className="tag-row">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions" aria-label={`Actions ${project.title}`}>
            {isFeatured && <a className="project-details" href="#nexus-study">Voir l'étude de cas</a>}
            {!isFeatured && <button className="project-details" type="button" aria-label={`Voir le détail du projet ${project.title}`} onClick={() => onOpen(project)}>{project.media?.length ? "Voir les captures" : "Étude courte"}</button>}
            {project.link && <a className="project-action" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || "Voir en ligne"}</a>}
            {project.sourceLink && <a className="project-action muted" href={project.sourceLink} target="_blank" rel="noopener noreferrer">{project.sourceLabel || "Code source"}</a>}
        </div>
    </article>;
}

function ProjectModal({ project, onClose }) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!project) return undefined;
        const previousFocus = document.activeElement;
        document.body.classList.add("modal-open");
        panelRef.current?.querySelector(".modal-close")?.focus({ preventScroll: true });
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab" || !panelRef.current) return;
            const focusable = [...panelRef.current.querySelectorAll("a[href], button:not([disabled])")];
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
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("modal-open");
            if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
        };
    }, [project, onClose]);

    if (!project) return null;
    return <div className="modal open" aria-hidden="false" onClick={(event) => event.target === event.currentTarget && onClose()}>
        <div className="modal-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="modalTitle" tabIndex="-1">
            <button className="modal-close" type="button" aria-label="Fermer la fenêtre" onClick={onClose}>Fermer</button>
            <p className="modal-kicker" id="modalKicker">{project.kicker}</p>
            <h2 id="modalTitle">{project.title}</h2>
            <p className="modal-role">{project.role}</p>
            <p className="modal-desc">{project.desc}</p>
            {project.media?.length > 0 && <div className="modal-media">
                <div className="modal-media-header"><span>Visuels produit</span><strong>{project.media.length} écrans</strong></div>
                <div className="modal-media-strip" aria-label={`Captures du projet ${project.title}`}>
                    {project.media.map(item => <figure className={`modal-shot${item.orientation === "landscape" ? " landscape" : ""}`} key={item.src}><img src={item.src} alt={item.alt} loading="lazy" decoding="async" /><figcaption>{item.title}</figcaption></figure>)}
                </div>
            </div>}
            <div className="modal-points">{project.points.map(point => <div className="modal-point" key={point}>{point}</div>)}</div>
            <div className="modal-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-actions">
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || "Voir en ligne"}</a>}
                {project.sourceLink && <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">{project.sourceLabel || "Code source"}</a>}
                <button type="button" onClick={onClose}>Fermer</button>
            </div>
        </div>
    </div>;
}

function Projects() {
    const [filter, setFilter] = useState("all");
    const [archiveOpen, setArchiveOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const visibleProjects = [...projects].sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id)).filter(project => {
        if (!selectedIds.has(project.id) && !archiveOpen) return false;
        if (filter === "all") return true;
        if (project.id === 6) return filter === "web" || filter === "product";
        return project.tags.some(tag => tag.toLowerCase().includes(filter));
    });
    return <>
        <div className="filters" aria-label="Filtrer les projets">{filters.map(([value, label]) => <button className={`filter-btn${filter === value ? " active" : ""}`} aria-pressed={filter === value} data-filter={value} key={value} type="button" onClick={() => setFilter(value)}>{label}</button>)}</div>
        <div className="project-grid">{visibleProjects.map(project => <ProjectCard project={project} archiveOpen={archiveOpen} onOpen={setActiveProject} key={project.id} />)}</div>
        <button className="archive-toggle" type="button" aria-expanded={archiveOpen} onClick={() => setArchiveOpen(open => !open)}>{archiveOpen ? "Masquer les projets complémentaires" : "Voir les projets complémentaires"} <span aria-hidden="true">{archiveOpen ? "−" : "+"}</span></button>
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>;
}

const root = document.getElementById("projects-react-root");
if (root) createRoot(root).render(<Projects />);
