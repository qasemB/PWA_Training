if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(function(res){
            console.log("SW registered...");
            console.log(res);
        })
        .catch(function(e){
            console.log(e.message);
        })
}


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: "right"
    });
});