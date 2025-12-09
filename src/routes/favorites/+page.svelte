<script lang="ts">
	import { base } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { MOCK_TRACKS } from '$lib/models/track.model';
	import { favoritesStore } from '$lib/stores/favorites';

	let favoriteProducts = $derived(
		MOCK_TRACKS.filter(track => $favoritesStore.includes(track.id))
	);
</script>

<Breadcrumbs items={[{ label: 'Каталог', href: base }, { label: 'Избранное', href: base + '/favorites' }]} />

<div class="mb-8">
	<h1 class="text-3xl font-bold text-gray-900 mb-6">Мои избранные треки</h1>

	{#if favoriteProducts.length > 0}
		<div class="text-gray-600 mb-6">
			Всего: {favoriteProducts.length}
		</div>
	{/if}

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
		{#if favoriteProducts.length === 0}
			<div class="col-span-full flex items-center justify-center py-12">
				<div class="text-center">
					<p class="text-gray-400 text-lg">Избранное пусто</p>
					<p class="text-gray-500 text-sm mt-2">
						<a href="{base}" class="text-blue-600 hover:text-blue-700">Добавьте треки из каталога</a>
					</p>
				</div>
			</div>
		{:else}
			{#each favoriteProducts as product (product.id)}
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
							onclick={() => favoritesStore.remove(product.id)}
							class="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded transition-colors"
							aria-label="Remove from favorites"
						>
							<svg 
								class="w-5 h-5 text-red-500 transition-all" 
								fill="currentColor" 
								stroke="currentColor" 
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
