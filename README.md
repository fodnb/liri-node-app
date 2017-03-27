# liri-node-app
Homework 10


Homework # 10, setting up a Language Interpretation and Recognition Interface.   

.gitignore file - holds information not to be shared vig git

key.js - holds the credentials for the twitter OATH.  This is then setup to be allowed to export so that credentials are not always in the files shared.  In this case we're sharing so the homework is able to be graded.

liri.js - this is the main document of this project.  I have set up 5 functions to use.

#1 switching(); is a function that takes in user input and uses a switch case statment to move the user on to the query they're trying to perform.  This is used 2 times in the program.  Once at startup and also within the doWhat() function where the user is taking in the parameters in the random.txt file.

#2 twitter(); is a function that first takes in the credentials from the key.js file and then prints your tweets in the console.  I have developed this to stop at number of tweets that you actually have since I never had a twitter account and only sent 4 tweets.  It was very messy looking without setting up the conditional so it creates a better user experience.  To get the data from twitter I used the twitter module

#3 spotify(); is a function that takes in users song title and uses the spotify api and node module to print out the 1st response for the song title in the console.

#4 omdb(); is a function that takes in a movie title and uses the omdb api and request module to print out the 1st response for the movie title in the console.

#5 doWhat(); if the user gives the direction to do-what-it-says this function takes in the arguments that are in the random.txt function and then uses the text in the array's [0] position and uses the switching() function to perform that action on the following text.

Variables -

var twitter = require("twitter");
This is allowing us to use the twitter api node module

var key = require("./key.js");
This is allowing the use of the information stored in the key.js file

var spotify = require("spotify");
This is allowing the use of the twitter api node module

var request = require("request");
This is allowing the use of the request api node module

var action = process.argv[2];
This holds the information that the user types into the command line in 1st position after the file name used.  This will be used to signify which search we're using.

var queryIng = process.argv[3];
This hold the information thath the user types into the command lind in the 2nd position after the file name used.  This will be used to signify what the user is searching for.

var fs = require("fs");
This allows us to access the file system.

var myArray = []; 
Used to take in all words after the action argument in the command line so I can search for the users entire search query.

var myLength = process.argv;
this allows me to find out if the user put the queryIng in parentheses or in just plain type.  If in plain type I've used conditionals to still use the users search in full.

var getData - 
this takes the data that is provided from the api search and stringify's the results

var thisArray - 
this takes the data and stores it in a array so we can manipulate the information. 

var res - 
this variable will allow us to pick off the first charachter in the array.


var newr - 
holds the new value we'll be searching for and is then equated to the queryIng variable



log.txt 
used an appendFile to keep search/response history when searches are performed

package.json 
after using npm init  - this file holds the requirements for this application.  


by using 

 --save after each npm install the packages used are saved in the package.json file to make it easier for others to work with the same application.  So each user doesn't have to continuosly download all packages used in the application.

 