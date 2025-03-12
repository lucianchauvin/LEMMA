import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "node:url";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
    ],
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
