const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express')
const cors = require('cors');
const routes = require("./routes");
const swaggerDocument = require('./swagger.json')
const app = express();

let allowedOrigins = ['http://localhost:8080'];

app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/', routes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});





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
