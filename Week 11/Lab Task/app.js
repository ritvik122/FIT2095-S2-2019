//Importing it's required modules
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Referencing to our routers
const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

//Connecting to the movies database via mongoose
mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true
}, function (err) {
  if (err) {
    return console.log('Mongoose - connection error:', err);
  }
  console.log('Connected Successfully');
});

////////////////////////////////////////////////// RESTful endpoints handlers for the actors collection ////////////////////////////////////////////////

//If a GET request arrives with pathname =’/actors’, execute actor.getAll
app.get('/actors', actors.getAll);

//If a POST request arrives with pathname =’/actors’, execute actor.createOne
app.post('/actors', actors.createOne);

//If a GET request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.getOne
app.get('/actors/:id', actors.getOne);

// If a PUT request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.updateOne
app.put('/actors/:id', actors.updateOne);

//If we get a post request, then this end point will add a movie id to the array of the movies that's there in the actor document
app.post('/actors/:id/movies', actors.addMovie);

//if a DELETE request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.deleteOne
app.delete('/actors/:id', actors.deleteOne);

//to delete the actor and all the movies the actor is related to
app.delete('/deleteactorandrelatedmovies/:id', actors.deleteActorAndRelatedMovies)

//to delete a specfic movie from the movie array of a specified actor
app.delete('/actores/:id/:movieid', actors.removeMovieFromMovieArrayOfActor)

////////////////////////////////////////////////// RESTful endpoints for the movies collection /////////////////////////////////////////////////

//to get all the movies
app.get('/movies', movies.getAll);

//to create a new movie document
app.post('/movies', movies.createOne);

//to get a single movie
app.get('/movies/:id', movies.getOne);

//to update a single movie document
app.put('/movies/:id', movies.updateOne);

//to delete a movie on the basis of the given id
app.delete('/movies/:id', movies.deleteOne);

//This function adds the specified actor to the actor array of the movie document
app.post('/addSpecifiedActor/:id', movies.addSpecifiedActor);

//to delete a specified actor from the actor array of the movie document
app.delete('/movies/:id/:actorid', movies.removeSpecifiedActorFromActorsArray);

//to get all the movies between a specific range
app.get('/moviesBetweenSpecificPeriod/:year1/:year2', movies.getAllTheMoviesBetweenSpecifiedPeriod);

// for handling invalid URLs
app.get('/*', (req, res) => {
  res.redirect("/");
});

app.put('/incrementTheYearOfTheMoviesBySeven', movies.incrementTheYearOfTheMovies)
