const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); // built-in JS method, returns an object providing  information of the size and position of an element, relative to the viewport. We'll use it to offset the rectangles position on mouse click
// console.log(canvasPosition);

class Explosion {
  constructor(x, y) {
    // this.x = x;
    // this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // this.width = spriteWidth / 2;
    // this.height = spriteHeight / 2;
    // multiplication operation is faster than division CPU wise
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    // offset the x and y by a half of the image size to draw the explosion with the centre in the point of click. We can do the offsetting either here or in the draw method. We cannot do it in the addEventListener because at that point we don't have the image size, x, and y
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src = "boom.png";
    this.frame = 0;
    this.timer = 0; // to slow the animation and ensure that all frames of the image are drawn (the initial is not drawn at normal speed because the increment happens before???)
  }
  update() {
    this.timer++;
    if (this.timer % 10 === 0) {
      // this makes it 10 times slower: the code runs every 10 frames
      this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
window.addEventListener("click", function (e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  // practicing: draw white rectangles in the point of click
  // ctx.fillStyle = "white";
  // // ctx.fillRect(e.x, e.y, 50, 50); // this will result in rectangles being drawn, but not exactly under the mouse: it will be drawn much below. That's because the canvas is positioned in the middle of the page rather than at its top, so we need to offset the canvas position.
  // ctx.fillRect(
  //   positionX - 25, // 25 is the half of the width of 50 below: to draw the rectangle with the point of click being in its centre
  //   positionY - 25,
  //   50,
  //   50
  // );
  explosions.push(new Explosion(positionX, positionY));
});

// animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    // every explosion stays in the explosions array. We want to clear it. We will remove the explosion from the array once all its stages have been drawn.
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--; // because we've just removed the i'th explosion from the array we need to adjust the i by decrementing it by 1
    }
  }
  requestAnimationFrame(animate);
}
animate();

// 2:43:25
