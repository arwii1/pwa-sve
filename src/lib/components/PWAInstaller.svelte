<script lang="ts">
	import { onMount } from 'svelte';

	let isInstallable = $state(false);
	let deferredPrompt: any = null;

	onMount(() => {
		window.addEventListener('beforeinstallprompt', (e: Event) => {
			e.preventDefault();
			deferredPrompt = e;
			isInstallable = true;
		});

		window.addEventListener('appinstalled', () => {
			deferredPrompt = null;
			isInstallable = false;
		});
	});

	function installApp() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult: any) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the install prompt');
				}
				deferredPrompt = null;
			});
		}
	}
</script>

{#if isInstallable}
	<div class="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-40">
		<span class="text-sm">Установить приложение</span>
		<button 
			onclick={installApp}
			class="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
		>
			Установить
		</button>
		<button 
			onclick={() => (isInstallable = false)}
			class="text-white hover:opacity-80 transition-opacity"
			aria-label="Close"
		>
			✕
		</button>
	</div>
{/if}
