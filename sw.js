let cacheName = "V.0.9.5"
let assets = [
  // prettier-ignore
  "index.html",
  "./src/scripts/script.js",
  "./sw.js",
  "./src/scripts/changeBackground.js",
  "./src/icons/android/android-launchericon-192-192.png",
]

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request)
    })
  )
})

self.addEventListener("activate", (cleanEvent) => {
  cleanEvent.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== assets) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("sw.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err))
  })
}
