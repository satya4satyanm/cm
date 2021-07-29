var cdropsnd = new Audio("coin-drop.wav");
cdropsnd.volume = 0.02;
var sdropsnd = new Audio("striker-drop.wav");
sdropsnd.volume = 0.02;
var playTick = function () {
	var aud = new Audio();
	aud.src = "tick.wav";
	aud.volume = 0.02;
	aud.play();
}



function player(x, y, rightBound, leftBound) {
	this.x = x;
	this.y = y;
	this.lb = leftBound;
	this.rb = rightBound;
	this.score = 0;
}
function updateScore() {
	var score = document.getElementById(currPlayer);
	score.innerHTML = players[currPlayer].score;
}
function dist(x1, y1, x2, y2) {
	var dis = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
	dis = Math.sqrt(dis);
	return dis;
}
function allCoinStop() {
	for (var i = 0; i < coins.length; i++) {
		if (Math.abs(coins[i].vx) != 0 && Math.abs(coins[i].vy) != 0)
			return false;
	}
	return true;
}
function coinPot(coin) {
	var potLeftUp = dist(coin.x, coin.y, 25, 25);
	var potRightUp = dist(coin.x, coin.y, 25, 495);
	var potLeftDown = dist(coin.x, coin.y, 495, 25);
	var potRightDown = dist(coin.x, coin.y, 495, 495);
	var rad = 20;
	if (potLeftUp < rad || potLeftDown < rad || potRightUp < rad || potRightDown < rad)
		return true;
	else
		return false;
}
function coin(x, y, color, vx, vy, name, radius) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.name = name || 'coin';
	this.color = color;
	this.radius = radius ? radius : coinSize;
	this.rebound = function () {
		if ((this.x + coinSize + this.vx > 500) || (this.x - coinSize + this.vx < 20)) {
			if (this.vx > 0.3) playTick();
			this.vx = -this.vx;
		}
		if ((this.y + this.vy + coinSize > 500) || (this.y - coinSize + this.vy < 20)) {
			if (this.vx > 0.3) playTick();
			this.vy = -this.vy;
		}
	}
	this.update = function () {
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= 0.97;
		this.vy *= 0.97;
	}
	this.crash = function (i, j) {
		var dis = dist(this.x + this.vx, this.y + this.vy, coins[i].x + coins[i].vx, coins[i].y + coins[i].vy);
		//https://stackoverflow.com/questions/12952752/javascript-collision-detection-between-drawable-circles

		if (dis <= 20) {
			if (this.vx > 0.3 || this.vy > 0.3 || coins[i].vx > 0.3 || coins[i].vy > 0.3 && dis >= 19.95) {
				playTick();
			}
			var dx = coins[j].x + coins[j].vx - coins[i].x + coins[i].vx;
			var dy = coins[j].y + coins[j].vy - coins[i].y + coins[i].vy;
			var collisionAngle = Math.atan2(dy, dx);

			var speed1 = Math.sqrt(coins[i].vx * coins[i].vx + coins[i].vy * coins[i].vy);
			var speed2 = Math.sqrt(coins[j].vx * coins[j].vx + coins[j].vy * coins[j].vy);

			var direction1 = Math.atan2(coins[i].vy, coins[i].vx);
			var direction2 = Math.atan2(coins[j].vy, coins[j].vx);

			var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
			var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
			var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
			var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);

			var final_velocityx_1 = velocityx_2;
			var final_velocityx_2 = velocityx_1;
			var final_velocityy_1 = velocityy_1;
			var final_velocityy_2 = velocityy_2;

			ball1_velocityx = Math.cos(collisionAngle) * final_velocityx_1 +
				Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_1;
			ball1_velocityy = Math.sin(collisionAngle) * final_velocityx_1 +
				Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_1;
			ball2_velocityx = Math.cos(collisionAngle) * final_velocityx_2 +
				Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_2;
			ball2_velocityy = Math.sin(collisionAngle) * final_velocityx_2 +
				Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_2;

			coins[i].vx = ball1_velocityx;
			coins[i].vy = ball1_velocityy;
			coins[j].vx = ball2_velocityx;
			coins[j].vy = ball2_velocityy;
			return;
		}
	}


}