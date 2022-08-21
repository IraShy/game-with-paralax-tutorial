// The normal way to set up canvas projects
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // create an instance of built-in canvas 2d API object that contains all properties and methods we'll need
// if we don't set canvas width and height, it will default to 300x150 px
const CANVAS_WIDTH = (canvas.width = 800); // set it to the value we set up in css
const CANVAS_HEIGHT = (canvas.height = 700);
// -----------------------------

// I want the scroll speed to be dynamic, tied to a variable so in our game we can speed up or slow down using the special moves
let gameSpeed = 10;

const backgroundLayer1 = new Image(); // same functionality as document.createElement('img')
// we can use .appendChild() and it will add <img> into our html file. We can also choose not to append it and it will stay hidden, and it will just store the image for us
backgroundLayer1.src = "backgroundLayers/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "backgroundLayers/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "backgroundLayers/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "backgroundLayers/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "backgroundLayers/layer-5.png";

// create animation loop
// function animate() {
//   ctx.drawImage(backgroundLayer4, 0, 0); // draw background from the top left corner of canvas
//   requestAnimationFrame(animate); // pass in the name of the animate function itself so that it runs over and over again in a loop
// }
// animate();

// let x = 0;

// function animate() {
//   // pass in x instead of hard-coded 0 and decrease it so the image moves horizontally
//   // clear the old "piant", otherwise the image smudges
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   ctx.drawImage(backgroundLayer4, x, 0);
//   // x--; // image moves to the left by 1 pixel per frame
//   x -= gameSpeed; // image moves faster
//   requestAnimationFrame(animate);
// }
// animate();
// -------
// let x = 0;

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   ctx.drawImage(backgroundLayer4, x, 0);
//   // image is finite; we can repeat it when it runs to its end: set x back to 0 when we reach the end of the image (2400 is the image width)
//   if (x < -2400) x = 0;
//   else x -= gameSpeed;
//   requestAnimationFrame(animate);
// }
// animate();

// ------
// let x = 0;
// // we'll run the same image twice before setting x back to 0 - in order to avoid the black gap
// let x2 = 2400; // adding the second variable and setting it to the width of the image

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   ctx.drawImage(backgroundLayer3, x, 0);
//   ctx.drawImage(backgroundLayer3, x2, 0);
//   // if (x < -2400) x = 2400;
//   // else x -= gameSpeed;
//   // if (x2 < -2400) x2 = 2400;
//   // else x2 -= gameSpeed;
//   // we now have a gap between the images, and part of the gap is equal to the gameSpeed value, and the other part is there if the image width is not divisible by the gameSpeed value
//   if (x < -2400) x = 2400 + x2 - gameSpeed;
//   else x -= gameSpeed;
//   if (x2 < -2400) x2 = 2400 + x - gameSpeed;
//   else x2 -= gameSpeed;
//   requestAnimationFrame(animate);
// }
// animate();

// ------
// clean the code, get rid of the repetitions and use JS classes

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });
  requestAnimationFrame(animate);
}
animate();
