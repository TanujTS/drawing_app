

window.onload = () => {
    const canvas = document.querySelector("canvas"),
          ctx = canvas.getContext('2d'),
          toolBtns = document.querySelectorAll(".tool"),
          sizeSlider = document.getElementById("size-slider"),
          fillColorPicker = document.getElementById("fill-color"),
          strokeColorPicker = document.getElementById("color-picker"),
          clearCanvasBtn = document.querySelector(".clear-canvas"),
          saveImageBtn = document.querySelector(".save-image");

    canvas.width = canvas.offsetHeight;
    canvas.height = canvas.offsetWidth;
    ctx.lineCap = 'round';
    //variables
    let isDrawing = false,
        selectedTool = "brush",
        brushWidth = 3,
        strokeColor = "black",
        fillColor = "white";
        

    // Tool Selection
    toolBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".tool.active").classList.remove("active");
            btn.classList.add("active");
            selectedTool = btn.id;
        })
    })

    //Functions
    let prevMouseX, prevMouseY, snapshot;
    function startDraw(e) {
        isDrawing = true;
        ctx.beginPath();
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    function drawing(e) {
        if (!isDrawing) {
            return;
        }
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = brushWidth;
        ctx.putImageData(snapshot, 0, 0);
        switch(selectedTool) {
            case "brush":
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                break;
            case "rectangle":
                drawRectangle(e);
                break;
            case "circle":
                drawCircle(e);
                break;
            case "triangle":
                drawTriangle(e);
                break;
            case "eraser":
                ctx.strokeStyle = '#FFF';
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                break;
        }
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function drawRectangle(e) {
        ctx.beginPath();
        ctx.fillRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX , e.offsetY - prevMouseY);
    }

    function drawCircle(e) {
        let radius = Math.sqrt(Math.pow(e.offsetX - prevMouseX, 2) + Math.pow(e.offsetY - prevMouseY, 2)) / 2;
        ctx.beginPath();
        ctx.arc((prevMouseX + e.offsetX)/2, (prevMouseY + e.offsetY)/2, radius, 0, 2*Math.PI);
        ctx.fill();
    }
    function drawTriangle(e) {
        const thirdPointX = prevMouseX * 2 - e.offsetX;
    
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY);  // First point (start point)
        ctx.lineTo(e.offsetX, e.offsetY);     // Second point (current mouse position)
        ctx.lineTo(thirdPointX, e.offsetY);   // Third point (symmetric point)
        ctx.closePath();
        ctx.stroke();
    }

    //event listeners
    saveImageBtn.addEventListener("onclick", () => {
        canvas.toDataURL();
    });
    strokeColorPicker.addEventListener("change", () => {
        strokeColor = strokeColorPicker.value;

    });
    fillColorPicker.addEventListener("change", () => {
        fillColor = fillColorPicker.value;
    });
    sizeSlider.addEventListener("change", () => {
        brushWidth = sizeSlider.value/4;
    });

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mouseout', stopDrawing);

};
