var twitter = require("twitter");
var key = require("./key.js");
var spotify = require("spotify");
var request = require("request");
var action = process.argv[2];
var queryIng = process.argv[3];
var fs = require("fs");
var myArray = [];
var myLength = process.argv;



if (myLength.length > 3) {
    for (var i = 2; i < myLength.length; i++) {
        myArray.push(process.argv[i]);

    }
    console.log(myArray);
    myArray = myArray.splice(1);
    console.log(myArray);
    myArray = myArray.toString();



    for (i = 0; i < myArray.length; i++) {
        myArray = myArray.replace(",", "  ");

    }
    console.log(myArray);
    queryIng = myArray;
}



function switching() {

    switch (action) {

        case "my-tweets":
            myTwitter();
            break;
        case "movie-this":
            myOmdb();
            break;
        case "spotify-this-song":
            mySpotify();
            break;
        case "do-what-it-says":
            doWhat();
            break;

    }

}


switching();

/////////////////////// TWITTER  /////////////////////////////////////////////////////


function myTwitter() {
    console.log("*******************************************************");
    var T = new twitter(key);
    // console.log(T);
    // this will my first 20 tweets although I only have four at this time
    T.get('search/tweets', { q: "SPINESHANK6813" }, function(error, tweets, response) {
        for (var i = 0; i < 20; i++) {
            if (tweets.statuses[i] === undefined) {

            } else {
                console.log(" ");
                console.log("Tweet# " + (i + 1));
                console.log(tweets.statuses[i].text);
                console.log("");
                fs.appendFile("log.txt", JSON.stringify({ Tweet: tweets.statuses[i].text }) + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                })

            }
        }
        console.log("");
        console.log("*******************************************************");



    });

}



// This will get my favorite tweets
// function myTweets(){
// var params = {screen_name: 'Spineshank6813'};
// T.get('favorites/list', params, function(error, tweets, response) {
//   if (!error) {
//      for(var i = 0; i < 3; i++){
//          console.log(tweets[i].text);
// }
//   }
// });
// }
// myTweets();





/////////////////////////////////  SPOTIFY //////////////////////////////////

// INSTRUCTIONS
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to

// "The Sign" by Ace of Base

function mySpotify() {

    if (queryIng === undefined) {
        queryIng = "The sign ace of base";
    }
    spotify.search({ type: 'track', query: queryIng }, function(err, data) {
        if (err) {

            console.log('Error occurred: ' + err);
            return;
        }
        console.log("what Im looking for: " + queryIng);

        console.log(" ");
        console.log("**********************************************************************");
        console.log("ARTIST: " + data.tracks.items[0].album.artists[0].name) //artist
        console.log(" ");
        console.log("SONG: " + data.tracks.items[0].name); //song
        console.log(" ");
        console.log("ALBUM: " + data.tracks.items[0].album.name); // album
        console.log(" ");
        console.log("PREVIEW: " + data.tracks.items[0].preview_url); //previewLink
        console.log(" ");
        console.log("**********************************************************************");
        fs.appendFile("log.txt", JSON.stringify({ Artist: data.tracks.items[0].album.artists[0].name, Song: data.tracks.items[0].name, Album: data.tracks.items[0].album.name, Preview: data.tracks.items[0].preview_url }) + "\n", function(err) {
            if (err) {
                return console.log(err);
            }
        })

    });

}

////////////////////// OMDB ///////////////////////////////////////////////


// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// * Rotten Tomatoes Rating.
// * Rotten Tomatoes URL.

function myOmdb() {
    if (queryIng === undefined) {
        queryIng = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?t=" + queryIng, function(error, response, body) {

        // console.log('error:', error); // Print the error if one occurred 
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 

        newBody = JSON.parse(body);
        console.log(queryIng);

        // console.log('body:', newBody); // Print the HTML for the Google homepage. 
        console.log(" ");
        console.log("**********************************************************************");

        console.log("TITLE: " + newBody.Title); // title
        console.log(" ");
        console.log("RATING: " + newBody.Rated); // rating
        console.log(" ");
        console.log("COUNTRY: " + newBody.Country); // country
        console.log(" ");
        console.log("LANGUAGE: " + newBody.Language); // language
        console.log(" ");
        console.log("PLOT: " + newBody.Plot); // plot
        console.log(" ");
        console.log("ACTORS: " + newBody.Actors); // actors
        console.log(" ");
        console.log("ROTTEN TOMATOES RATING: " + newBody.imdbRating); //tomatoes rating
        console.log(" ");
        console.log("ROTTEN TOMATOES URL:" + "https://www.rottentomatoes.com/m/" + queryIng); // rotten tomatoes url
        console.log("**********************************************************************");
        fs.appendFile("log.txt", JSON.stringify({ Title: newBody.Title, Rated: newBody.Rated, Country: newBody.Country, Language: newBody.Language, Plot: newBody.Plot, Actors: newBody.Actors }) + "\n", function(err) {
            if (err) {
                return console.log(err);
            }
        })


    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////          D O    W H A T              ////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function doWhat(){
    fs.readFile("random.txt", "utf8", function(err, data){
        var thisArray = [];

        var getData = JSON.stringify(data);
        console.log(getData);
        for(i = 0; i < getData.length; i++){
        getData = getData.replace('"', "")
        }
        thisArray = getData.split(",");
        console.log(thisArray[0]);  
        action = thisArray[0];
        var res = thisArray[1];
        var newr = res.slice(1);

        console.log("res " + res);
        

        
        queryIng = newr;


        console.log("querying:" + queryIng);    

    
        switching();
    });

}
