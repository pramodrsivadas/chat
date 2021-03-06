$( document ).ready(function() {
    var canvas  = document.getElementById('game');
    var c = canvas.getContext('2d');
    var width   = window.innerWidth;
    var height  = window.innerHeight;
    if (width > height) {
        var unit = Math.round(width/height);
    } else{
        var unit = Math.round(height/width);
    }
 
    var radius = unit * 20;
    var speedX = unit * 2;
    var speedY = speedX;
    var clickError = unit * 10;
    var win = false;

    canvas.width = width;
    canvas.height = height;
    var mouse = {
        click:false,
        move:false,
        pos:{x:0,y:0},
        pos_prev:false
    };

    var Circle = function(x,y,r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.draw = function() {
            c.beginPath();
            c.arc(this.x,this.y,this.r, 0,Math.PI * 2);
            c.fillStyle = 'orange';
            c.strokeStyle = 'white';
            c.fill();
            c.stroke();
        };
    }

    var x = Math.random() * width;
    var y = Math.random() * height; 
    var x1 = Math.random() * width;
    var y1 = Math.random() * height; 
    canvas.onmousedown = function(e){ 
        var mousePos = getMousePos(canvas, e);
        var clickedX = Math.abs(x - mousePos.x);
        var clickedY = Math.abs(y - mousePos.y);

        if ((clickedX < radius + clickError) && (clickedY < radius + clickError)) {
            win = true;
            alert('You Win !. Click again to start playing again');
            clickError++;
            if (speedX < 0) {
                speedX = speedX - unit;
            }
            else {
                speedX = speedX + unit;
            }
            if (speedY < 0) {
                speedY = speedY - unit;
            }
            else {
                speedY = speedY + unit;
            }

        } else {
            win = false;
        }
    };
    canvas.onmouseup = function(e){ mouse.click = false; };
    canvas.onmousemove = function(e) {
    }

    function animate() {
        if (win == false) {
            c.clearRect(0,0,width,height);
            var crcle = new Circle(x, y, radius);
            crcle.draw();           
            x = x + speedX;
            if (x >= width - radius || x <= 0 + radius) {
                speedX = - speedX;
            }
            y = y + speedY;
            if (y >= height - radius || y <= 0 + radius) {
                speedY = - speedY;
            }
            //showRunningCircle(x, y, radius);
        }
        requestAnimationFrame(animate);        
    }
    animate();  

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    // Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    //mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
});
