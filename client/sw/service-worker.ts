const SW_VERSION = 'v25';

self.addEventListener('install', (_event: ExtendableEvent) => {
  console.log('[SW][event] Install');
  self.skipWaiting();
});

const deleteOldCaches = async () => {
  const cacheKeys = await caches.keys();
  for (const key of cacheKeys) {
    if (key !== SW_VERSION) {
      console.log('[SW] Deleting old cache:', key);
      await caches.delete(key);
    }
  }
};

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[SW][event] Activate');
  event.waitUntil(Promise.all([deleteOldCaches(), clients.claim()]));
});

const putInCache = async (request: Request, response: Response) => {
  const cache = await caches.open(SW_VERSION);
  await cache.put(request, response);
};

const cacheFirst = async (request: Request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('[sw] Responding from cache', request.url);
    return responseFromCache;
  }

  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener('fetch', (event: FetchEvent) => {
  const request = event.request;
  console.log('[SW][event] Fetch');

  if (
    request.method !== 'GET' ||
    !request.url.startsWith('http://localhost:3000/api/messages/file/')
  ) {
    return;
  }

  console.log('[SW] Handling fetch', request.url);

  event.respondWith(cacheFirst(request));
});
