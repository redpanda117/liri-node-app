// Load the fs package to read and write
var fs = require("fs");
var inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "list",
        message: "Hello how can I help you today?",
        choices: ["movie-this", "my-tweets", "spotify-this-song", "do-what-it-says"],
        name: "userInput",
    }
]).then(function (userChoice) {

    if (userChoice.userInput === "movie-this") {
        inquirer.prompt([
            {
                type: "input",
                name: "moviePick",
                message: "What movie you want to look up?"
    }
]).then(function (movieInput) {
            movie(movieInput.moviePick);
        });

    } else if (userChoice.userInput === "my-tweets") {
        inquirer.prompt([
            {
                type: "input",
                name: "userName",
                message: "Who latests tweets do you want to see?"
    }
]).then(function (tweetLookUp) {
            twitter(tweetLookUp.userName);
        });

    } else if (userChoice.userInput === "spotify-this-song") {
        inquirer.prompt([
            {
                type: "input",
                name: "music",
                message: "Which song do you want infomation from?"
    }
]).then(function (songInput) {
            song(songInput.music);
        });
    } else {
        doWhatItSays();
    }


});


//function to get movie information
function movie(movieName) {

    //if user doesn't type in a movie name. This is the default movie title.
    if (movieName.length === 0) {
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // Then run a request to the OMDB API with the movie specified
    var request = require("request");
    request(queryUrl, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            //console.log(body);// to find object names

            // showing the desire information in terminal
            console.log(JSON.parse(body).Title);

            console.log("This movie came out in " + JSON.parse(body).Year);

            console.log("IMDB rated the movie: " + JSON.parse(body).imdbRating);

            console.log("Rotten Tomatoes score: " + JSON.parse(body).Ratings[1].Value);

            console.log("Movie was produced in " + JSON.parse(body).Country)

            console.log("Language: " + JSON.parse(body).Language);

            console.log("Plot: " + JSON.parse(body).Plot);

            console.log("Staring: " + JSON.parse(body).Actors);
            
            //adding the data to log.txt 
                var movietxt = "\n" + "Movie Information" + "\n" + "Movie: " +JSON.parse(body).Title + "\n" + "This movie came out in " + JSON.parse(body).Year +"\n"+ "IMDB rated the movie: " + JSON.parse(body).imdbRating +"\n"+ "Rotten Tomatoes score: " + JSON.parse(body).Ratings[1].Value+"\n"+  "Movie was produced in " + JSON.parse(body).Country+ "\n"+ "Language: " + JSON.parse(body).Language+"\n" + "Plot: " + JSON.parse(body).Plot+"\n"+ "Staring: " + JSON.parse(body).Actors +"\n" + "=======================================";

                fs.appendFile("log.txt", movietxt, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
        }
    });
}

function twitter(userName) {
    var Twitter = require('twitter');
    var keys = require("./keys.js");
    var client = new Twitter(keys.twitterKeys);

    //if user does not give a username to look up 
    if (userName.length === 0) {
        userName = "nguyentina2005";
    }

    var params = {
        screen_name: userName,
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            //looping through the 20 tweets to get time post and text from each tweet.
            for (var i = 0; i < tweets.length; i++) {
                //console.log(tweets[i]);
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("--------------------------------");
                //adding the data to log.txt 
                var twittertxt = "\n" + "Twitter Tweets" + "\n" + tweets[i].created_at + "\n" + tweets[i].text + "\n" + "=======================================";

                fs.appendFile("log.txt", twittertxt, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }

        }
    });
}

//function to get song info from spotify
function song(songInput) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: "d130b2286a484fa9954bfcb482b2bc1c",
        secret: "4f61feb2f6e54cecb559782a3cc41b13"
    });

    //if user does not enter a song
    if (songInput.length === 0) {
        songInput = "The Sign Ace of Base"
    }

    spotify.search({
        type: 'track',
        query: songInput
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //information on the first song result of search to show up on the terminal
        console.log("Title: " + data.tracks.items[0].name);

        console.log("Artist: " + data.tracks.items[0].artists[0].name)

        console.log("Album: " + data.tracks.items[0].album.name)
        console.log("Link: " + data.tracks.items[0].preview_url)

        //adding the data to log.txt 
        var spotifytxt = "\n" + "Spotify Song" + "\n" + "Title: " + data.tracks.items[0].name + "\n" + "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Album: " + data.tracks.items[0].album.name + "\n" + "Link: " + data.tracks.items[0].preview_url + "\n" + "=======================================";

        fs.appendFile("log.txt", spotifytxt, function (err) {
            if (err) {
                return console.log(err);
            }
        });

    });

}

//function for the action to be taken fro what ever is in the random.txt file.
function doWhatItSays() {


    //read what existing in the file
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //console.log(data);see if file properly linked

        //turn the data into an array
        var dataArr = data.split(",");
        //console.log(dataArr);

        var action = dataArr[0];
        var name = dataArr[1];
        if (action = "spotify-this-song") {
            song(name);
        }
    });


}
