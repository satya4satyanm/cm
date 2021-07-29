function drawCircle(x, y, r, color, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r - 6, 0, 2 * Math.PI, false);
    ctx.stroke();
}

function drawSCircle(x, y, r, color, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r - 9, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r - 3, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#0091ff';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r - 6, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#bb00ff';
    ctx.stroke();
}

function drawDCircle(x, y, r, color, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    // ctx.fillStyle = color;
    // ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
    var grd = ctx.createRadialGradient(x, y, 5, x, y, 10);
grd.addColorStop(0, "red");
grd.addColorStop(1, color);
ctx.fillStyle = grd;
ctx.fill();
}


function drawCircleS(x, y, r, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.stroke();

}
function drawRect(x, y, width, height, color, ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
function drawRectS(x, y, width, height, ctx) {
    ctx.rect(x, y, width, height);
    ctx.stroke();
}
function drawArc(x, y, r, angle_st, angle_end, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, angle_st, angle_end, false);
    ctx.stroke();
}
function drawLine(x1, y1, x2, y2, colorL, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colorL;
    ctx.stroke();
}

function drawLineDark(x1, y1, x2, y2, colorL, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = colorL;
    ctx.stroke();
}
