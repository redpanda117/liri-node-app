// Load the fs package to read and write
var fs = require("fs");

var keys = require("./keys.js");
var twitter = keys.twitterKeys;

var command = process.argv[2];
var input = process.argv[3];

// The switch-case will direct which function gets run depending on which command the user gives.

switch (command) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();
        break;

    default:
        console.log("Not a Choice");
        break;
};

function movie() {
    // Then run a request to the OMDB API with the movie specified
    var arr = process.argv.slice(3);
    var movieName = arr.join('+');

    //if user doesn't type in a movie name. This is the default movie title.
    if (movieName.length === 0) {
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

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
        }
    });
}
