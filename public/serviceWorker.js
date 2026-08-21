const URLS_TO_CACHE = [
    "/",
    "/index.html",
    "/favicon.png"
];

self.addEventListener("activate", (event) => {
    const cacheWhitelist = ["taskbuddy-static", "taskbuddy-dynamic"];
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
        caches.open("taskbuddy-static").then((cache) => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/tasks")) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open("taskbuddy-dynamic").then((cache) => {
                        cache.put(event.request, clone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
    if (event.request.url.includes("/assets/")) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                return (
                    resp ||
                    fetch(event.request).then((networkResp) => {
                        caches.open("taskbuddy-static").then((cache) => {
                            cache.put(event.request, networkResp.clone());
                        });
                        return networkResp;
                    })
                );
            })
        );
    }
});