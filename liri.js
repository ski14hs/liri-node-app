
var request = require("request");

var moment = require("moment");

var detenv = require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);



function concert(name){
    //run concert-this
    var URL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";
    request(URL, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        if(error){
            console.log('error: ', error);
        }
        // console.log(body);
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var responseJSON = JSON.parse(body);//JSON.parse(response);
        // console.log(responseJSON[0]);
        var result = "\nVenue: " + responseJSON[0].venue.name + "\nLocation: " + responseJSON[0].venue.city + ", " + responseJSON[0].venue.region + "\nDate: " + moment(responseJSON[0].datetime).format("MM-DD-YYYY") + "\n";
        // fs.appendFile('log.txt', result);
        console.log(result);
    });
    

};

function spotifyThisSong(song){
    //run spotify-this-song
    if(!song){
        song = "The Sign Ace of Base";
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
       
        // console.log(data.tracks.items[0]); 
        // console.log(data[0]);
        var result = data.tracks.items[0];
        // console.log(result.artists);
        // console.log(result.album);
        var artists ='';
        for(var i = 0; i < result.artists.length; i++){
            artists += result.artists[i].name + ", ";
        }
        // console.log(artists);
        console.log("Artist(s): " + artists + "\nSong Name: " + result.name + "\nPreview: " + result.preview_url + "\nAlbum :" + result.album.name);
    });
};

function movie(name){
    //run movie-this
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + name;
    request(URL, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        if(error){
            console.log('error: ', error);
        }
        // console.log(body);
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var responseJSON = JSON.parse(body);//JSON.parse(response);
        // console.log(responseJSON[0]);
        var result = "\nTitle: " + responseJSON.Title + "\nYear: " + responseJSON.Year + "\nIMDB Rating: " + responseJSON.Ratings[0].Value + "\nRotten Tomatoes Rating: " + responseJSON.Ratings[1].Value + "\nCountry: " + responseJSON.Country + "\nLanguage: " + responseJSON.Language + "\nPlot: " + responseJSON.Plot + "\nActors: " + responseJSON.Actors + "\n";
        // fs.appendFile('log.txt', result);
        console.log(result);
    });
};

function doSays(){
    //run do-what-it-says
}

var type = process.argv[2];
var term = process.argv.slice(3).join(" ");
if(type === "concert-this"){
    //run concert
    concert(term);
} else if(type === "spotify-this-song"){
    //run  spotifyThisSong
    spotifyThisSong(term);
} else if(type === "movie-this"){
    //
} else if(type === "do-what-it-says"){
    //
}

// concert("Taylor Swift");
// spotifyThisSong();
movie("Star Wars");