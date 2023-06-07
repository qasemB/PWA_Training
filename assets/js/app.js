if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (res) {
    })
    .catch(function (e) {
      console.log(e.message);
    });
}

var deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  return false;
});

window.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(display-mode: standalone)").matches) {
    setTimeout(() => {
      document.getElementById("install-prompt")?.classList.add("show");
    }, 5000);
  }
});

document.getElementById("install-prompt")?.addEventListener("click", (e) => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    e.target.classList.remove("show");
    deferredPrompt.userChoice.then((choiceRes) => {
      console.log(choiceRes.outcome);
      if (choiceRes.outcome === "accepted") {
        console.log("User accepted the install prompt.");
      } else if (choiceRes.outcome === "dismissed") {
        console.log("User dismissed the install prompt");
      }
    });
    deferredPrompt = null;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {
    edge: "right",
  });
});

// Push notification-------------------
// if (Notification.permission != "granted") {
  setTimeout(()=>{
    document.getElementById('notification_bell_box')?.classList.remove('dis-none')
  },1000)
// }

document.getElementById('notification_bell_box').addEventListener('click', ()=>{
  Notification.requestPermission((res)=>{
    if (res == "granted") {
      navigator.serviceWorker.ready.then(sw=>{
        sw.showNotification('ممنون از شما...!', {
          body: "ممنون از شما بخاطر تایید اعلانات...!"
        })
      })
    }else{
      console.log("Blocked...!");
    }
  })
})

