
var request = require("request");

var moment = require("moment");

var detenv = require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var fs = require("fs");



function concert(name){
    //run concert-this
    var URL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";
    request(URL, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        if(error){
            return console.log('error: ', error);
        }
        // console.log(body);
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var responseJSON = JSON.parse(body);//JSON.parse(response);
        // console.log(responseJSON[0]);
        // console.log(responseJSON);
        if(responseJSON.length > 0 ){
            //
            var result = "\nVenue: " + responseJSON[0].venue.name + "\nLocation: " + responseJSON[0].venue.city + ", " + responseJSON[0].venue.region + "\nDate: " + moment(responseJSON[0].datetime).format("MM-DD-YYYY") + "\n";
        } else {
            var result = "No concerts found";
        }
        
        // fs.appendFile('log.txt', result);
        fs.appendFile('log.txt', 'concert-this ' + name + '\n' + result);
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
        var res = "Artist(s): " + artists + "\nSong Name: " + result.name + "\nPreview: " + result.preview_url + "\nAlbum :" + result.album.name;
        // console.log(artists);
        fs.appendFile('log.txt', 'spotify-this-song ' + song + '\n' + res);
        console.log(res);
    });
};

function movie(name){
    //run movie-this
    if(!name){
        name = "Mr. Nobody";
    }
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + name;
    request(URL, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        if(error){
            return console.log('error: ', error);
        }
        // console.log(body);
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var responseJSON = JSON.parse(body);//JSON.parse(response);
        // console.log(responseJSON[0]);
        var result = "\nTitle: " + responseJSON.Title + "\nYear: " + responseJSON.Year + "\nIMDB Rating: " + responseJSON.Ratings[0].Value + "\nRotten Tomatoes Rating: " + responseJSON.Ratings[1].Value + "\nCountry: " + responseJSON.Country + "\nLanguage: " + responseJSON.Language + "\nPlot: " + responseJSON.Plot + "\nActors: " + responseJSON.Actors + "\n";
        fs.appendFile('log.txt', 'movie-this ' + name + '\n' + result);
        console.log(result);
    });
};

function doSays(){
    //run do-what-it-says
    fs.appendFile('log.txt', '\n\ndo-what-it-says\n');
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){ 
            return console.log(error);
        }
        var params = data.split(",");
        // console.log(params);
        if (params.length === 0){
            return console.log("Text file is empty");
        }
        var type = params[0];
        var term = params[1].replace(/['"]+/g, '');
        if(type === "concert-this"){
            //run concert
            concert(term);
        } else if(type === "spotify-this-song"){
            //run  spotifyThisSong
            spotifyThisSong(term);
        } else if(type === "movie-this"){
            //movie
            movie(term);
        }  else{
            console.log("Term not valid. Needs 'spotify-this-song' or 'movie-this' or 'concert-this'")
        }
    });
        
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
    //run movie
    movie(term);
} else if(type === "do-what-it-says"){
    //run doSays
    doSays();
}

// concert("Pentatonix");
// spotifyThisSong();
// movie();
// doSays();