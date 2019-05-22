'use strict';

// grabbing leaderboardTable DOM element in leaderboard.html
var leaderboardTable = document.getElementById('leaderboard-table');

var allPlayersData = JSON.parse(localStorage.getItem('playersStorage')) || [];

var arrayLength = allPlayersData.length;

// Player constructor function
function Player(name, points) {
  this.name = name;
  this.points = points;
}

function loadFromLocalStorage(dataArray, length) {
  console.log(length);
  console.log(dataArray);
  for (var i = 0; i < length; i++) {
    dataArray.push(new Player(dataArray[i].name, dataArray[i].points));
  }

  // iteration through array and remove first half
  for (var j = 0; j < length; j++) {
    dataArray.shift();
  }
}

function makeHeaderRow() {

  // create the row
  var trEl = document.createElement('tr');

  // create, content, append first cell
  var thEl = document.createElement('th');
  thEl.textContent = 'Name';
  trEl.appendChild(thEl);

  // create, content, append all spin attempts
  for (var i = 1; i <= 7; i++) {
    thEl = document.createElement('th');
    thEl.textContent = "Spin " + i;
    trEl.appendChild(thEl);
  }

  // create, content, append total sum of all spins
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);

  // append the row to the table
  leaderboardTable.appendChild(trEl);
}

var renderLeaderboard = function(array) {

  makeHeaderRow();

  // make a tr
  var trEl = document.createElement('tr');
	console.log(array.length);
  for (var i = 0; i < array.length; i++) {

    // create, content, append for player's name
    var tdEl = document.createElement('td');
    tdEl.textContent = array[i].name;
    trEl.appendChild(tdEl);

		for(var j = 0; j < array[i].points.length; j++) {

    // create, content, append for each hourly total
    tdEl = document.createElement('td');
    tdEl.textContent = array[i].points[j];
		trEl.appendChild(tdEl);
		}
  }
  // // create, content, append for daily total
  // tdEl = document.createElement('td');
  // tdEl.textContent = this.totalCookiesPerDay(this.recordOfSalesPerHour);
  // trEl.appendChild(tdEl);
  // append the tr to the table
  leaderboardTable.appendChild(trEl);
};

loadFromLocalStorage(allPlayersData, arrayLength);
renderLeaderboard(allPlayersData);
