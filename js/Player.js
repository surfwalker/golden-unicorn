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

function saveToLocalStorage(arr) {
	var stringifiedPlayers = JSON.stringify(arr);
	localStorage.setItem('playersStorage', stringifiedPlayers);
}

function loadFromLocalStorage(dataArray, length) {
  for (var i = 0; i < length; i++) {
    new Player(dataArray[i].name, dataArray[i].pointsArray);
  }

  // iteration through array and remove first half
  for (var j = 0; j < length; j++) {
    dataArray.shift();
  }
}