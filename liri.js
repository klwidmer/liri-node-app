require("dotenv").config();

var whichFunction = process.argv[2];
var userQuery = process.argv[3];

var keys = require("./keys")
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function music (){
    spotify.search({ type: 'track', query: userQuery }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    // console.log(data.tracks.items[0]); 

    var artistsSearch = data.tracks.items; 
    for (let index = 0; index < artistsSearch.length; index++) {
        const element = artistsSearch[index];  
        var album = element.album.name;
        var artist = element.artists[0].name;
        var preview_url = element.preview_url;

        console.log(artist)
    }
    });
}

function socialMedia (){
var params = {screen_name: 'wids24', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[0].text);
  }
});
}

switch(whichFunction){
    case "spotify-this-song":
        music();
        break;
    case "my-tweets":
        socialMedia();
        break;
}



// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
//   var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });