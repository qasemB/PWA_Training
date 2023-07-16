const videoElement = document.getElementById('media_player');
const captureBtn = document.getElementById('media_capture_btn');
const canvasElement = document.getElementById('media_canvas');
const refreshBtn = document.getElementById('media_refresh');
const fileInput = document.getElementById('media_select_image');

const startVideo = ()=>{

    // if (!("mediaDevices" in navigator))  navigator.mediaDevices = {}
    // if (!("getUserMedia" in navigator.mediaDevices)) {
    //     console.log("not supported");
    //     navigator.mediaDevices.getUserMedia = (constraints)=>{
    //         const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    //         if (!getUserMedia) return Promise.reject(new Error('getUserMedia is not supported...'))

    //         return new Promise((resolve, reject)=>{
    //             getUserMedia.call(navigator, constraints, resolve, reject)
    //         })
    //     }
    // }

    if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream=>{
            window.localStream = stream
            videoElement.srcObject = stream
        })
    }
}

startVideo()

captureBtn.addEventListener('click', (e)=>{
    const context = canvasElement.getContext('2d');
    canvasElement.classList.remove('dis-none')
    refreshBtn.classList.remove('dis-none')
    videoElement.classList.add('dis-none')
    e.target.classList.add('dis-none')
    context.drawImage(videoElement, 0 , 0, canvasElement.clientWidth, videoElement.videoHeight/(videoElement.videoWidth/canvasElement.width))
    localStream.getVideoTracks()[0].stop();
    // console.log(canvasElement.toDataURL());
    // document.getElementById("img_elem").setAttribute("src", canvasElement.toDataURL())
    const imgFile = dataURItoBlob(canvasElement.toDataURL())
    const formData = new FormData
    formData.append("image", imgFile);
    // fetch("url...",{
    //     method: "POST",
    //     body: formData
    // })
})

refreshBtn.addEventListener('click', ()=>{
    canvasElement.classList.add('dis-none')
    refreshBtn.classList.add('dis-none')
    videoElement.classList.remove('dis-none')
    captureBtn.classList.remove('dis-none')
    startVideo()
})

// fileInput.addEventListener('change', (e)=>{
//     const selectedFile = e.target.files[0]
//     console.log(selectedFile);
//     const formData = new FormData
//     formData.append("image", selectedFile);
//     fetch("url...",{
//         method: "POST",
//         body: formData
//     })
//     axios.post("url...", formData, {/*config*/})
// })

const dataURItoBlob = (dataURI)=>{
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], {type: mimeString})
    return blob
}

