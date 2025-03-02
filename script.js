/*
    Notes:
    getContext() method: returns a drawing context on the canvas
*/

/* CANVAS */

const canvas = document.querySelector("canvas"), // searches the web page for first element with tag "canvas", (provides reference to drawing area)
    toolBtns = document.querySelectorAll(".tool"), // (list of all the elements with class tool) searches the html document for all elements in the tool class and stores in toolBtns
      ctx = canvas.getContext("2d"); // calls the getContext("2d"), method on the canvas, which returns a 2D drawing context which is then stored in ctx and provides all the methods and tools needed to draw shapes/lines/graphics in 2 dimensions.

let isDrawing = false; //variables declared with let can be changed later
brushWidth = 5;

/* Caliberate canvas's width and height with actual canvas' height */

window.addEventListener("load", () => { //event listener to the browser window(thus the window.), waiting for the "load" event, once loaded, it sets canvas width 
    canvas.width = canvas.offsetWidth; // offsetwidth and offstheight are properties that give the visible dimensions of the canvas element with the html element(includes padding & border), crucial for aligning drawing area with what the user sees
    canvas.height = canvas.offsetHeight; //without these lines, it won't follow the mouse properly
});

ctx.lineCap = "round";  //makes line ends rounded

//draw

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath(); //starts from a new path
    ctx.lineWidth = brushWidth; //passing brushSize as line width
}

const drawing = (e) => { //declares a constant function, which takes a paremeter e(short for event), this function will be called whenever a specific event occurs (e contains the information about the event)
    if (!isDrawing) return; //if its not drawing, leave the function
    ctx.lineTo(e.offsetX, e.offsetY); // creates line according to mouse pointer
    ctx.stroke();                    // draws/fills line with color
}

//logs button id to console

toolBtns.forEach(btn => { // .forEach: method avlbl on arrays/nodelists in js, allows iteratng over each element in the collection. => is the modern way to define functions in js
    btn.addEventListener("click", () => {
        console.log(btn.id);
    })
});

// event listeners

canvas.addEventListener("mousemove", drawing); //attaches an event listener to the canvas element listens for the "mousemove" event
canvas.addEventListener("mousedown", startDraw); //attaches an event listener to the canvas element listens for the "mousedown"(mouseclick) event
canvas.addEventListener("mouseup", () => isDrawing = false); //attaches an event listener to the canvas element listens for the "mousedown"(mouseclick) event

