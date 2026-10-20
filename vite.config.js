import { readFileSync } from "node:fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const previousOrigin = "https://myportfolio-nu-red.vercel.app";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "SITE_");
    const siteUrl = new URL(process.env.SITE_URL || env.SITE_URL || process.env.CF_PAGES_URL || previousOrigin);
    if (!["http:", "https:"].includes(siteUrl.protocol)) throw new Error("SITE_URL must be an HTTP(S) URL.");
    const replaceOrigin = text => text.replaceAll(previousOrigin, siteUrl.origin);

    return {
        plugins: [react(), {
            name: "portfolio-public-files",
            transformIndexHtml: {
                order: "post",
                handler(html, context) {
                    const portrait = Object.values(context.bundle || {}).find(file =>
                        file.type === "asset" && file.fileName.startsWith("assets/gabriel-portrait-540-")
                    );
                    const result = replaceOrigin(html);
                    return portrait ? result.replaceAll("/assets/img/gabriel-portrait-540.webp", `/${portrait.fileName}`) : result;
                }
            },
            generateBundle() {
                for (const fileName of ["robots.txt", "sitemap.xml"]) {
                    this.emitFile({
                        type: "asset",
                        fileName,
                        source: replaceOrigin(readFileSync(new URL(fileName, import.meta.url), "utf8"))
                    });
                }
                this.emitFile({
                    type: "asset",
                    fileName: "_routes.json",
                    source: JSON.stringify({ version: 1, include: ["/api/*"], exclude: [] })
                });
            }
        }],
        build: {
            outDir: "dist",
            emptyOutDir: true,
            rollupOptions: {
                input: "index.html"
            }
        }
    };
});
