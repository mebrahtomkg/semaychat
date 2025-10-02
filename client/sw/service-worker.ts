const SW_VERSION = 'v28';

const CACHEABLE_REQUEST_URLS = [
  `${self.API_URL}/messages/file/`,
  `${self.API_URL}/profile-photos/file/`,
];

const isCacheableRequest = (req: Request) => {
  if (req.method.toUpperCase() !== 'GET') return false;

  return CACHEABLE_REQUEST_URLS.some((cacheableUrl) =>
    req.url.startsWith(cacheableUrl),
  );
};

self.addEventListener('install', (_event: ExtendableEvent) => {
  console.log('[SW][Event] Install');
  self.skipWaiting();
});

const deleteOldCaches = async () => {
  console.log('[SW] Deleting old caches');
  const cacheKeys = await caches.keys();
  for (const key of cacheKeys) {
    if (key !== SW_VERSION) {
      console.log('[SW] Deleting cache:', key);
      await caches.delete(key);
    }
  }
};

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[SW][Event] Activate');
  event.waitUntil(Promise.all([deleteOldCaches(), clients.claim()]));
});

const putInCache = async (req: Request, res: Response) => {
  const cache = await caches.open(SW_VERSION);
  await cache.put(req, res);
};

const cacheFirst = async (req: Request) => {
  const cachedResponse = await caches.match(req);
  if (cachedResponse) {
    console.log('[sw] Responding from cache for:', req.url);
    return cachedResponse;
  }

  const response = await fetch(req);
  putInCache(req, response.clone());
  return response;
};

self.addEventListener('fetch', (event: FetchEvent) => {
  console.log('[SW][Event] Fetch');

  const req = event.request;

  if (!isCacheableRequest(req)) return;

  console.log('[SW] Handling fetch for:', req.url);
  event.respondWith(cacheFirst(req));
});
