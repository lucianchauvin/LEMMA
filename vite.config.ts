import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [sveltekit(), purgeCss()],
    preview: {
        allowedHosts: ['lemma-lean.org'],
    },
    resolve: {
        alias: {
            '@lucide/svelte/icons': fileURLToPath(
                new URL('./node_modules/@lucide/svelte/dist/icons', import.meta.url)
            )
        }
    }
});
