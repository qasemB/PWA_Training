let staticItems = [
    "/",
    "/index.html",
    "/assets/materialize/css/materialize.min.css",
    "/assets/css/util.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/assets/css/style.css",
    "/assets/materialize/js/materialize.min.js",
    "/assets/js/app.js",
    "https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
]

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open("static").then(cache=>{
            cache.addAll(staticItems)
        })
    )
})  

self.addEventListener("activate", function(e){
    return self.clients.claim()
})

self.addEventListener("fetch", function(e){
    e.respondWith(
        caches.match(e.request).then(res=>{
            // if (res) {
            //     return res
            // }else{
            //     return fetch(e.request)
            // }
            return res || fetch(e.request)
        })
    )
})