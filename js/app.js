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

playerForm.addEventListener('submit', handleNewPlayerSubmit);
