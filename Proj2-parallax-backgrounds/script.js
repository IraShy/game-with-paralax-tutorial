// The normal way to set up canvas projects
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // create an instance of built-in canvas 2d API object that contains all properties and methods we'll need
// if we don't set canvas width and height, it will default to 300x150 px
const CANVAS_WIDTH = (canvas.width = 800); // set it to the value we set up in css
const CANVAS_HEIGHT = (canvas.height = 700);
// -----------------------------
