const cacheName = 'v2';

const cacheAssets = [
	'/',
	'/index.html',
	'/js/index.js',
	'/css/style.css',
	'/css/normalize.css',
	'/manifest.json',
];

// Call Install Event
this.addEventListener('install', e => {
	console.log('Service Worker: Installed');

	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker: Caching Files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
	);
});

// Call Activate Event
this.addEventListener('activate', e => {
	console.log('Service Worker: Activate');
	// Remove unwanted caches
	e.waitUntil(
		caches.keys().then(cacheName => {
			return Promise.all(
				cacheName.map(cache => {
					if (cache !== cacheName) {
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Call Fetch Event
this.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		fetch(e.request).catch(() => caches.match(e.request))
	)
})