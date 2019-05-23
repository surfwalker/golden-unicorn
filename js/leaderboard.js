'use strict';

// grabbing leaderboardTable DOM element in leaderboard.html
var leaderboardTable = document.getElementById('leaderboard-table');

allPlayers = JSON.parse(localStorage.getItem('playersStorage')) || [];

var arrayLength = allPlayers.length;


function totalAllPoints(array) {
	var totalPoints = 0;
	for (var i = 0; i < array.pointsArray.length; i++) {
		totalPoints = totalPoints + array.pointsArray[i];
	}
	return totalPoints;
}

function orderLeaderboard(array) {
  var tempArray = JSON.parse(JSON.stringify(array));
  for (var i = 0; i < tempArray.length; i++) {
    tempArray[i].pointsArray.push(totalAllPoints(tempArray[i]));
  }
  tempArray = tempArray.sort(function(a, b){return b.pointsArray[b.pointsArray.length-1]-a.pointsArray[a.pointsArray.length-1]});
  for (var j = 0; j < tempArray.length; j++) {
    tempArray[j].pointsArray.pop();
  }
  renderLeaderboard(tempArray);
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
    thEl.textContent = 'Spin ' + i;
    trEl.appendChild(thEl);
  }

  // create, content, append total sum of all spins
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);

  // append the row to the table
  leaderboardTable.appendChild(trEl);
}

function renderLeaderboard(array) {

  makeHeaderRow();

  for (var i = 0; i < array.length; i++) {
		// make a tr
		var trEl = document.createElement('tr');

    // create, content, append for player's name
    var tdEl = document.createElement('td');
    tdEl.textContent = array[i].name;
    trEl.appendChild(tdEl);
   
    for (var j = 0; j < 7; j++) {
      tdEl = document.createElement('td');
      if (j >= array[i].length) {
        
      } else {
        tdEl.textContent = array[i].pointsArray[j];
      }
      trEl.appendChild(tdEl);
    }

		// create, content, append for daily total
		tdEl = document.createElement('td');
		tdEl.textContent = totalAllPoints(array[i]);
		trEl.appendChild(tdEl);

  // append the tr to the table
	leaderboardTable.appendChild(trEl);
	}
}

loadFromLocalStorage(allPlayers, arrayLength);
orderLeaderboard(allPlayers);
