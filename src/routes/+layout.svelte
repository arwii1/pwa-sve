<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import '../app.css';
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PWAInstaller from '$lib/components/PWAInstaller.svelte';

	let { children } = $props();

	onMount(() => {
		// Регистрируем Service Worker с правильным base path
		if ('serviceWorker' in navigator) {
			const swPath = base ? `${base}/service-worker.js` : '/service-worker.js';
			navigator.serviceWorker.register(swPath)
				.then(registration => {
					console.log('✓ Service Worker registered:', registration);
				})
				.catch(error => {
					console.error('✗ Service Worker registration failed:', error);
				});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.svg" />
	<meta name="theme-color" content="#2563eb" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Music Streaming PWA Application" />
	<link rel="manifest" href="{base}/manifest.webmanifest" />
	<link rel="apple-touch-icon" href="{base}/pwa-192x192.svg" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-title" content="Shop" />
</svelte:head>

<div class="flex flex-col min-h-screen bg-gray-50">
	<Header />
	
	<main class="flex-1 container mx-auto px-4 py-8">
		{@render children()}
	</main>
	
	<Footer />
	<PWAInstaller />
</div>
