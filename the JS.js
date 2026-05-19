
console.log('Hello, World!');

// Variables
const name = 'User';
let myNum = 1;
var message = 'Welcome';

// Function
function greet(userName) {
    return `Hello, ${userName}!`;
}


// Event listener example
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
});



var myBool = true;

if (myBool) {
    console.log('This is true');
}



// let rafId = null;
// function loop() {
//     rafId = requestAnimationFrame(loop);
//     console.log('Looping...');
// }
// //loop();





// //canvas doodles
// function draw(x, y) {
// var c = document.getElementById("particle-canvas");
// var ctx = c.getContext("2d");

// ctx.strokeStyle = "aqua"; //order matters for this one. Keep it before stroke().
// ctx.moveTo(100, 0);
// ctx.lineTo(x, y);
// ctx.stroke();
// //ctx.moveTo(0, 400);

// }

// draw(2000, 500)

//===============================================

const canvas = document.getElementById("heroCanvas");
const ctx    = canvas.getContext("2d");

// Brand colors for the particles. We pull them from the CSS variables
// where possible, but it's simpler here to just hard-code the palette.
const PARTICLE_COLORS = ["#384C65", "#485F88", "#9DACCC", "#C0C9DB"];

// Will hold all particle objects.
let particles = [];

// Resize the canvas to match its CSS size, accounting for high-DPI
// ("retina") screens so it looks crisp instead of blurry.
function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    canvas.width  = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr+0.1, 0, 0, dpr, 0, 0); // scale all drawing by dpr
    console.log(`dpr is: ${dpr}!`); //Template literal for console log.
}

// Create the particles. Each particle is a plain object with its own
// position, size, speed, and color.
function createParticles() {
    const rect = canvas.parentElement.getBoundingClientRect();
    // const rect = {
    // x: 0,
    // y: 0,
    // width: 400,
    // height: 200
    // };
    // Density scales with area so phones don't get crowded.
    const count = Math.floor((rect.width * rect.height) / 5000);
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
        x:      Math.random() * rect.width,
        y:      Math.random() * rect.height,
        r:      Math.random() * 3 + 1,                       // radius 1–4 px
        vx:     (Math.random() - 0.5) * 0.3,                 // sideways drift
        vy:     -(Math.random() * 0.4 + 0.15),               // upward drift
        alpha:  Math.random() * 0.5 + 0.1,                   // transparency
        color:  PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        });
    }
}

// Draw one frame.
function draw() {
    const rect = canvas.parentElement.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    for (const p of particles) {
    // Move
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around: when a particle floats off the top, restart at bottom.
    if (p.y < -10) { p.y = rect.height + 10; p.x = Math.random() * rect.width; }
    if (p.x < -10) p.x = rect.width + 10;
    if (p.x > rect.width + 10) p.x = -10;

    // Draw a soft circle.
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    }
  ctx.globalAlpha = 1; // reset
}

// The animation loop. requestAnimationFrame asks the browser to call
// us back right before it paints the next frame (~60 fps).
let rafId = null;
function loop() {
    draw();
    rafId = requestAnimationFrame(loop);
}

// Honor "reduce motion".
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function startBackground() {
    resizeCanvas();
    createParticles();
//   if (prefersReducedMotion) {
//     draw();           // one static frame, no animation
//   } else {
//     loop();
//   }
loop();
}

// Restart sizing when the window resizes (e.g., rotating a phone).
window.addEventListener("resize", () => {
    if (rafId) cancelAnimationFrame(rafId);
    startBackground();
});

startBackground();
