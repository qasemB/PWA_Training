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
if (Notification.permission == "default") {
  setTimeout(()=>{
    document.getElementById('notification_bell_box')?.classList.remove('dis-none')
  },10000)
}

const showConfirmNotify = ()=>{
  if ("serviceWorker" in navigator) {
    const options = {
      body: "ممنون از شما بخاطر تایید اعلانات...!",
      icon: "/assets/images/codeyadIcon.png",
      image: "/assets/images/office.jpg",
      dir: "ltr",
      vibrate: [100, 50, 200],
      badge: "/assets/images/codeyadIcon.png",
      tag: "group1",
      renotify: true,
      actions: [
        {action: "confirm", title: "تایید", icon:"/assets/images/confirm.png"},
        {action: "cancel", title: "انصراف", icon:"/assets/images/cancel.png"}
      ]
    }
    navigator.serviceWorker.ready.then(sw=>{
      sw.showNotification('ممنون از شما...!', options)
    })
  }
}

document.getElementById('notification_bell_box').addEventListener('click', ()=>{
  Notification.requestPermission((res)=>{
    if (res == "granted") {
      showConfirmNotify()
    }else{
      console.log("Blocked...!");
    }
  })
})

