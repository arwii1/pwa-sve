<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { favoritesStore } from '$lib/stores/favorites';
</script>

<header class="sticky top-0 z-50 bg-white shadow-lg">
	<div class="container mx-auto px-4 py-4">
		<div class="flex items-center justify-between gap-4">
			<a href="{base}" class="flex-shrink-0 font-bold text-xl">
				Shop
			</a>

			<div class="flex items-center space-x-6 flex-shrink-0">
				<nav class="flex space-x-6">
					<a
						href="{base}"
						class="text-gray-700 hover:text-blue-600 transition-colors"
					>
						Каталог
					</a>
				</nav>

				<div class="relative">
					<a
						href="{base}/favorites"
						class="text-gray-700 hover:text-blue-600 transition-colors"
						aria-label="Избранное"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</a>
					{#if $favoritesStore.length > 0}
						<span class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
							{$favoritesStore.length}
						</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>