import { fire, clearboard, randpos } from './board'

var canvas = document.getElementById('wave');
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;

var binW = 45;
var recW = (binW/1000)*cw;
var recW2 = 3*binW;
var recW3 = 5*binW;



export function position(x){
		return 5 + (x/1005)*cw;
}

export function draw(x){
		let posx = position(x)
		ctx.beginPath();
		ctx.fillStyle = "#d3961f";
		ctx.fillRect(posx-recW3/2, 0, recW3, 150);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "#a4cea3";
		ctx.fillRect(posx-recW2/2, 0, recW2, 150);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "#dd5d3e";
		ctx.fillRect(posx-recW/2, 0, recW, 150);
		ctx.stroke();

}

export function drawguess(){
		clearboard()
		draw(randpos)

		var guess = document.getElementById("guesser").value
		ctx.beginPath();
		ctx.fillStyle = "#d42838";
		ctx.fillRect(position(guess)-2, 0, 4, 150);
		ctx.stroke();

		score(randpos, guess)


}

var points = 0

export function score(randpos, guess){
		if (between(guess, randpos - binW/2, randpos + binW/2)){
				document.getElementById("score").innerHTML = '<div class="score">4 points!!!</div>';
				points = 4;
		} else if (between(guess, randpos - 3*binW/2, randpos + 3*binW/2)){
				document.getElementById("score").innerHTML = '<div class="score">3 points!!</div>';
				points = 3;
		} else if (between(guess, randpos - 5*binW/2, randpos + 5*binW/2)){
				document.getElementById("score").innerHTML = '<div class="score">2 points!</div>';
				points = 2;
		} else {
				document.getElementById("score").innerHTML = '<div class="score">0 points</div>';
				points = 0;
		}
}


export function between(x, min, max) {
		return x >= min && x <= max;
}

// temporarily expose functions to window

window.button_peak = function button_peak(){
		if (window.confirm("Are you sure you want to peak?")) {
				draw(randpos);
		}
}


window.button_guess = function button_guess(){
		if (window.confirm("Is this your final guess?")) {
				drawguess();
		}
}

window.update_seed = function update_seed(){
		$("#seed").val(Math.floor(Math.random() * 1000));
		fire();
}

window.clearboard = clearboard;



