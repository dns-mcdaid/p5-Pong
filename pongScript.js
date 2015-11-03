// Dennis McDaid
// Drawing on the Web
// Final Project
// Plasma Pong

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     ||  
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
} )();

var listener = new window.keypress.Listener();

var doomed = false;

var collision;
var south;
var conciousness;

var aiPatience;

ball = {
	x: 427,
	y: Math.floor((Math.random() * 480) + 1),
	xspeed: -4,
	yspeed: -4,
	edge: 7.5,
};

var oldY = ball.y;

var userPaddle = 240;
var userSide = 80.5;

var aiSide = 773.5;

var yourWins = 0;
var aiWins = 0;

var aiDirection;

var song = false;



function setup(){
	createCanvas(854, 480);
	frameRate(60);
}

function draw(){
	// Refresh background to ensure that no value is displayed more than once.
	background(000);
	
	if (song == true){
		noStroke();
		risingColors = Math.ceil(aiPatience * .1);
		fill(risingColors,255,risingColors);
		textFont('"Comic Sans MS", cursive, sans-serif');
		textSize(42);
		textStyle(BOLD);
		text("Oh Baby", 355,175);
		text("Here we Go!", 315,275);
		//ball.xspeed = 5;
		//ball.yspeed = 5;
	}

	
	noStroke();
	fill(255,255,255);
	textFont("'Courier New', Courier, monospace");
	textSize(26);
	textStyle(BOLD);
	text("Your Score:",200,50);
	text("Steve's Score:", 475, 50);
	
	textSize(32);
	text(yourWins, 265, 100);
	text(aiWins, 577, 100);
	
	// Create the pong ball, from the center out. 
	ellipseMode(CENTER);
	fill(0,255,0);
	noStroke();
	ellipse(ball.x, ball.y, 12.5, 12.5);

	ballSide = ball.x - ball.edge;
	
	// Set parameters for our rectangles
	stroke(255,255,255);
	strokeWeight(2);
	fill(000);
	
	// Track user's paddle and AI's paddle.
	uBottom = userPaddle + 25;
	uBtmMid = userPaddle + 7.5;
	uTop = userPaddle - 24;
	uTopMid = userPaddle - 7.5;
	
	aiPatience++;
	
	if (aiPatience < 500){
		aiPaddle = ball.y;
	} else if (aiPatience < 750){
		aiPaddle = ball.y - Math.ceil(aiPatience * .01);
	} else if (aiPatience < 1000){
		aiPaddle = ball.y - Math.ceil(aiPatience * .015);
	} else if (aiPatience < 1250){
		aiPaddle = ball.y - Math.ceil(aiPatience * .02);
	} else if (aiPatience < 1500){
		aiPaddle = ball.y - Math.ceil(aiPatience * .01);
	} else if (aiPatience < 1750){
		aiPaddle = ball.y;
	} else if (aiPatience < 2000){
		aiPaddle = ball.y + Math.ceil(aiPatience * .01);
	} else if (aiPatience < 2250){
		aiPaddle = ball.y + Math.ceil(aiPatience * .02);
	} else if (aiPatience < 2500){
		aiPaddle = ball.y + Math.ceil(aiPatience * .015);
	} else {
		aiPatience = 0;
	}
	
	aiBottom = aiPaddle + 25;
	aiTop = aiPaddle - 24;
	
	// Create both the user and the AI's paddles from the center out.
	rectMode(CENTER);
	fill(255,0,0);
	rect(66, userPaddle, 25, 50);
	fill(0,0,255);
	rect(788, aiPaddle, 25, 50);
	
	for (var i = 0; i < 490; i+= 20){
		line(427, i, 427, i + 10);
	}
	
	/**
	// Temporary lines for determining where each paddles boundaries are.
	stroke(255,0,0);
	line(userSide, 0, userSide, 480);
	line(userSide, uTop, 427, uTop);
	line(userSide, uBottom, 427, uBottom);
	line(userSide, uTopMid, 213.5, uTopMid);
	line(userSide, uBtmMid, 213.5, uBtmMid);
	line(userSide, userPaddle, 427, userPaddle);
	
	// And the AI's Paddle
	stroke(0,0,255);
	line(aiSide, 0, aiSide, 480);
	line(427, aiTop, aiSide, aiTop);
	line(427, aiBottom, aiSide, aiBottom);
	*/
	
	// move ball across screen.
	ball.x = ball.x + ball.xspeed;
	ball.y = ball.y + ball.yspeed;
	
	
	if (oldY > ball.y){
		south = true;
	} else {
		south = false;
	}
	
	oldY = ball.y;
	
	if (ball.x > 788 || ball.x < 66){
		doomed = true;
	}
	
	// check to see if paddle has made contact with ball.
	
	
	if (doomed == true){
		
	
	var deathBlip = document.getElementsByTagName("audio")[4];
		if (ball.x <= 0){
			//alert("You lost!");
			aiWins++;
			doomed = false;
			deathBlip.play();
			reset();
		} else if (ball.x >= 854){
			//alert("The Computer Player lost!");
			yourWins++;
			doomed = false;
			deathBlip.play();
			reset();
		}
	} else {
		if (contact(ball.x, ball.y, aiSide, aiTop, aiBottom, 2)){
			var aiBlip = document.getElementsByTagName("audio")[2];
			collision = tactPoint(ball.y, userPaddle);
			direction = response(collision, south);
			ball.yspeed *= direction;
			ball.xspeed *= -1.01;
			aiBlip.play();
		} else if (contact(ball.x, ball.y, userSide, uTop, uBottom, 1)){
			var myBlip = document.getElementsByTagName("audio")[1];
			collision = tactPoint(ball.y, userPaddle);
			direction = response(collision, south);
			ball.yspeed *= direction;
			ball.xspeed *= -1.01;
			myBlip.play();
		}
	}
	
	// check to see if ball has moved past our range.
	if (ball.y >= 480 || ball.y <= 0){
		var wallBlip = document.getElementsByTagName("audio")[3];
		ball.yspeed *= -1.01;
		wallBlip.play();
	}
	
	//aiPaddle = aiPaddle - aiPatience / 10;
	
	if (aiTop <= 5 || aiBottom >= 475){
		aiDirection *= -1;
	}
	
	document.body.style.backgroundColor = "rgb(" + Math.ceil(ball.x * .298) + ","+ Math.ceil(aiPatience * .1) + ","+ Math.ceil(ball.y * .53) +")";
}

