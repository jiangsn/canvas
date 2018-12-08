var color = "black";

var canvas = document.getElementById('canvas');
autoCanvasSize(canvas);



//监听mouse按下事件

listenToMouse(canvas);


function listenToMouse(canvas) {
    var using = false;
    var SrartPoint = {
        x: undefined,
        y: undefined
    }
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    canvas.addEventListener("mousedown", (e) => {

        SrartPoint.x = e.layerX;
        SrartPoint.y = e.layerY;
        using = true

    })
    canvas.addEventListener("mousemove", (e) => {
        if (!using) { return }
        lastPoint.x = e.layerX;
        lastPoint.y = e.layerY;
        drawLine(canvas, SrartPoint, lastPoint);
    })

    canvas.addEventListener("mouseup", () => {
        using = false;
    })
}
function updateXY(SrartPoint, lastPoint, ) {
    SrartPoint.x = lastPoint.x;
    SrartPoint.y = lastPoint.y;
}

//画线
function drawLine(canvas, SrartPoint, lastPoint) {
    var ctx = canvas.getContext('2d',);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(SrartPoint.x, SrartPoint.y);
    ctx.lineTo(lastPoint.x, lastPoint.y);
    ctx.stroke()
    ctx.closePath();
    updateXY(SrartPoint, lastPoint);
}




function autoCanvasSize(canvas) {
    setCanvasSize(canvas);
    window.addEventListener("resize", () => {
        var header = document.querySelector("header");
        var menu = document.querySelector(".menu");
        var divH = header.offsetHeight;

        var MH = menu.offsetHeight;
        var all = divH + MH;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - all;
    })
}



function setCanvasSize(canvas) {

    var header = document.querySelector("header");
    var menu = document.querySelector(".menu");
    var divH = header.offsetHeight;

    var MH = menu.offsetHeight;
    var all = divH + MH;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - all;
}

// clear
clear(canvas);
function clear(canvas) {
    document.querySelector(".tools").addEventListener('click', function () {
        var width = canvas.offsetWidth;
        var height = canvas.offsetHeight;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height)
    })
}
xiangpicha()
function xiangpicha() {
    var x = undefined;
    var y = undefined;
    var enable = false;
    var xiang = document.querySelector("#xiang");
    xiang.addEventListener('click', function () {
        enable = true;
        xiang.classList.add("active");
        clearClassActive(qianbi);
        var canvas = document.querySelector("#canvas")
        var ctx = canvas.getContext('2d');
        canvas.addEventListener("mousemove", (e) => {
            if (!enable) { return }
            x = e.layerX;
            y = e.layerY;
            console.log(x)
            ctx.clearRect(x, y, 50, 50)
        })
    })
    var qianbi = document.querySelector("#qianbi");

    qianbi.addEventListener('click', () => {
        enable = false;
        qianbi.classList.add("active");
        console.log(xiang.classList)
        clearClassActive(xiang);
    })
}








// select
selectColor();
function selectColor() {
    var black = document.querySelector("#black");
    black.addEventListener('click', () => {
        black.classList.add("active");
        clearClassActive(red, blue, green, yellow);
        color = black.classList[0];
    });
    var red = document.querySelector("#red");
    red.addEventListener('click', () => {
        red.classList.add("active");
        clearClassActive(black, blue, green, yellow);
        color = red.classList[0];
        
    });
    var blue = document.querySelector("#blue");
    blue.addEventListener('click', () => {
        blue.classList.add("active");
        clearClassActive(black, red, green, yellow);
        color = blue.classList[0];
    });
    var green = document.querySelector("#green");
    green.addEventListener('click', () => {
        clearClassActive(black, red, blue, yellow);
        green.classList.add("active");
        color = green.classList[0];
    });
    var yellow = document.querySelector("#yellow");
    yellow.addEventListener('click', () => {
        clearClassActive(black, red, blue, green);
        yellow.classList.add("active");
        color = yellow.classList[0];
    });

    var customize = document.querySelector("#customize");
    customize.addEventListener('change', () => {
       
        color = customize.value;
    });
}

// 去除className

function clearClassActive(tag0, tag1, tag2, tag3) {
    if (arguments.length == 4) {
        tag0.classList.remove("active");
        tag1.classList.remove("active");
        tag2.classList.remove("active");
        tag3.classList.remove("active");
    } else if (arguments.length == 3) {
        tag0.classList.remove("active");
        tag1.classList.remove("active");
        tag2.classList.remove("active");
    } else if (arguments.length == 2) {
        tag0.classList.remove("active");
        tag1.classList.remove("active");
    } else {
        tag0.classList.remove("active");
    }
}
// download
download();
function download(){
    document.querySelector("#download").addEventListener('click',()=>{
        var canvas = document.querySelector("#canvas");
        var url = canvas.toDataURL('image/png');
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href=url;
        a.download="图片";
        a.target="_blank"
        a.click();
    })
}