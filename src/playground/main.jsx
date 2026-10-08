import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const modes = {
    "Synthèse": {
        label: "SYNTHÈSE",
        title: "Une vue globale pour décider vite.",
        copy: "Les indicateurs prioritaires restent visibles avant le détail des tickets.",
        status: "Trajectoire sous contrôle"
    },
    Kanban: {
        label: "KANBAN",
        title: "Le travail avance par états lisibles.",
        copy: "Chaque ticket garde sa priorité, son responsable et sa prochaine action dans le même espace.",
        status: "Flux de production actif"
    },
    Reporting: {
        label: "REPORTING",
        title: "Les données deviennent un récit.",
        copy: "Les tendances de sprint sont regroupées pour préparer une décision, pas seulement remplir un graphique.",
        status: "Rapport prêt à partager"
    }
};

function Playground() {
    const [mode, setMode] = useState("Synthèse");
    const content = modes[mode];

    return (
        <>
            <div className="playground-toolbar" role="tablist" aria-label="Modes du playground">
                {Object.keys(modes).map((name) => (
                    <button
                        className={`playground-tab${name === mode ? " active" : ""}`}
                        type="button"
                        role="tab"
                        aria-selected={name === mode}
                        key={name}
                        onClick={() => setMode(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <div className="playground-preview" aria-live="polite">
                <div>
                    <span className="playground-kicker">NEXUS / <b>{content.label}</b></span>
                    <h3>{content.title}</h3>
                    <p>{content.copy}</p>
                </div>
                <div className="playground-status"><span></span><strong>{content.status}</strong></div>
            </div>
        </>
    );
}

const root = document.getElementById("playground-react-root");
if (root) createRoot(root).render(<Playground />);
