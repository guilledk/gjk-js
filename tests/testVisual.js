import { vec3 } from "../lib/gl-matrix/index.js";

import { Shape, GJKContext } from "../gjk.js";
import { rectVerts, triVerts } from "./constants.js";


const canvas = document.getElementById("testCanvas");
let ctx; 
let prevTime = Date.now();
let currentTime = Date.now();
let deltaTime = 0;

let keysDown = {};
let keysPressed, keysReleased;

function clearKeys() {
    keysPressed = {};
    keysReleased = {};
}

function keyDownHandler(event) {
    keysDown[event.code] = true;
    keysPressed[event.code] = true;
}

function keyUpHandler(event) {
    keysDown[event.code] = false;
    keysReleased[event.code] = true;
}

function isKeyDown(code) {
    if (code in keysDown)
        return keysDown[code];

    return false;
}

function wasKeyPressed(code) {
    if (code in keysPressed)
        return keysPressed[code];

    return false;
}

function wasKeyReleased(code) {
    if (code in keysReleased)
        return keysReleased[code];

    return false;
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

function resizeEventHandler() {
    const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
    )
    const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
    )

    canvas.width = vw;
    canvas.height = vh;
    ctx = canvas.getContext("2d");
}


let a = new Shape([100, 100, 0], [40, 40, 1], rectVerts);
let b = new Shape([160, 80, 0], [40, 40, 1], triVerts);

let sinCounter = 0;


function updateTriangles() {
    
    if (isKeyDown("KeyD"))
        b.rotation += Math.PI * deltaTime;

    if (isKeyDown("KeyA"))
        b.rotation -= Math.PI * deltaTime;

    if(new GJKContext(a, b).performTest())
        a._debugColor = "#F7A07C";
    else
        a._debugColor = "#D4DBB0";
}


function updateCanvas() {
    clearKeys();
    currentTime = Date.now();
    deltaTime = (currentTime - prevTime) / 1000;

    sinCounter += deltaTime;
    if (sinCounter > 1)
        sinCounter = 0;

    updateTriangles();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    a.draw(ctx);
    b.draw(ctx);

    a.pos[1] = 100 + (Math.sin(sinCounter * Math.PI) * 100);

    prevTime = currentTime;
    window.requestAnimationFrame(updateCanvas);
}


function loadEventHandler() {

    resizeEventHandler();
    window.requestAnimationFrame(updateCanvas);

}

window.addEventListener("load", loadEventHandler, false);
window.addEventListener("resize", resizeEventHandler, false);
