let CANVAS = document.getElementById("canvas");
let CTX = CANVAS.getContext('2d');
let mouseDown = touchStart = false;

CANVAS.width = window.innerWidth * 0.98;
CANVAS.height = window.innerHeight * 0.96;

var io = io.connect('http://localhost:8080/');

io.on("onpropogate", (data) => {
    CTX.lineTo(data.x, data.y);
    CTX.stroke();
});

io.on("ondown", (data) => {
    CTX.moveTo(data.x, data.y);
});

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
    data = { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
    io.emit('down', data);
    touchStart = true
}

function onTouchMove(evt) {
    let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
    if (touchStart === true) {
        x = loc.x;
        y = loc.y;

        io.emit('propogate', { x, y });
        CTX.lineTo(x, y);
        CTX.stroke();
    }
}

function onTouchEnd() {
    touchStart = false
}

function onMouseDown(evt) {
    CTX.moveTo(evt.clientX, evt.clientY);
    data = { x: evt.clientX, y: evt.clientY }
    io.emit('down', data);
    mouseDown = true
}

function onMouseMove(evt) {
    if (mouseDown === true) {
        x = evt.clientX;
        y = evt.clientY;

        io.emit('propogate', { x, y });
        CTX.lineTo(x, y);
        CTX.stroke();
    }
}

function onMouseUp() {
    mouseDown = false
}