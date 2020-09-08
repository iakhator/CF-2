const express = require('express')
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const {Movies} = require('../models/movie')
const {Users} = require('../models/user')
require('../passport');

const router = express.Router()

// login
require('../auth')(router);

// index route
router.get('/', (req, res) => {
  res.send('Welcome to my movies db. you can see the documentation by going to url/documentation.html')
});

// GET all movies
router.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.get('/movies/genre/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.get('/movies/director/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.post('/users', [
    check('username', 'Username is required').isLength({min: 5}),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
  // check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const hashedPassword = Users.hashPassword(req.body.password);
  Users.findOne({ Username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + 'already exists');
      } else {
        return Users
          .create({
            Username: req.body.username,
            Password: hashedPassword,
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
router.get('/users',passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

router.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.put('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.post('/users/:username/favourites/:movieId', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.delete('/users/:username/favourites/:movieId',passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.delete('/users/:username',passport.authenticate('jwt', { session: false }), (req, res) => {
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
