<script lang="ts">
	import { onMount } from 'svelte';

	let notificationSupported = $state(false);
	let notificationPermission = $state('default');
	let showNotificationPanel = $state(false);
	let notificationError = $state('');

	onMount(() => {
		notificationSupported = 'Notification' in window;
		if (notificationSupported) {
			notificationPermission = Notification.permission;
		}
	});

	async function requestPermission() {
		if (!notificationSupported) return;

		const permission = await Notification.requestPermission();
		notificationPermission = permission;
	}

	function sendTestNotification() {
		if (!notificationSupported) {
			notificationError = 'Notifications не поддерживаются этим браузером';
			return;
		}

		if (notificationPermission !== 'granted') {
			notificationError = 'Пожалуйста, разрешите уведомления';
			return;
		}

		try {
			const notification = new Notification('Svelte Shop PWA', {
				body: 'Это тестовое уведомление! 🎵',
				icon: '/pwa-192x192.svg',
				tag: 'test-notification'
			});

			setTimeout(() => notification.close(), 5000);

			notificationError = '✓ Уведомление отправлено! (см. системные уведомления)';
		} catch (error) {
			console.error('Error sending notification:', error);
			notificationError = `Ошибка: ${error instanceof Error ? error.message : 'Unknown error'}. Проверьте настройки браузера.`;
		}
	}
</script>

<div class="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-2xl font-bold text-purple-900">🔔 Push Notifications</h2>
		<button 
			onclick={() => (showNotificationPanel = !showNotificationPanel)}
			class="text-purple-600 hover:text-purple-800 transition-colors"
		>
			{showNotificationPanel ? '▼' : '▶'}
		</button>
	</div>

	{#if showNotificationPanel}
		<div class="space-y-4">
			{#if !notificationSupported}
				<p class="text-purple-800">⚠️ Этот браузер не поддерживает notifications</p>
			{:else if notificationPermission === 'denied'}
				<p class="text-red-700 mb-4">
					❌ Уведомления заблокированы в параметрах браузера
				</p>
			{:else if notificationPermission === 'default'}
				<p class="text-purple-800 mb-4">
					ℹ️ Разрешите приложению отправлять уведомления
				</p>
				<button 
					onclick={requestPermission}
					class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium transition-colors"
				>
					Разрешить уведомления
				</button>
			{:else if notificationPermission === 'granted'}
				<p class="text-green-700 mb-4">
					✓ Уведомления разрешены
				</p>
				<button 
					onclick={sendTestNotification}
					class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium transition-colors"
				>
					Отправить тестовое уведомление
				</button>
				{#if notificationError}
					<div class="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
						{notificationError}
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
