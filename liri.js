"use strict";

var request = require('request');
var twitter = require('twitter');
var authKeys = require('./keys.js');
var spotify = require('spotify');
var fs = require('fs');

var command = process.argv[2];
var args = process.argv.slice(3);

function liri(){
    if(command){
        command = command.toLowerCase();
        fs.appendFileSync("log.txt", "Command: " + command + " " + args.join(" ") + "\n");
    }

    switch (command){
        case "my-tweets":
            tweets();
            break;
        case "spotify-this-song":
            spotifyTune();
            break;
        case "movie-this":
            movie();
            break;
        case "do-what-it-says":
            random();
            break;
        default:
            console.log("Command options: my-tweets, spotify-this-song, movie-this, do-what-it-says");
            break;
    }
};

function tweets(){
    var auth = new twitter(authKeys.twitterKeys);
    var userName = args[0];

    if (userName){
        var info = { screen_name: screenName, count: 20 };
    } else {
        var info = { screen_name: 'skystreamxtvbox', count: 20};
    }

    auth.get('statuses/user_timeline', info, twitterResponse);
};

function twitterResponse(error, tweets, response){
    if(!error){
        for(var i = 0; i < tweets.length; i++){
            console.log(tweets[i].created_at + " " + tweets[i].text);

            fs.appendFileSync("log.txt", tweets[i].created_at + " " + tweets[i].text + "\n");
        }
    }
    else{
        console.log(error);
    }
};

function spotifyTune(){
    var tuneName = args;

    if (tuneName.length === 0){
        tuneName = "Natural Disaster + Zac Brown Band";
    } else{
        tuneName = args[0];

        for(var i = 0; i < args.length; i++){
            tuneName = tuneName + "+" + args[i];
        }
    }

    spotify.search({ type: 'track', query: tuneName}, spotifyResponse);
};

function spotifyResponse(err, data){
    if(!err){
        var tuneInfo = data.tracks.items[0];

        if(tuneInfo){
            var artist = tuneInfo.artists[0].name;

            for(var i = 0; i < tuneInfo.artists.length; i++){
                artist += ", " + tuneInfo.artists[i].name;
            }
        console.log("Artist: " + artist);
        console.log("Song Name: " + tuneInfo.name);
        console.log("Listen Link: " + tuneInfo.preview_url);
        console.log("Album: " + tuneInfo.album.name);

        fs.appendFileSync("log.txt", "Artist: " + artist + "\n");
        fs.appendFileSync("log.txt", "Song Name: " + tuneInfo.name + "\n");
        fs.appendFileSync("log.txt", "Listen Link: " + tuneInfo.preview_url + "\n");
        fs.appendFileSync("log.txt", "Album: " + tuneInfo.album.name + "\n");
    }
    else{
        console.log("No song found!");

        fs.appendFileSync("log.txt", "No song found!" + "\n");
    }

    }
    else{
        console.log(err);
    }
};

function movie(){
    var movieName = "";

    if(args.length === 0){
        movieName = "Mr. Nobody";
    } else{
        movieName = args[0];

        for(var i = 0; i < args.length; i++){
            movieName = movieName + "+" + args[i];
        }
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";
    request(queryURL, omdbResponse);
};

function omdbResponse(err, resp, body){
    if(!err && resp.statusCode === 200){
        if(JSON.parse(body).Title){
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes Link: " + JSON.parse(body).tomatoURL);

            fs.appendFileSync("log.txt", "Title: " + JSON.parse(body).Title);
            fs.appendFileSync("log.txt", "Year: " + JSON.parse(body).Year);
            fs.appendFileSync("log.txt", "IMDB Rating: " + JSON.parse(body).imdbRating);
            fs.appendFileSync("log.txt", "Country: " + JSON.parse(body).Country);
            fs.appendFileSync("log.txt", "Language: " + JSON.parse(body).Language);
            fs.appendFileSync("log.txt", "Plot: " + JSON.parse(body).Plot);
            fs.appendFileSync("log.txt", "Actors: " + JSON.parse(body).Actors);
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            fs.appendFileSync("log.txt", "Rotten Tomatoes Link: " + JSON.parse(body).tomatoURL);
        }
        else{
            console.log("No movie found!");

            fs.appendFileSync("log.txt", "No movie found!" + "\n");
        }
    }
    else{
        console.log(err);
    }
};


function random(){
    fs.readFile("random.txt", "utf8", readFileResults);
};

function readFileError(err, data){
    if(!err){
        var commandArray = data.split(",");

        command = commandArray[0].toLowerCase();
        args = commandArray.slice(1);

        if(command === "my-tweets" || command === "spotify-this-song" || command === "movie-this"){
            liri();
        }
        else{
            console.log("Not a valid command!");

            fs.appendFileSync("log.txt", "Not a valid command!" + "\n");
        }
    }
    else{
        console.log(err);
    }
};

liri();



