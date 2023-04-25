/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// the following 2 values must be the same as given in the css
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 1;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy4.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213; // the width of a single frame in pixels
    this.spriteHeight = 212;
    this.height = this.spriteHeight / 2.5;
    this.width = this.spriteWidth / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);
    // there's a proper way to time animation frames using request animation frame and delta time, but in this tutorial we'll slow down our animation in the simplest way possible.
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    // this.interval = Math.floor(Math.random() * 200 + 50);
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 0.5 + 0.5;
    this.onMouseMove = (event) => {
      this.newX = event.clientX;
      this.newY = event.clientY;
    };
  }
  update() {
    document.addEventListener("mousemove", this.onMouseMove);
    // console.log(this.newX, this.newY);

    // moves with the cursor and circles around the cursor once it stops
    // this.x =
    //   50 * Math.sin((this.angle * Math.PI) / 90) +
    //   this.newX -
    //   (this.width * 5) / 4;
    // this.y =
    //   50 * Math.cos((this.angle * Math.PI) / 90) + this.newY - this.height / 3;
    // this.angle += this.angleSpeed;

    // this doesn't work. Something's wrong with the if condition
    // if (
    //   Math.abs(this.x - this.newX) < this.width / 4 &&
    //   Math.abs(this.y - this.newY) < this.height / 4
    // ) {
    //   this.x =
    //     50 * Math.sin((this.angle * Math.PI) / 90) +
    //     this.newX -
    //     (this.width * 5) / 4;
    //   this.y =
    //     50 * Math.cos((this.angle * Math.PI) / 90) +
    //     this.newY -
    //     this.height / 3;
    //   this.angle += this.angleSpeed;
    // } else {

    // this part works by itself, the figure chases the cursor slowly but then jangs nearby to the right, it doesn't align by its x position
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / this.speed / 70;
    this.y -= dy / this.speed / 70;
    // }

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
