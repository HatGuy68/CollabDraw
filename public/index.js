let CANVAS = document.getElementById("canvas");
let CTX = CANVAS.getContext('2d');
let mouseDown = touchStart = false;

CANVAS.width = window.innerWidth * 0.98;
CANVAS.height = window.innerHeight * 0.96;


var socket = io('https://agile-springs-94008.herokuapp.com/'); // change to localhost:8080 during development

socket.on("onpropogate", (data) => {
    CTX.lineTo(data.x, data.y);
    CTX.stroke();
});

socket.on("ondown", (data) => {
    console.log('down');
    CTX.moveTo(data.x, data.y);
});

socket.on("onclear", () => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
});

addEventListeners();

function addEventListeners() {
    CANVAS.addEventListener('mousedown', onMouseDown);
    CANVAS.addEventListener('mousemove', onMouseMove);
    CANVAS.addEventListener('mouseup', onMouseUp);
    CANVAS.addEventListener('touchstart', onTouchStart);
    CANVAS.addEventListener('touchmove', onTouchMove);
    CANVAS.addEventListener('touchend', onTouchEnd);
    document.getElementById('clear').addEventListener('click', clearBoard);
    // document.getElementById('insert').addEventListener('click', insertImage);
    // document.getElementById('draw').addEventListener('click', selectPen);
    // document.getElementById('text').addEventListener('click', insertTextBox);
}

function clearBoard() {
    console.log('sent clear');
    socket.emit("clear");
}

function onTouchStart(evt) {
    CTX.moveTo(evt.touches[0].clientX, evt.touches[0].clientY);
    data = { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
    socket.emit('down', data);
    touchStart = true
}

function onTouchMove(evt) {
    let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
    if (touchStart === true) {
        x = loc.x;
        y = loc.y;

        socket.emit('propogate', { x, y });
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
    socket.emit('down', data);
    mouseDown = true
}

function onMouseMove(evt) {
    if (mouseDown === true) {
        x = evt.clientX;
        y = evt.clientY;

        socket.emit('propogate', { x, y });
        CTX.lineTo(x, y);
        CTX.stroke();
    }
}

function onMouseUp() {
    mouseDown = false
}