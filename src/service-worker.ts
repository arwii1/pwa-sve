/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const PRECACHE_MANIFEST = self.__WB_MANIFEST || [];

const CACHE_NAME = 'pwa-sve-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

const ASSETS_TO_PRECACHE = PRECACHE_MANIFEST.length > 0
	? PRECACHE_MANIFEST.map((entry: any) => entry.url || entry)
	: ['/'];

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return Promise.all(
				ASSETS_TO_PRECACHE.map(url => 
					cache.add(url).catch(() => {
						// ignore
					})
				)
			);
		})
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event: FetchEvent) => {
	const { request } = event;
	const url = new URL(request.url);

	if (request.method !== 'GET') {
		return;
	}

	if (!url.protocol.startsWith('http')) {
		return;
	}

	if (url.hostname.includes('chrome-extension')) {
		return;
	}

	if (request.url.includes('/api/')) {
		event.respondWith(
			fetch(request)
				.then((response) => {
					if (response && response.status === 200 && response.type !== 'error') {
						const cache = caches.open(RUNTIME_CACHE);
						cache.then((c) => c.put(request, response.clone()));
					}
					return response;
				})
				.catch(() => {
					return caches.match(request).then((response) => {
						return response || new Response('Offline', { status: 503 });
					});
				})
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((response) => {
			if (response) {
				return response;
			}

			return fetch(request)
				.then((response) => {
					if (!response || response.status !== 200 || response.type === 'error') {
						return response;
					}

					const responseToCache = response.clone();
					caches.open(RUNTIME_CACHE).then((cache) => {
						cache.put(request, responseToCache).catch(() => {
						});
					});

					return response;
				})
				.catch(async () => {
					return (await caches.match('/offline.html')) || (await caches.match('/')) || new Response('Offline', { status: 503 });
				});
		})
	);
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

export {};
