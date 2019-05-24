'use strict';

// grabbing story flip image DOM elements in storybook.html
var unicornStory = document.getElementById('unicornstory');
var laserKittehStory = document.getElementById('laserkittehstory');
var goldenUnicornStory = document.getElementById('goldenunicornstory');

//Functions to handle sound effects
function unicornsStoryBook () {
document.getElementById('unicorns').play();
}

function laserKittehStoryBook () {
	document.getElementById('laser-kitteh').play();
}

function goldenUnicornStoryBook () {
	document.getElementById('golden-unicorn').play();
}

// event listeners for audio
unicornStory.addEventListener('click', unicornsStoryBook);
laserKittehStory.addEventListener('click', laserKittehStoryBook);
goldenUnicornStory.addEventListener('click', goldenUnicornStoryBook);