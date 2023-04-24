/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// the following 2 values must be the same as given in the css
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy2.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266; // the width of a single frame in pixels
    this.spriteHeight = 188;
    this.height = this.spriteHeight / 2.5;
    this.width = this.spriteWidth / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    // there's a proper way to time animation frames using request animation frame and delta time, but in this tutorial we'll slow down our animation in the simplest way possible.
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    // this.angle = Math.random() * 4;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed;
    this.y += Math.sin(this.angle) * this.curve;
    this.angle += this.angleSpeed;
    // this.y += this.speed;
    // this.x += Math.random() * 5 - 2.5;
    // this.y += Math.random() * 5 - 2.5;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    // ctx.fillRect(this.x, this.y, this.width, this.height); // for black rectangles
    // ctx.strokeRect(this.x, this.y, this.width, this.height); // for just rectahgles frames
    ctx.drawImage(
      this.image, // the image to draw
      this.frame * this.spriteWidth, // the start x position to crop out from the original image: 0 for the first frame
      0, // the start y position to crop out from the original image
      this.spriteWidth, // the end x position to crop out from the original image
      this.spriteHeight, // the end y position to crop out from the original image
      this.x, // the start x position (top left) to putt the image in the canvas
      this.y,
      this.width,
      this.height
    ); // this pushes the entire image 96 frames) into the image frame
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
