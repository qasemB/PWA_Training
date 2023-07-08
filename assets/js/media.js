const videoElement = document.getElementById('media_player');
const captureBtn = document.getElementById('media_capture_btn');
const canvasElement = document.getElementById('media_canvas');

navigator.mediaDevices.getUserMedia({video: true}).then(stream=>{
    videoElement.srcObject = stream
})

captureBtn.addEventListener('click', ()=>{
    const context = canvasElement.getContext('2d');
    canvasElement.classList.remove('dis-none')
    videoElement.classList.add('dis-none')
    context.drawImage(videoElement, 0 , 0, canvasElement.clientWidth, videoElement.videoHeight/(videoElement.videoWidth/canvasElement.width))
})

