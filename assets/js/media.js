const videoElement = document.getElementById('media_player');
const captureBtn = document.getElementById('media_capture_btn');
const canvasElement = document.getElementById('media_canvas');
const refreshBtn = document.getElementById('media_refresh');
const fileInput = document.getElementById('media_select_image');

const startVideo = ()=>{
    navigator.mediaDevices.getUserMedia({video: true}).then(stream=>{
        window.localStream = stream
        videoElement.srcObject = stream
    })
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

