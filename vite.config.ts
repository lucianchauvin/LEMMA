import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { normalizePath } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            plugins: [importMetaUrlPlugin]
        },
        exclude: ['Projects']
    },
    kit: {
        outDir: 'client/dist',
    },
    plugins: [
        tailwindcss(),
        sveltekit(),
        process.env.NODE_ENV === 'production' && nodePolyfills({
          overrides: {
            fs: 'memfs', // Use 'memfs' for the 'fs' module in development
          },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: [
                        normalizePath(path.resolve(__dirname, './node_modules/@leanprover/infoview/dist/*')),
                        normalizePath(path.resolve(__dirname, './node_modules/lean4monaco/dist/webview/webview.js')),
                    ],
                    dest: 'infoview'
                },
                {
                    src: [
                        normalizePath(path.resolve(__dirname, './node_modules/@leanprover/infoview/dist/codicon.ttf'))
                    ],
                    dest: 'assets'
                }
            ]
        })
    ],
    preview: {
        allowedHosts: ['lemma-lean.org'],
    },
    server: {
        port: 3000,
        proxy: {
            '/websocket': {
                target: 'ws://localhost:8080',
                    ws: true
            },
            '/api': {
                target: 'http://localhost:8080',
            },
        }
    },
    resolve: {
        alias: {
            path: "path-browserify",
            '@lucide/svelte/icons': fileURLToPath(
                new URL('./node_modules/@lucide/svelte/dist/icons', import.meta.url)
            )
        },
    },
});
