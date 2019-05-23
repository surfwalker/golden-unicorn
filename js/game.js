var svgns = 'http://www.w3.org/2000/svg';
var svgxlink = 'http://www.w3.org/1999/xlink';
var sliceEnds = [];
var numSlices = 12; // How many slices do we want
var spins = 7;
var slicesContainer = document.getElementById('slicesContainer');
var sliceSize = 300 / numSlices;
var markerDiv = document.getElementById('markerDiv');
var wrapperEl = document.getElementById('wrapper');
var spinsRemaining = document.getElementById('spins');
var leaderboard = document.getElementById('leaderboard');
var imageSlideInUnicorn = document.getElementById('imageSlideInUnicorn');
var imageSlideInCat = document.getElementById('imageSlideInCat');
var leaderboardMessage = document.getElementById('leaderboardMessage');
var roulette = document.getElementById('roulette');
var score = document.getElementById('score');
var unicornImageUrl = 'https://raw.githubusercontent.com/surfwalker/golden-unicorn/master/img/Unicorn-512.png';
var catImageUrl = 'https://raw.githubusercontent.com/surfwalker/golden-unicorn/master/img/Kitten-512.png';
var goldenUnicornImageUrl = 'https://raw.githubusercontent.com/surfwalker/golden-unicorn/master/img/Unicorn-Gold-512.png';
var points = 0;
var heartProgress = document.getElementById('heartProgress');
var renderedScoreYet = false;

// Get the wheel disc that we are rotating
// We start at angle 0, and every 10ms add 2 degrees
var disc = document.getElementById('wheelDisc');
var discAngle = 0;
var updateMs = 10;
var rotationSpeed = 0;
var slowDownFactor = .985;

// Button for event listener
var spinButton = document.getElementById('spinButton');

function SliceEnd(num) {
  this.id = 'sliceEnd_' + num;
  this.isCat = false;
  this.isGolden = false;
  this.isUnicorn = true;
  this.cashValue = 100;

  // eslint-disable-next-line no-trailing-spaces
  // Every time you continue from where you left off, 
  // so the first one would be 0 - (300/numslices)
  // second one would be (1*300/numslices) - (2*300/numslices)
  // second one would be (2*300/numslices) - (3*300/numslices)
  this.offset = num * sliceSize;

  // Store the svg object in case we want to use it later
  var svgForSlice = this.createSvgSlice(num);

  this.turnIntoCat = function(doAnimation) {
    var iconId = this.id + '_icon';
    var iconEl = document.getElementById(iconId);
    if (!this.isCat) {
      this.isCat = true;
      this.isUnicorn = false;
      this.cashValue = 0;

      if (doAnimation) {
        // Do a pow animation where the image is right now
        var iconRect = iconEl.getBoundingClientRect();
        var wrapperRect = wrapperEl.getBoundingClientRect();
        doPow(
          iconRect.left - wrapperRect.left + 25, 
          iconRect.top - wrapperRect.top + 25
        );

        // When the pow is biggest, change the image
        setTimeout(function() {
          iconEl.setAttributeNS(svgxlink, 'href', catImageUrl);
        }, 400);
      } else {
        iconEl.setAttributeNS(svgxlink, 'href', catImageUrl);
      }
    }
  };

  this.turnIntoGoldenUnicorn = function() {
    var iconId = this.id + '_icon';
    var iconEl = document.getElementById(iconId);
    this.cashValue = 400;
    this.isGolden = true;
    this.isUnicorn = false;
    iconEl.setAttributeNS(svgxlink, 'href', goldenUnicornImageUrl);
  };

  this.turnIntoUnicorn = function(doAnimation) {
    var iconId = this.id + '_icon';
    var iconEl = document.getElementById(iconId);
    if (!this.isUnicorn) {
      this.isUnicorn = true;
      this.isCat = false;
      this.cashValue = 100;

      if (doAnimation) {
        // Do a pow animation where the image is right now
        var iconRect = iconEl.getBoundingClientRect();
        var wrapperRect = wrapperEl.getBoundingClientRect();
        doPow(iconRect.left - wrapperRect.left, iconRect.top - wrapperRect.top);

        // When the pow is biggest, change the image
        setTimeout(function() {
          iconEl.setAttributeNS(svgxlink, 'href', unicornImageUrl);
        }, 400);
      } else {
        iconEl.setAttributeNS(svgxlink, 'href', unicornImageUrl);
      }
    }
  };


  // Add the svg element to the DOM
  slicesContainer.appendChild(svgForSlice);
}


