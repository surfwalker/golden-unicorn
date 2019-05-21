'use strict';

// grabbing leaderboardTable DOM element in leaderboard.html
var leaderboardTable = document.getElementById('leaderboard-table');

var allPlayersData = JSON.parse(localStorage.getItem('playersStorage')) || [];

var arrayLength = allPlayersData.length;

// Player constructor function
function Player(name) {
  this.name = name;
  this.points = [];
}

function loadFromLocalStorage(dataArray, length) {
	console.log(length);
	console.log(dataArray);
  for (var i = 0; i < length; i++) {
    dataArray.push(new Player(dataArray[i].name));
  }

  // iteration through array and remove first half
  for (var j = 0; j < length; j++) {
    dataArray.shift();
  }
}

loadFromLocalStorage(allPlayersData, arrayLength);
