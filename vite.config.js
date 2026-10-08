import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "assets/js",
        emptyOutDir: false,
        rollupOptions: {
            input: {
                playground: "src/playground/main.jsx",
                projects: "src/projects/main.jsx",
                contact: "src/contact/main.jsx"
            },
            output: {
                entryFileNames: "react-[name].js",
                assetFileNames: "react-playground-[name][extname]"
            }
        }
    }
});
