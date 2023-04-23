self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open("static").then(cache=>{
            cache.add("/")
            cache.add("/index.html")
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