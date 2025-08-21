const CACHE_NAME = "slide-app-cache-v1";
const urlsToCache = [
  "/",                    // index.html
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/src/main.js",
  "/src/App.vue",
  "/src/router/index.js",
  "/src/store/index.js",
  "/src/components/SlideShow.vue",
  "/src/components/SettingsForm.vue",
  "/src/views/SlideView.vue",
  "/src/views/SettingsView.vue"
];

// インストール時にキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ネットワークが使えないときはキャッシュから返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});