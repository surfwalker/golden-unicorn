'use strict';

// will hold all the store object instances
var allPlayers = [];

// Player constructor function
function Player(name) {
	this.name = name;
	// hard coding this.points array for testing purposes
	this.points = [100, 200, 300, 400, 500, 600, 700];
	allPlayers.push(this);
}
