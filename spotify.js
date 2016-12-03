var spotify = require('spotify');

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
        var tuneInfo = data.tracks.item[0];

        if(tuneInfo){
            var artist = tuneInfo.artist[0].name;

            for(var i = 0; i < tuneInfo.artist.length; i++){
                artist += ", " + tuneInfo.artist[i].name;
            }
        console.log("Artist:" + artist);
        console.log("Song Name:" + tuneInfo.name);
        console.log("Listen Link:" + tuneInfo.preview_url);
        console.log("Album:" + tuneInfo.album.name);

        fs.appendFileSync("log.txt", "Artist:" + artist + "\n");
        fs.appendFileSync("log.txt", "Song Name:" + tuneInfo.name + "\n");
        fs.appendFileSync("log.txt", "Listen Link:" + tuneInfo.preview_url + "\n");
        fs.appendFileSync("log.txt", "Album:" + tuneInfo.album.name + "\n");
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