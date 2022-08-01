let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
// built-in image class constructor, will create an html element same as if I used <img>, <image>
// We'll use it to store the image spreadsheet so we can animate it with JS.

playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
// let frameX = 0; // used to go over the spritesheet horizontally, with 0 being the leftmost image in a row
// let frameY = 4; // used to go over the spritesheet vertically, with 0 being the top image in a column
let gameFrame = 0;
const staggerFrames = 5; // creatiing this constant to slow down the animation by this amount
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 7,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

// this is an animation loop
function animate() {
  // clear old paint from canvas between every animation frame. We use clearRect built-in method
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // position's job is to cycle through horizontal spritesheets but in a different way
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length; // changes from 0 to length of the location dynamically
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // draw
  // ctx.fillRect(100, 50, 100, 100); // if we don't specify the style, colour will default to black.
  // requestAnimationFrame method will simply run the function that we pass to it. It will run the function once. If we pass in the animate function, it will run it again and again to create an animation loop

  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) // built-in function that can take 3, 5, or 9 arguments to put an existing image on canvas
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  if (gameFrame % staggerFrames == 0) {
    // increases frameX every 5 frames => the animation will slow down 5 times
    if (frameX < 6) frameX++;
    else frameX = 0;
  }

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
