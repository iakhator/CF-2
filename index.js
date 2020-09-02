const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json())
app.use(express.static('public'));

let movies = [
  {"title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]},
  {"title":"Boarding School Girls' Pajama Parade","year":1900,"cast":[],"genres":[]},
  {"title":"Buffalo Bill's Wild West Parad","year":1900,"cast":[],"genres":[]},
  {"title":"Caught","year":1900,"cast":[],"genres":[]},
  {"title":"Clowns Spinning Hats","year":1900,"cast":[],"genres":[]},
  {"title":"Capture of Boer Battery by British","year":1900,"cast":[],"genres":["Short","Documentary"]},
  {"title":"The Enchanted Drawing","year":1900,"cast":[],"genres":[]},
  {"title":"Feeding Sea Lions","year":1900,"cast":["Paul Boyton"],"genres":[]},
  {"title":"How to Make a Fat Wife Out of Two Lean Ones","year":1900,"cast":[],"genres":["Comedy"]},
  {"title":"New Life Rescue","year":1900,"cast":[],"genres":[]}
]

// GET all movies
app.get('/movies', (req, res) => {
  res.json(movies)
});

// get single movies based on title
app.get('/movies/:title', (req, res) => {
  res.json({
    title:"Feeding Sea Lions",
    year:1900,
    cast:["Paul Boyton"],
    genres:[]
  });
});

//Get movie genre based on titles or name
app.get('/movies/genre/:title', (req, res) => {
  res.json({
    genre: 'Action'
  });
});

//Get a movie director based on name
app.get('/movies/director/:name', (req, res) => {
  res.json({
    name: 'Russo Alex',
    birth_year: '2019',
    death_year: 'nil'
  });
});

//Register users
app.post('/users', (req, res) => {
  console.log(req.body)
  const userDetails = {
    username: req.body.username,
    email: req.body.email,
    id: 1,
  }

  res.json({userDetails})
})

//update users
app.put('/users/:id', (req, res) => {
  const userName = req.body.username;
  res.json({message: 'Updated successfully'})
})

//users add favourite movie
app.post('/users/:id/favourites', (req, res) => {
  res.json({
    message: "Movies successfully added to favourite"
  })
})

//delete favourite movies
app.delete('/users/:id/favourites/:favourite_id', (req, res) => {
  res.json({
    message: "Favourite movie deleted successfully"
  })
})

//delete user
app.delete('/users/:id', (req, res) => {
  res.json({
    message: "User deleted successfully"
  })
})


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
