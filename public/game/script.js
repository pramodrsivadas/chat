var canvas  = document.getElementById('game')
var c = canvas.getContext('2d');
var width   = window.innerWidth;
var height  = window.innerHeight;
c.width = width;
c.height = height;

var Circle = function(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.draw = function() {
        c.beginPath();
        console.log(this);
        c.arc(this.x,this.y,20, 0,Math.PI * 2);
        //c.arc(100,100,20, 0,Math.PI * 2);
        c.strokeStyle = 'blue';
        c.stroke();
    };
}
// c.beginPath();
// c.arc(100,100,20, 0,Math.PI * 2);
// c.strokeStyle = 'blue';
// c.stroke();
var crcle = new Circle(200, 300, 100);
crcle.draw();
