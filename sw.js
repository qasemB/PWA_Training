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

let STATIC_CACHE = "static-v2"
let DYNAMIC_CACHE = "dynamic"

const trimCache = (chachName, max)=>{
    caches.open(chachName).then(cache=>{
        return cache.keys().then(keys=>{
            if (keys.length > max) {
                cache.delete(keys[0]).then(()=>{
                    trimCache(chachName, max);
                })
            }
        })
    })
}

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

    if (e.request.url.indexOf("https://jsonplaceholder.typicode.com/users") > -1) {
        e.respondWith(
            caches.open(DYNAMIC_CACHE).then(cache=>{
                return fetch(e.request).then(response=>{
                    trimCache(DYNAMIC_CACHE, 10)
                    cache.put(e.request, response.clone())
                    return response
                });
            })
        )
    }else{
        e.respondWith(
            caches.match(e.request).then(res=>{
                return res || fetch(e.request).then(fetchRes=>{
                    return caches.open(DYNAMIC_CACHE).then(cache=>{
                        trimCache(DYNAMIC_CACHE, 10)
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
    }

})


// notification -------------------------------
self.addEventListener('notificationclick', (event)=>{
    if (event.action == "confirm") {
        console.log("اکشن مورد نظر تایید شد...!");
    }else if(event.action == "cancel"){
        event.notification.close()
        console.log("اکشن مورد نظر نادیده گرفته شد...!");
    }else{
        console.log("اکشنی انتخاب نشد...!");
    }
})

self.addEventListener('notificationclose', (event)=>{
    console.log('notification closed...!');
})