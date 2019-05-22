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

// Shop.prototype.render = function() {
// 	// make a tr
// 	var trEl = document.createElement('tr');
// 	// create, content, append for "Shop Location"
// 	var tdEl = document.createElement('td');
// 	tdEl.textContent = this.location;
// 	trEl.appendChild(tdEl);
// 	// create, content, append for each hourly total
// 	for (var i = 0; i < hoursOfOperation.length; i++) {
// 		tdEl = document.createElement('td');
// 		tdEl.textContent = this.recordOfSalesPerHour[i];
// 		trEl.appendChild(tdEl);
// 	}
// 	// create, content, append for daily total
// 	tdEl = document.createElement('td');
// 	tdEl.textContent = this.totalCookiesPerDay(this.recordOfSalesPerHour);
// 	trEl.appendChild(tdEl);
// 	// append the tr to the table
// 	salesTable.appendChild(trEl);
// };

// event listener for playerForm
playerForm.addEventListener('submit', handleNewPlayerSubmit);