function reset(){
	ball.x = 427;
	ball.y = Math.floor((Math.random() * 480) + 1);
	if (song){
		ball.xspeed = -7;
		ball.yspeed = -7;
	} else {
		ball.xspeed = -4;
		ball.yspeed = -4;
	}
}

function contact(ballX, ballY, paddleSide, paddleTop, paddleBottom, paddleNo){
	if (ballY - 2.5 <= paddleBottom && ballY + 2.5 >= paddleTop){
		if (paddleNo == 2 && ballX - 2.5 >= paddleSide){
			return true;
		} else if (paddleNo == 1 && ballX + 3.5 <= paddleSide){
			return true;
		}
	} else {
		return false;
	}
}

function response(location, direction){
	if ((direction == true && location == 1) || (direction == false && location == -1)){
		return 1.09;
	} else if (location == 0){
		return 0.95;
	} else {
		return -1.01;
	}
}

function tactPoint(ballY, locationY){
	if (ballY > locationY - 7.5 && ballY < locationY + 7.5){
		return 0;
	} else if (ballY > locationY - 25 && ballY < locationY - 7.5){
		return 1;
	} else if (ballY < locationY + 24 && ballY > locationY + 7.5){
		return -1;
	}
}



listener.simple_combo("down", function(){
	if (song){
		userPaddle = userPaddle + 35;
	} else {
		userPaddle = userPaddle + 20;
	}
});

listener.simple_combo("up", function(){
	if (song){
		userPaddle = userPaddle - 35;
	} else {
		userPaddle = userPaddle - 20;
	}
});

listener.sequence_combo("up up down down left right left right b a enter", function() {
    var muzak = document.getElementsByTagName("audio")[0];
	muzak.play();
	song = true;
	var img = new Image();
	var div = document.getElementById('sillyness');
	div.appendChild(img);
	img.src = '../brentRambo.gif';
});