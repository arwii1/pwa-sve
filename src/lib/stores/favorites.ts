import { writable } from 'svelte/store';

function createFavoritesStore() {
	const initialFavorites: number[] = 
		typeof window !== 'undefined' && localStorage.getItem('favorites')
			? JSON.parse(localStorage.getItem('favorites') || '[]')
			: [];

	const { subscribe, update } = writable<number[]>(initialFavorites);

	return {
		subscribe,
		add: (id: number) => {
			update(favs => {
				if (!favs.includes(id)) {
					favs = [...favs, id];
					if (typeof window !== 'undefined') {
						localStorage.setItem('favorites', JSON.stringify(favs));
					}
				}
				return favs;
			});
		},
		remove: (id: number) => {
			update(favs => {
				favs = favs.filter(fav => fav !== id);
				if (typeof window !== 'undefined') {
					localStorage.setItem('favorites', JSON.stringify(favs));
				}
				return favs;
			});
		},
		toggle: (id: number) => {
			update(favs => {
				if (favs.includes(id)) {
					favs = favs.filter(fav => fav !== id);
				} else {
					favs = [...favs, id];
				}
				if (typeof window !== 'undefined') {
					localStorage.setItem('favorites', JSON.stringify(favs));
				}
				return favs;
			});
		},
		isFavorite: (id: number) => {
			let result = false;
			const unsubscribe = subscribe(favs => {
				result = favs.includes(id);
			});
			unsubscribe();
			return result;
		}
	};
}

export const favoritesStore = createFavoritesStore();
