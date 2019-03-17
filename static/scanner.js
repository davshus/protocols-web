let socket = io();
let scanner = new Instascan.Scanner({
    video: document.querySelector('.preview'),
    captureImage: true
});
let handleScan = function(content, img) {
    lastImage = img;
    lastResult = content;
    document.querySelector('.snapshot').src = 'data:base64/' + img;
    openConfirm();
    console.log(content);
    // console.log('%c       ', 'font-size: 700px; background: url(data:base64/' + img + ') no-repeat;');
};
document.querySelector('.preview').addEventListener('click', e => {
    let result = scanner.scan();
    if (result) handleScan(result.content, result.image);
    else console.log('No code found');
});
let lastImage;
let lastResult;
scanner.addListener('scan', handleScan);
let cameraList = [];
let currentCamera = 0;
Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        cameraList = cameras;
    } else {
        console.error('No cameras found.');
    }
    if (cameraList.length > 0) {
        initScanner(currentCamera);
    }
}).catch(function (e) {
    console.error(e);
});
function initScanner(cameraID) {
    scanner.stop().then(() => scanner.start(cameraList[cameraID]));
}
function nextCamera() {
    currentCamera++;
    currentCamera %= cameraList.length;
    initScanner(currentCamera);
}
function openConfirm() {
    document.body.className = 'confirming';
}
function closeConfirm() {
    document.body.className = '';
}
function confirm() {
    //TODO: COMPLETE
    // alert(lastResult);
    // socket.emit('scan', lastResult);
    fetch('/submit?data=' + lastResult);
    closeConfirm();
}