SliceEnd.prototype.createSvgSlice = function(num) {
  var g = document.createElementNS(svgns, 'g');

  // Create the slice 'graphics' as a path
  var sliceEnd = document.createElementNS(svgns, 'path');
  sliceEnd.setAttribute('id', this.id);
  sliceEnd.setAttribute('class', 'sliceEnd');

  // First line to
  var radius = 230;
  var x1 = 250 + radius * Math.cos(Math.PI * (-90 + this.offset) / 150);
  var y1 = 250 + radius * Math.sin(Math.PI * (-90 + this.offset) / 150);
  // Then arc to
  var x2 = 250 + radius * Math.cos(Math.PI * (-90 + sliceSize + this.offset) / 150);
  var y2 = 250 + radius * Math.sin(Math.PI * (-90 + sliceSize + this.offset) / 150);

  sliceEnd.setAttribute(
    'd',
    'M 250 250 ' + // M = set current position 250,250, (center)
      'L ' + x1 + ' ' + y1 + ' ' + // L = line to, x1 y1, probably left side of slice
      'A ' + radius + ' ' + radius + ' 0 0 1 ' + x2 + ' ' + y2 + // A = Arc to (outer part of the circle)
      '  Z'); // Z = auto close shape and fill it

  // The middle between the two sides of the arcs
  var xAvgPt1Pt2 = ((x1 + x2) / 2);
  var yAvgPt1Pt2 = ((y1 + y2) / 2);

  // "Average" the current location with the center to bring it
  // closer to the center
  var xIcon = xAvgPt1Pt2 * 0.85 + 250 * 0.15;
  var yIcon = yAvgPt1Pt2 * 0.85 + 250 * 0.15;

  // We have numSlices slices of 360 degrees, and this is
  // icon number num (out of the numSlices)
  var iconAngle = ((360 / numSlices) * num);

  // Create the slice icon
  var sliceIcon = document.createElementNS(svgns, 'image');
  sliceIcon.setAttributeNS(svgxlink, 'href', unicornImageUrl);
  sliceIcon.setAttribute('id', this.id + '_icon');
  sliceIcon.setAttribute('class', 'sliceIcon');
  sliceIcon.setAttribute('width', '50');
  sliceIcon.setAttribute('height', '50');
  sliceIcon.setAttribute('x', xIcon - 25);
  sliceIcon.setAttribute('y', yIcon - 25);
  sliceIcon.setAttribute(
    'transform',
    'rotate(' + iconAngle + ' ' + xIcon + ' ' + yIcon + ')'
  );

  // The frequency is the rate at which the color hue changes
  var frequency = .4;
  var red = Math.sin(frequency * num + 0) * 127 + 128;
  var green = Math.sin(frequency * num + 2) * 127 + 128;
  var blue = Math.sin(frequency * num + 4) * 127 + 128;
  sliceEnd.setAttribute('fill', 'rgb('+red+','+green+','+blue+')');

  var referencePoint = document.createElementNS(svgns, 'rect');
  referencePoint.setAttribute('id', this.id + '_ref');
  referencePoint.setAttribute('class', 'sliceRefPoint');
  referencePoint.setAttribute('width', '1');
  referencePoint.setAttribute('height', '1');
  referencePoint.setAttribute('x', xAvgPt1Pt2);
  referencePoint.setAttribute('y', yAvgPt1Pt2);

  g.appendChild(sliceEnd);
  g.appendChild(sliceIcon);
  g.appendChild(referencePoint);
  this.sliceIcon = sliceIcon;
  this.slicePath = sliceEnd;
  this.referencePoint = referencePoint;
  return g;
};

function onTimerTick() {
  discAngle += rotationSpeed;
  rotationSpeed *= slowDownFactor;
  disc.setAttribute('transform', 'rotate(' + discAngle + ' 250 250)');

  // this is to verify our idea of selecting the right thing works
  // rightmost = getRightmostSlice();
  // for (var i = 0; i < numSlices; i++) {
  //   sliceEnds[i].slicePath.setAttribute("fill", "white");
  // }
  // rightmost.slicePath.setAttribute("fill", "blue");

  if (rotationSpeed > 0 && rotationSpeed < 0.01) {
    rotationSpeed = 0;
    var winnerSlice = getRightmostSlice();
    sliceLandedOn(winnerSlice);
  }

  if (!renderedScoreYet && heartProgress.ldBar !== null){
    setTimeout(renderScoreSpins, 500);
    renderedScoreYet = true;
  }
}

