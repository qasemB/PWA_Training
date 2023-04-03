self.addEventListener("install", function(e){
    console.log("SW installed...");
    console.log(e);
})  

self.addEventListener("activate", function(e){
    console.log("SW Activated...");
    console.log(e);
    return self.clients.claim()
})

self.addEventListener("fetch", function(e){
    console.log("SW Fetching something...");
    console.log(e);
})