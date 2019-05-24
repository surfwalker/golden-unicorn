'use strict';

// grabbing playerForm DOM element in index.html
var playerForm = document.getElementById('playerform');
allPlayers = JSON.parse(localStorage.getItem('playersStorage')) || [];

if (allPlayers.length > 0) {
  loadFromLocalStorage(allPlayers, allPlayers.length);
}

function handleNewPlayerSubmit(event) {

  // prevents page reload on a 'submit' event
  event.preventDefault();

  // Validation to prevent empty form fields
  if (!event.target.playername.value) {
    return alert('Field cannot be empty!');
  }

  // store name entered by used in variable playerName
  var playerName = event.target.playername.value;
  console.log('Player name is: ' + playerName);

  // create new Player from form input
  new Player(playerName);

  saveToLocalStorage(allPlayers);
  // This empties the form fields after the data has been grabbed
  event.target.playername.value = null;
}

///////////////////////////////////////////////////////////////////
///////////// THE MAGICAL CONVERSATION. EVER. EPIC ////////////////
//////////////////////////////////////////////////////////////////!

var bubbleOffsetXEnd = 180;
var bubbleOffsetXStart = 80;
var catBubble = document.getElementById('catTextBubble');
var unicornBubble = document.getElementById('unicornTextBubble');

function catSays(text, duration, onfinish) {
  showBubble(text, catBubble, -1, duration, onfinish);
}

function unicornSays(text, duration, onfinish) {
  showBubble(text, unicornBubble, 1, duration, onfinish);
}

function showBubble(text, bubble, direction, duration, onfinish) {
  // Set text and start animation to make it look like they're talking
  bubble.children[0].innerHTML = text;
  bubble.style.opacity = 1;
  bubble.style.left = (bubbleOffsetXEnd * direction)+"px";
  
  // After the duratrion make the box invisiable
  setTimeout(function() {
    bubble.style.opacity = 0;

    // After the box is invisible slide it back to the original location
    setTimeout(function() {
      bubble.children[0].innerHTML = "";
      bubble.style.left = (bubbleOffsetXStart * direction)+"px";
      setTimeout(onfinish, 1000);
    }, 500)
  }, duration)
}

var catText1 = ['Surrender to me, my<br> ancient foe! The Triphid<br> Nebula will be MINE!', 4000];
var catText2 = ['Stars die! The reign of <br>Laser-Kitteh will be forever!', 4000];
var catText3 = ['I am shadow and <br>darkness! Nothing can<br> destroy the darkness<br> of space!', 4000];

var unicornText1 = ['It has been written <br>in the stars since the<br>time before time<br> began: Your defeat<br> is imminent.', 4000];
var unicornText2 = ['Stars are reborn even<br> brighter than before. <br>You, on the other hand, <br>will fade into nothing.', 4000];
var unicornText3 = ['Nothing, perhaps, <br>except light.', 4000];


function doScript() {
  catSays(catText1[0], catText1[1], function() {
    unicornSays(unicornText1[0], unicornText1[1], function() {
      catSays(catText2[0], catText2[1], function() {
        unicornSays(unicornText2[0], unicornText2[1], function() {
          catSays(catText3[0], catText3[1], function() {
            unicornSays(unicornText3[0], unicornText3[1], function() {
            });
          });
        });
      });
    });
  });
}

setTimeout(doScript, 2000);

playerForm.addEventListener('submit', handleNewPlayerSubmit);
