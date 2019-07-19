function App()
{	
	//callback function passed in as param is what gets called after the user 
	// touches the screen and unlocks the audio for ios
	this.audioMgr = new AudioManager(this.loadAudio);
	this.audioMgr.init();

	this.eventType = "";
	("ontouchstart" in window) ? this.eventType = "touchstart" : this.eventType = "click";
}

App.prototype.loadAudio = function()
{
	// adds a sound to a list of sounds to be downloaded
	app.audioMgr.addSoundToQueue("back", "audio/background.mp3");

	// first param is key to identify a sound, second is URI
	app.audioMgr.addSoundToQueue("woohoo", "audio/woohoo.mp3");
	app.audioMgr.addSoundToQueue("doh", "audio/doh.mp3");
	app.audioMgr.addSoundToQueue("boop", "audio/beep.mp3");
	
	// downlaods the list of sounds to be downloaded
	// when finished downloading, call the function as param to begin the game
	// from that point on, sounds can be played on ios
	app.audioMgr.downloadQueue(app.init);
}


App.prototype.init = function() 
{
	// regular initialization logic

	//get rid of splash screen
	document.getElementById("splash").style.display = "none";

	//play a sound
	app.audioMgr.playSound("back", true); // true makes the audio loop

	var button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Doh");
	button.setAttribute("class", "but");
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(button);
	button.addEventListener(app.eventType, function()
		{
			app.audioMgr.playSound("doh");
		});

	button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "woohoo");
	button.setAttribute("class", "but");
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(button);
	button.addEventListener(app.eventType, function()
		{
			app.audioMgr.playSound("woohoo");
		});


	
};


