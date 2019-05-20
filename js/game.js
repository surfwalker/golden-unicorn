var svgns = "http://www.w3.org/2000/svg";
var sliceEnds = [];
var numSlices = 9; // How many slices do we want
var slicesContainer = document.getElementById("slicesContainer");
var roulette = document.getElementById("roulette");
var sliceSize = 300 / numSlices;

// Get the wheel disc that we are rotating
// We start at angle 0, and every 10ms add 2 degrees
var disc = document.getElementById("wheelDisc");
var discAngle = 0;
var updateMs = 10;
var rotationSpeed = 1;
var slowDownFactor = 1;

function SliceEnd(num) {
  this.id = "sliceEnd_" + num;
  
  // eslint-disable-next-line no-trailing-spaces
  // Every time you continue from where you left off, 
  // so the first one would be 0 - (300/numslices)
  // second one would be (1*300/numslices) - (2*300/numslices)
  // second one would be (2*300/numslices) - (3*300/numslices)
  this.offset = num * sliceSize;

  // Store the svg object in case we want to use it later
  this.object = this.createSvgSlice(num);

  // Add the svg element to the DOM
  slicesContainer.appendChild(this.object);
}

SliceEnd.prototype.createSvgSlice = function(num) {
  var g = document.createElementNS(svgns, "g");

  // Create the slice "graphics" as a path
  var sliceEnd = document.createElementNS(svgns, "path");
  sliceEnd.setAttribute("id", this.id);
  sliceEnd.setAttribute("class", "sliceEnd");
  
  // First line to
  var x1 = 250 + 230 * Math.cos(Math.PI * (-90 + this.offset) / 150);
  var y1 = 250 + 230 * Math.sin(Math.PI * (-90 + this.offset) / 150);
  // Then arc to
  var x2 = 250 + 230 * Math.cos(Math.PI * (-90 + sliceSize + this.offset) / 150);
  var y2 = 250 + 230 * Math.sin(Math.PI * (-90 + sliceSize + this.offset) / 150);
  sliceEnd.setAttribute(
      "d", 
      "M 250 250 " + // M = set current position 250,250, (center)
      "L " + x1 + " " + y1 + " " + // L = line to, x1 y1, probably left side of slice
      "A 230 230 0 0 1 " + x2 + " " + y2 + // A = Arc to (outer part of the circle)
      "  Z"); // Z = auto close shape and fill it

  // // For the first slice only, make it green
  // if (num == 0) {
  //   sliceEnd.setAttribute("fill", "rgb(0,204,0)");
  // // Otherwise if it's even then red
  // } else if (num % 2 == 0) {
  //   sliceEnd.setAttribute("fill", "rgb(204,0,0)");
  // // Otherwise it's black
  // } else {
  //   sliceEnd.setAttribute("fill", "rgb(0,0,0)");
  // }

  // The frequency is the rate at which the color hue changes
  var frequency = .4;
  var red = Math.sin(frequency * num + 0) * 127 + 128;
  var green = Math.sin(frequency * num + 2) * 127 + 128;
  var blue = Math.sin(frequency * num + 4) * 127 + 128;
  sliceEnd.setAttribute("fill", "rgb("+red+","+green+","+blue+")");
 
  g.appendChild(sliceEnd);
  return g;
}

function onTimerTick() {
  discAngle += rotationSpeed;
  rotationSpeed *= slowDownFactor;
  disc.setAttribute("transform", "rotate(" + discAngle + " 250 250)");
}

// Create the slices
for (var i = 0; i < numSlices; i++) {
  sliceEnds[i] = new SliceEnd(i);
}

// Set the timer that will update every X ms
setInterval(onTimerTick, updateMs);
