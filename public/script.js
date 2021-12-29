let CANVAS = document.getElementById("canvas");
let CTX = CANVAS.getContext('2d');
let mouseDown = touchStart = false;

CANVAS.width = window.innerWidth * 0.98;
CANVAS.height = window.innerHeight * 0.96;