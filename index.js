const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json())
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', routes)

    // Return a list of ALL movies to the user
    // Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
    // Return data about a genre (description) by name/title (e.g., “Thriller”)
    // Return data about a director (bio, birth year, death year) by name
    // Allow new users to register
    // Allow users to update their user info (username)
    // Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
    // Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
    // Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));

// const users = [
//   {
//     Username:"Ben",
//     Email: "ben@movies.com",
//     Birthday: new Date("1985-02-19"),
//     FavouriteMovies: [ObjectId("5f5392f8b35bd1e9683805d6"), ObjectId("5f5392d6b35bd1e9683805d5"), ObjectId("5f538efbb35bd1e9683805cc"),  ]
//   },
//   {
//     Username: "Lily",
//     Email: "lily@movies.com",
//     Birthday: new Date("1988-02-19"),
//     FavouriteMovies: [ObjectId("5f5392f8b35bd1e9683805d6"), ObjectId("5f5392d6b35bd1e9683805d5"), ObjectId("5f538f56b35bd1e9683805cf"),]
//   }, 

//   {
//     Username: "James",
//     Email: "james@movies.com",
//     Birthday: new Date("1988-05-19"),
//     FavouriteMovies: [ObjectId("5f538f39b35bd1e9683805ce"), ObjectId("5f5392d6b35bd1e9683805d5"),]
//   }, 

//   {
//     Username: "Rebecca",
//     Email: "rebecca@movies.com",
//     Birthday: new Date("1991-05-19"),
//     FavouriteMovies: [ObjectId("5f538efbb35bd1e9683805cc"), ObjectId("5f538f1cb35bd1e9683805cd"), ObjectId("5f538f39b35bd1e9683805ce"), ObjectId("5f538f56b35bd1e9683805cf"), ObjectId("5f53914bb35bd1e9683805d0"), ObjectId("5f5392f8b35bd1e9683805d6"), ObjectId("5f5392d6b35bd1e9683805d5")]
//   }, 

//   {
//     Username: "Nelson",
//     Email: "nelson@movies.com",
//     Birthday: new Date("1991-05-19"),
//     FavouriteMovies: [ObjectId("5f538efbb35bd1e9683805cc"), ObjectId("5f538f1cb35bd1e9683805cd"), ObjectId("5f53914bb35bd1e9683805d0"), ObjectId("5f5392f8b35bd1e9683805d6"), ObjectId("5f5392d6b35bd1e9683805d5")]
//   }, 

// ]
