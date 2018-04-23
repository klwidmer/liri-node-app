require("dotenv").config();

var whichFunction = process.argv[2];
var userQuery = process.argv[3];

var keys = require("./keys")
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require('fs');

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
    for (let i = 0; i < tweets.length; i++) {
        console.log("")
        console.log(tweets[i].text)
        console.log("---------------------")
    }
} else {
    console.log(error)
}
});
}

function movie(){
    
    var movieSearch;
	if(userQuery === undefined){
		movieSearch = "Mr. Nobody";
	}else{
		movieSearch = userQuery;
	};
    // this is the queryURL that will be used to make the call - it holds the apikey, returns a "short" plot, type json, and 
  
    var queryURL = 'http://www.omdbapi.com/?t=' + movieSearch +'&3f8bad8e=trilogy&y=&plot=short&tomatoes=true&r=json';
    request(queryURL, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body).Title);
	        console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	        console.log("Country of Production: " + JSON.parse(body).Country);
	        console.log("Language: " + JSON.parse(body).Language);
	        console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            userQuery();
            fs.appendFile("log.txt", `Time at ${timeStamp}***\nNEW MOVIE SEARCH EVENT:\nTitle: ${JSON.parse(body).Title}\nYear: ${JSON.parse(body).Year}\nIMDB Rating: ${JSON.parse(body).imdbRating}\nRotten Tomatoes Score: ${JSON.parse(body).Ratings[1].Value}\nCountry of Production: ${JSON.parse(body).Country}\nLanguage: ${JSON.parse(body).Language}\nPlot: ${JSON.parse(body).Plot}\nActors: ${JSON.parse(body).Actors}\n------\n`, function(err) {
            });
        }
    });
}

// I am unable to get anything to show up for my OMDB API request

switch(whichFunction){
    case "spotify-this-song":
        music();
        break;
    case "my-tweets":
        socialMedia();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        Says();
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