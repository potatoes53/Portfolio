// Basic JavaScript template
console.log('Hello, World!');

// Variables
const name = 'User';
let myNum = 1;
var message = 'Welcome';

// Function
function greet(userName) {
    return `Hello, ${userName}!`;
}

const NumBtn = document.getElementById('myNumBtn');
NumBtn.addEventListener('click', function(){
    return document.getElementById("displayArea").textContent = myNum++;
});



// Event listener example
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
});


//canvas doodles
function draw(x, y) {
var c = document.getElementById("particle-canvas");
var ctx = c.getContext("2d");

ctx.strokeStyle = "aqua"; //order matters for this one. Keep it before stroke().
ctx.moveTo(100, 0);
ctx.lineTo(x, y);
ctx.stroke();
//ctx.moveTo(0, 400);

}

draw(2000, 500)