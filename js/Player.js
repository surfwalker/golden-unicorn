'use strict';

// will hold all the store object instances
var allPlayers = [];

// Player constructor function
function Player(name, pointsArray) {
	this.name = name;
	// hard coding this.points array for testing purposes
	this.pointsArray = pointsArray || [];
	allPlayers.push(this);
}

// Player method for totalling all points
Player.prototype.totalAllPoints = function() {
	var totalPoints = 0;
	for (var i = 0; i < this.pointsArray.length; i++) {
		totalPoints = totalPoints + this.pointsArray[i];
	}
	return totalPoints;
}

function saveToLocalStorage(arr) {
	var stringifiedPlayers = JSON.stringify(arr);
	localStorage.setItem('playersStorage', stringifiedPlayers);
}

function loadFromLocalStorage(dataArray, length) {
  for (var i = 0; i < length; i++) {
    new Player(dataArray[i].name);
  }

  // iteration through array and remove first half
  for (var j = 0; j < length; j++) {
    dataArray.shift();
  }
}