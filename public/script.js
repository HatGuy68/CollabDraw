let CANVAS = document.getElementById("canvas");
let CTX = CANVAS.getContext('2d');
let mouseDown = touchStart = false;

CANVAS.width = window.innerWidth * 0.98;
CANVAS.height = window.innerHeight * 0.96;

addEventListeners();

function addEventListeners() {
    CANVAS.addEventListener('mousedown', onMouseDown)
    CANVAS.addEventListener('mousemove', onMouseMove)
    CANVAS.addEventListener('mouseup', onMouseUp)
    CANVAS.addEventListener('touchstart', onTouchStart)
    CANVAS.addEventListener('touchmove', onTouchMove)
    CANVAS.addEventListener('touchend', onTouchEnd)
}

function onTouchStart(evt) {
    CTX.moveTo(evt.touches[0].clientX, evt.touches[0].clientY);
    touchStart = true
}

function onTouchMove(evt) {
    let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
    if (touchStart === true) {
        x = loc.x;
        y = loc.y;

        CTX.lineTo(x, y);
        CTX.stroke();
    }
}

function onTouchEnd() {
    touchStart = false
}

function onMouseDown(evt) {
    CTX.moveTo(evt.clientX, evt.clientY);
    mouseDown = true
}

function onMouseMove(evt) {
    if (mouseDown === true) {
        x = evt.clientX;
        y = evt.clientY;

        CTX.lineTo(x, y);
        CTX.stroke();
    }
}

function onMouseUp() {
    mouseDown = false
}