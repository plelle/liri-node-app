var twitter = require('twitter');
var authKeys = require('./keys.js');

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

