

window.onload = () => {
    const canvas = document.querySelector("canvas"),
          ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetHeight;
    canvas.height = canvas.offsetWidth;
    ctx.lineCap = 'round';
    //variables
    let isDrawing = false;

    function startDraw(e) {
        isDrawing = true;
        ctx.beginPath();
    }

    function drawing(e) {
        if (!isDrawing) {
            return;
        }
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    //event listeners
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mouseuout', stopDrawing);

};
