'use strict';

// will hold all the store object instances
var allPlayers = [];

// grabbing playerForm DOM element in index.html
var playerForm = document.getElementById('playerform');

// Player constructor function
function Player(name) {
  this.name = name;
  // hard coding this.points array for testing purposes
  this.points = [100, 200, 300, 400, 500, 600, 700];
  allPlayers.push(this);
}

var saveToLocalStorage = function(arr) {
  var stringifiedPlayers = JSON.stringify(arr);
  localStorage.setItem('playersStorage', stringifiedPlayers);
};

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

playerForm.addEventListener('submit', handleNewPlayerSubmit);
