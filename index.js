const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan('common'));
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

// GET requests
app.get('/movies', (req, res) => {
  res.send(movies);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
