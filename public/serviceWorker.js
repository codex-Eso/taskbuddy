const CACHE_NAME = "taskbuddy-cache-v1";
const URLS_TO_CACHE = [
    "/",
    "/index.html",
    "/favicon.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/tasks")) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) =>
                cache.match(event.request).then((resp) => {
                    const fetchPromise = fetch(event.request).then((networkResp) => {
                        cache.put(event.request, networkResp.clone());
                        return networkResp;
                    });
                    return resp || fetchPromise;
                })
            )
        );
    }
});