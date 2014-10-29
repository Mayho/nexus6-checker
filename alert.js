var request = require('request');
var path = require('path');
var exec = require('child_process').exec;

//Base configuration
var appDir = path.dirname(require.main.filename);
var stockKeyword = "We are out of inventory";
var audioPlayBinary = "afplay";
var checkInterval = 2000; //Check EVERY device every 2 seconds

var playUrl = [
	{
		url: 'https://play.google.com/store/devices/details?id=nexus_6_blue_32gb&hl=en',
		name: 'Nexus 6 Blue 32GB'
	},
	{
		url: 'https://play.google.com/store/devices/details/Nexus_6_32GB_Cloud_White?id=nexus_6_white_32gb&hl=en',
		name: 'Nexus 6 White 32GB'
	},
	{
		url: 'https://play.google.com/store/devices/details/Nexus_6_64GB_Midnight_Blue?id=nexus_6_blue_64gb&hl=en',
		name: 'Nexus 6 Blue 64GB'
	},
	{
		url: 'https://play.google.com/store/devices/details/Nexus_6_64GB_Cloud_White?id=nexus_6_white_64gb&hl=en',
		name: 'Nexus 6 White 64GB'
	}
];

//GET ME MY NEXUS 6!!!
doCheck();
playAlert(); //Just to make sure alert works when launching

function doCheck() {
	Object.keys(playUrl).forEach(function(key){
		var itemToCheck = playUrl[key];
		
		request(itemToCheck.url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				if (body.indexOf(stockKeyword) > -1) {
					console.log("Out of stock: " + itemToCheck.name);
				} else {
					playAlert();
					console.log("In stock: " + itemToCheck.name);
				}
			}else{
				console.log("Unknown error.  WTF MAN?!?");
			}
		})
	});

	setTimeout(doCheck, checkInterval);
}

function playAlert() {
	exec(audioPlayBinary + " " + appDir + "/chime.mp3");
}
