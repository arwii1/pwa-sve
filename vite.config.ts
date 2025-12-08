import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	base: './',
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'service-worker.ts',
			registerType: 'prompt',
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				globIgnores: ['**/node_modules/**/*']
			},
			manifest: {
				name: 'Svelte Shop PWA',
				short_name: 'Shop',
				description: 'Music Streaming PWA Application',
				theme_color: '#2563eb',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				orientation: 'portrait-primary',
				categories: ['music', 'entertainment'],
				icons: [
					{
						src: 'pwa-192x192.svg',
						sizes: '192x192',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: 'pwa-512x512.svg',
						sizes: '512x512',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: 'pwa-192x192.svg',
						sizes: '192x192',
						type: 'image/svg+xml',
						purpose: 'maskable'
					},
					{
						src: 'pwa-512x512.svg',
						sizes: '512x512',
						type: 'image/svg+xml',
						purpose: 'maskable'
					}
				]
			},
			injectManifest: {
				swSrc: 'src/service-worker.ts',
				swDest: 'service-worker.js',
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				globIgnores: ['**/node_modules/**/*', '**/dist/**/*']
			},
			devOptions: {
				enabled: true,
				suppressWarnings: true
			}
		})
	]
});