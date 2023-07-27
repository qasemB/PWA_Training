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
  if (!window.matchMedia("(display-mode: standalone)").matches) {
    setTimeout(() => {
      document.getElementById("install-prompt")?.classList.add("show");
    }, 5000);
  }
  e.preventDefault();
  deferredPrompt = e;
  return false;
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
    // const options = {
    //   body: "ممنون از شما بخاطر تایید اعلانات...!",
    //   icon: "/assets/images/codeyadIcon.png",
    //   image: "/assets/images/office.jpg",
    //   dir: "ltr",
    //   vibrate: [100, 50, 200],
    //   badge: "/assets/images/codeyadIcon.png",
    //   tag: "group1",
    //   renotify: true,
    //   actions: [
    //     {action: "confirm", title: "تایید", icon:"/assets/images/confirm.png"},
    //     {action: "cancel", title: "انصراف", icon:"/assets/images/cancel.png"}
    //   ]
    // }
    navigator.serviceWorker.ready.then(sw=>{
      // sw.showNotification('ممنون از شما...!', options)
      sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BNbqX8M5NJJfs_IcL_5Gfisx7FkOYHtYniD4QMJq1RB4DeQsOmGo3lO-zzurFEqTUwtrqQHKb62p_TzxPU552yI"
      }).then(subscription=>{
        fetch("https://pushnotif.azhadev.ir/api/push-subscribe",{
          method: "post",
          body: JSON.stringify(subscription),        
        }).then(res=>{
          return res.json()
        }).then(response=>{
          console.log(response);
          alert("این کد رو ذخیره کنید : "+ response.user_code)
        })
      })
    })
  }
}

document.getElementById('notification_bell_box')?.addEventListener('click', ()=>{
  Notification.requestPermission((res)=>{
    if (res == "granted") {
      showConfirmNotify()
    }else{
      console.log("Blocked...!");
    }
  })
})

// createData("postDataStore", {id: 1, field: "test"})

