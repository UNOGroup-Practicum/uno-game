// Service Workers. Инструкция по применению https://habr.com/ru/company/2gis/blog/345552/
export declare const self: ServiceWorkerGlobalScope;

const serviceWorker = self;
const CACHE_NAME = "uno-cache-v1";
const URLS = ["/"];
const FALLBACK_BODY = `Нет соединения с интернетом. Приложение работает в оффлайн режиме`;
const FALLBACK_RESPONSE_INIT = { headers: { "Content-Type": "text/html; charset=utf-8" } };

serviceWorker.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      // `skipWaiting()` необходим, потому что мы хотим активировать SW
      // и контролировать его сразу, а не после перезагрузки.
      .then(() => self.skipWaiting())
  );
});

serviceWorker.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // `self.clients.claim()` позволяет SW начать перехватывать запросы с самого начала,
      // это работает вместе с `skipWaiting()`, позволяя использовать `fallback` с самых первых запросов.
      serviceWorker.clients.claim();

      // Если имя кеша поменялось, удаляем старый кеш
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name_1) => caches.delete(name_1))
      );
    })()
  );
});

self.addEventListener("fetch", function (event) {
  if (isUnprocessedRequest(event.request)) {
    return;
  }

  // Если дефолтная стратегия кеширования "networkOrCache" сломается, сработает `Embedded fallback`
  // `Embedded fallback` никогда не упадет, т.к мы всегда отдаем заранее подготовленные данные.
  event.respondWith(
    networkOrCache(event.request).catch(() =>
      Promise.resolve(new Response(FALLBACK_BODY, FALLBACK_RESPONSE_INIT))
    )
  );
});

async function networkOrCache(request: Request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(request.url);

    cache.add(request);

    return response;
  } catch {
    const cashedRequest = await caches.match(request);

    return cashedRequest || Promise.reject("no-match");
  }
}

function isUnprocessedRequest(request: Request) {
  const url = new URL(request.url);

  // External url
  if (url.origin !== location.origin) {
    return true;
  }

  if (request.method !== "GET") {
    return true;
  }

  // API
  if (url.pathname.match(/^\/api\/.+/)) {
    return true;
  }

  return false;
}
