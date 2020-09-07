const express = require('express')
const {Movies} = require('../models/movie')
const {Users} = require('../models/user')

const router = express.Router()

const movies = [

{
  Title: "Iron Man",
  Description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
  Genre: {
    Name: "Action",
    Description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats and frantic chases"
  },
  Director: { Name: "Jon Favreau", Birth: 1966, Bio: "Jonathan Favreau is an American actor, director, producer, and screenwriter. As an actor, Favreau has appeared in the films Rudy, Swingers, Very Bad Things" },
  Actors: ["Robert Downey Jr.", "Terrence Howard", "Jeff Bridges", "Gwyneth Paltrow"],
  ImagePath: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
},

{
  Title: "How to Train Your Dragon",
  Description: "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
  Genre: {
    Name: "Fantasy",
    Description: "Fantasy is a genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore."
  },
  Director: { Name: "Chris Sanders", Birth: 1962, Bio: "Christopher Michael Sanders is an American animation director, film director, screenwriter, producer, illustrator and voice actor." },
  Actors: ["Jay Baruchel", "Gerard Butler", "Craig Ferguson", "America Ferrera"],
  ImagePath: "https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX300.jpg"
},

{
  Title: "Tenet",
  Description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
  Genre: {
    Name: "Sci-Fi",
    Description: "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
  },
  Director: { Name: "Christopher Nolan", Birth: 1970, Bio: "Christopher Edward Nolan CBE is a British-American filmmaker known for making personal, distinctive films within the Hollywood mainstream" },
  Actors: ["Elizabeth Debicki", "Robert Pattinson", "John David Washington", "Aaron Taylor-Johnson"],
  ImagePath: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg"
}
]
// GET all movies
router.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// get single movies based on title
router.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get movie genre based on titles or name
router.get('/movies/genre/:name', (req, res) => {
   Movies.findOne({ 'Genre.Name': req.params.name })
    .then((movie) => {
      const genre = movie.Genre
      res.status(200).json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get a movie director based on name
router.get('/movies/director/:name', (req, res) => {
   Movies.findOne({ 'Director.Name': req.params.name })
    .then((movie) => {
      const director = movie.Director
      res.status(200).json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Register users
router.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + 'already exists');
      } else {
        return Users
          .create({
            Username: req.body.username,
            Password: req.body.password,
            Email: req.body.email,
            Birthday: req.body.birthday
        })
      }
    })
    .then((user) =>{res.status(201).json(user) })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//get all users
router.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

router.get('/users/:username', (req, res) => {
  Users.findOne({ Username: req.params.username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
})

//update users
router.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.username }, { $set:
    {
      Username: req.body.username,
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
})

//users add favourite movie
router.post('/users/:username/favourites/:movieId', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.username }, {
     $push: { FavoriteMovies: req.params.movieId }
   },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
})

//delete favourite movies
router.delete('/users/:username/favourites/:movieId', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.username }, {
     $pull: { FavoriteMovies: req.params.movieId }
   },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.status(200).json({message: `${req.params.movieId} was deleted`});
    }
  });
})

//delete user
router.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).json({message: req.params.username + ' was deleted.'});
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
})

module.exports = router
