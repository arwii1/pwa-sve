import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		paths: {
			base: '/pwa-sve'
		},
		adapter: adapter({
			fallback: '404.html',
            strict: false
		}),
		prerender: {
			handleHttpError: 'ignore'
		}
	}
};

export default config;