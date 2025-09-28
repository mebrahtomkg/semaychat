/////////////////////////////////////////////////////////////////////
const CACHE_NAME = 'v14';

/////////////////////////////////////////////////////////////////////
const addResourcesToCache = async (/** @type {RequestInfo[]} */ resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

self.addEventListener('install', (event) => {
  console.log('[sw] Install event fired');
  // event.waitUntil(addResourcesToCache(['/', '/vendor.43c7f24393b77f12.js']));
});

/////////////////////////////////////////////////////////////////////
self.addEventListener('activate', (event) => {
  console.log('[sw] Activate event fired');
  event.waitUntil(clients.claim());
});

/////////////////////////////////////////////////////////////////////
const putInCache = async (
  /** @type Request **/ request,
  /** @type Response */ response,
) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async (/** @type Request **/ request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('[sw] Responding from cache', request.url);
    return responseFromCache;
  }

  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener('fetch', (event) => {
  /** @type Request **/
  const request = event.request;
  console.log('[sw] Fetch event fired', CACHE_NAME, request.url);

  if (
    request.method !== 'GET' ||
    !request.url.startsWith('http://localhost:3000/api/messages/file/')
  ) {
    return;
  }

  event.respondWith(cacheFirst(request));
});
