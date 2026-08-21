const URLS_TO_CACHE = [
    "/",
    "/index.html",
    "/favicon.png"
];

self.addEventListener("activate", (event) => {
    const cacheWhitelist = ["taskbuddy-static-v1"];
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (!cacheWhitelist.includes(key)) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("taskbuddy-static-v1").then((cache) => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/assets/")) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                return (
                    resp ||
                    fetch(event.request).then((networkResp) => {
                        caches.open("taskbuddy-static-v1").then((cache) => {
                            cache.put(event.request, networkResp.clone());
                        });
                        return networkResp;
                    })
                );
            })
        );
    }
});