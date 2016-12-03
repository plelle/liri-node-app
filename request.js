var request = require('request');

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