function handleSpinButton(event){
// Set the timer that will update every X ms
  // event.preventDefault();
  spinButton.disabled = true;
  spins--;
  renderScoreSpins();
  rotationSpeed = getRandomIntInclusive(50, 150);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRightmostSlice() {
  var closestSlice = null;
  var closestDistance = 999999;
  var markerRect = markerDiv.getBoundingClientRect();
  for (var i = 0; i < numSlices; i++) {
    // Get the x,y of the reference point of the next shape
    var rect = sliceEnds[i].referencePoint.getClientRects()[0];
    var distance = Math.sqrt(
      ((rect.x - markerRect.x) * (rect.x - markerRect.x)) +
      ((rect.y - markerRect.y) * (rect.y - markerRect.y))
    );

    // If that distance between that reference point and the marker is smaller
    // than all the distances we've had so far
    if (distance < closestDistance) {
      // Replace the smallest so far with this one
      closestSlice = sliceEnds[i];
      closestDistance = distance;
    }
  }
  return closestSlice;
}

function sliceLandedOn(closestSlice){
  if (closestSlice.isCat){
    var unicornArray = formUnicornArray();
    if (unicornArray.length > 0) {
      var unicornToChange = unicornArray[Math.floor(Math.random()*unicornArray.length)];
      unicornToChange.turnIntoCat(true);
      unicornArray = [];
      points -=200;
    }
  } else if (closestSlice.isGolden){
    var catArray = formCatArray();
    var catToChange = catArray[Math.floor(Math.random()*catArray.length)];
    catToChange.turnIntoUnicorn(true);
    catArray = [];
    points += 500;
  } else if (closestSlice.isUnicorn){
    var catArray = formCatArray();
    var catToChange = catArray[Math.floor(Math.random()*catArray.length)];
    catToChange.turnIntoUnicorn(true);
    catArray = [];
    points += 200;
  }
  if (spins > 0){
    spinButton.disabled = false;
  } else {
    spinButton.disabled = true;
    // INSERT LEADERBOARD DROP DOWN IF's
    bringDownLeaderboardCat();
  }
  renderScoreSpins();
}

function formUnicornArray(){
  var unicornArray = [];
  for (var i = 0; i < numSlices; i++){
    if (sliceEnds[i].isUnicorn){
      unicornArray.push(sliceEnds[i]);
    }
  }
  return unicornArray;
}

function formCatArray(){
  var catArray = [];
  for (var i = 0; i < numSlices; i++){
    if (sliceEnds[i].isCat){
      catArray.push(sliceEnds[i]);
    }
  }
  return catArray;
}


// Does a POW animation at the specified location
function doPow(x, y) {
  // In the CSS our animation duration is 200ms
  // so, when we "setTimeout" we take that into account
  var bigSizeW = 363 / 2;
  var bigSizeH = 345 / 2;
  var smallSizeW = 40;
  var smallSizeH = smallSizeW * (bigSizeH/bigSizeW);

  var img = document.createElement('img');
  img.setAttribute('src', 'img/poof2.png');
  img.classList.add('pow');
  img.style.width = smallSizeW + 'px';
  img.style.height = smallSizeH + 'px';
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  wrapperEl.appendChild(img);

  // Start growing animation after 200ms
  setTimeout(function() {
    img.style.width = bigSizeW + 'px';
    img.style.height = bigSizeH + 'px';

    // Adjust ourselves so we would be centered
    // So we wouldn't grow only to our bottom right
    img.style.left = (x - ((bigSizeW - smallSizeW) / 2)) + 'px';
    img.style.top = (y - ((bigSizeH - smallSizeH) / 2)) + 'px';

    // Start fading after the growing animation is over
    setTimeout(function() {
      img.style.opacity = '0';

      // Remove the element after the animation is over
      setTimeout(function() {
        img.remove();
      }, 200);

    }, 600);

  }, 200);
}

function updateScoreOnHeart() {
  var maxScore = 1000;
  var percent = (points + 500) * 100 / maxScore;
  if (percent > 100) {
    percent = 100;
  }

  if (percent < 0) {
    percent = 0;
  }

  if (heartProgress.ldBar != null) {
    heartProgress.ldBar.set(percent);
  }

  if (percent === 100) {
    spinButton.disabled = true;
    bringDownLeaderboardUnicorn();
  }

  if (percent === 0) {
    spinButton.disabled = true;
    bringDownLeaderboardCat();
  }
}

function renderScoreSpins(){
  score.innerHTML = 'Total Score: ' + points;
  spinsRemaining.innerHTML = 'Spins Remaining: ' + spins;
  updateScoreOnHeart();
}

function bringDownLeaderboardUnicorn(){
  leaderboard.style.top = '95px';
  leaderboardMessage.innerHTML = 'You have defeated the evil laser kitteh!!!';
  imageSlideInUnicorn.style.top = '295px';
  roulette.style.opacity = '0.4';
}

function bringDownLeaderboardCat(){
  leaderboard.style.top = '95px';
  leaderboardMessage.innerHTML = 'The evil laser kitteh has prevailed!';
  imageSlideInCat.style.top = '295px';
  roulette.style.opacity = '0.4';
}


// Create the slices
for (var i = 0; i < numSlices; i++) {
  sliceEnds[i] = new SliceEnd(i);
}

for (var i = 1; i < numSlices; i += 2) {
  sliceEnds[i].turnIntoCat(false);
}

sliceEnds[0].turnIntoGoldenUnicorn();


// Event listener for clicking the spin button
spinButton.addEventListener('click', handleSpinButton);
setInterval(onTimerTick, updateMs);

renderScoreSpins();

