
navigator.mediaDevices.getUserMedia({video: true}).then(stream=>{
    document.getElementById('media_player').srcObject = stream
})