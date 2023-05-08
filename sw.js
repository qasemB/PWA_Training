let staticItems = [
    "/",
    "/index.html",
    "/offline.html",
    "/assets/materialize/css/materialize.min.css",
    "/assets/css/util.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/assets/css/style.css",
    "/assets/materialize/js/materialize.min.js",
    "/assets/js/app.js",
    "https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
]

let STATIC_CACHE = "static-v3"
let DYNAMIC_CACHE = "dynamic"

// install event -------------------------------------->>
self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(STATIC_CACHE).then(cache=>{
            cache.addAll(staticItems)
        })
    )
})  


// activate event ------------------------------------>>
self.addEventListener("activate", function(e){
    e.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(
                keys.map(key=>{
                    if (key != STATIC_CACHE && key != DYNAMIC_CACHE) {
                        console.log("Deleting Cache:", key);
                        return caches.delete(key);
                    }
                })
            )
        })
    )
    return self.clients.claim()
})


// fetch event -------------------------------------->>
self.addEventListener("fetch", function(e){
    e.respondWith(
        caches.match(e.request).then(res=>{
            return res || fetch(e.request).then(fetchRes=>{
                return caches.open(DYNAMIC_CACHE).then(cache=>{
                    cache.put(e.request, fetchRes.clone())
                    return fetchRes
                })
            }).catch(err=>{
                return caches.open(STATIC_CACHE).then(cache=>{
                    if (e.request.headers.get("accept").includes("text/html")) {
                        return cache.match("/offline.html")
                    }
                })
            })
        })
    )
})