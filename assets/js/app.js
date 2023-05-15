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
