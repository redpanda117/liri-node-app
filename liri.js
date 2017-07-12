// Load the fs package to read and write
var fs = require("fs");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var twitter = keys.twitterKeys;

var command = process.argv[2];
var input = process.argv[3];

inquirer.prompt([
    {
        type: "list",
        message: "Hello how can I help you today?",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
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
    }else if(userChoice.userInput === "my-tweets"){
        inquirer.prompt([
            {
                type: "input",
                name: "userName",
                message: "Who latests tweets do you want to see?"
    }
]).then(function (tweetLookUp) {
        twitter(tweetLookUp.userName);
        });
    }
});



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
        }
    });
}
