<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import NotificationManager from '$lib/components/NotificationManager.svelte';
	import { MOCK_TRACKS } from '$lib/models/track.model';
	import { favoritesStore } from '$lib/stores/favorites';

	let selectedGenre = $state('all');
	let searchQuery = $state('');

	const genres = [
		{ id: 'all', name: 'Все' },
		{ id: 'electronic', name: 'Electronic' },
		{ id: 'pop', name: 'Pop' },
		{ id: 'hip-hop', name: 'Hip-Hop' },
		{ id: 'acoustic', name: 'Acoustic' },
		{ id: 'rock', name: 'Rock' },
		{ id: 'jazz', name: 'Jazz' }
	];

	let filteredProducts = $derived(
		(() => {
			let results = selectedGenre === 'all'
				? MOCK_TRACKS
				: MOCK_TRACKS.filter(p => p.genre.toLowerCase() === selectedGenre);
			
			if (searchQuery.trim()) {
				results = results.filter(p =>
					p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.artist.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}
			
			return results;
		})()
	);

</script>

<Breadcrumbs items={[{ label: 'Каталог', href: '/' }]} />

<NotificationManager />

<div class="mb-8">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Каталог музыки</h1>

	<div class="mb-8">
		<input
			type="text"
			placeholder="Поиск..."
			bind:value={searchQuery}
			class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500"
		/>
	</div>

	<div class="flex flex-wrap gap-2 mb-8">
		{#each genres as genre (genre.id)}
			<button
				onclick={() => (selectedGenre = genre.id)}
				class="px-4 py-2 rounded-full font-medium transition-colors"
				class:bg-blue-600={selectedGenre === genre.id}
				class:text-white={selectedGenre === genre.id}
				class:bg-gray-200={selectedGenre !== genre.id}
				class:text-gray-700={selectedGenre !== genre.id}
				class:hover:bg-gray-300={selectedGenre !== genre.id}
			>
				{genre.name}
			</button>
		{/each}
	</div>

	{#if filteredProducts.length > 0}
		<div class="text-gray-600 mb-6">
			Найдено: {filteredProducts.length}
		</div>
	{/if}

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
		{#if filteredProducts.length === 0}
			<div class="col-span-full flex items-center justify-center py-12">
				<div class="text-center">
					<p class="text-gray-400 text-lg">Ничего не найдено</p>
					<p class="text-gray-500 text-sm mt-2">Попробуйте изменить критерии поиска</p>
				</div>
			</div>
		{:else}
			{#each filteredProducts as product (product.id)}
				<div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
					<div class="aspect-square bg-gray-100 overflow-hidden">
						<img
							src={product.coverUrl}
							alt={product.title}
							class="w-full h-full object-cover"
						/>
					</div>

					<div class="p-4">
						<h3 class="font-semibold text-gray-900 mb-1">{product.title}</h3>
						<p class="text-sm text-gray-600 mb-3">{product.artist}</p>
						<p class="text-xs text-gray-500 mb-4">{product.genre}</p>

						<button 
							onclick={() => favoritesStore.toggle(product.id)}
							class="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded transition-colors"
							aria-label={$favoritesStore.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}
						>
							<svg 
								class="w-5 h-5 transition-all" 
								fill={$favoritesStore.includes(product.id) ? 'currentColor' : 'none'} 
								stroke="currentColor" 
								class:text-red-500={$favoritesStore.includes(product.id)}
								class:text-gray-400={!$favoritesStore.includes(product.id)}
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
