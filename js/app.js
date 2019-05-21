'use strict'

// will hold all the store object instances
var allPlayers = [];

// grabbing leaderboardTable DOM element in leaderboard.html
var leaderboardTable = document.getElementById('leaderboard-table');

// grabbing playerForm DOM element in index.html
var playerForm = document.getElementById('playerform');

// Player constructor function
function Player(name) {
  this.name = name;
  this.points = 0;
  allPlayers.push(this);
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
  console.log(playerName);
  new Player(playerName);

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