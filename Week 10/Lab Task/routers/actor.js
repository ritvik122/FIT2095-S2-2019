const mongoose = require('mongoose');

//Here we are referencing to both the schemas that we created for the actor and the movie
const Actor = require('../models/actor');
const Movie = require('../models/movie');

//Here we are creating an object where each property of the object happens to be the function.
//We do so, so that we can send multiple functions
module.exports = {

    //Get all function retrieves all the documents from the actor collection and send them back to the user as a response
    //res.json() is function that sends back the response in the JSON format
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actor) {
            if (err) return res.json(err);
            if (!actor) return res.json();
            res.json(actor);
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        //The only difference in the second approach is that here we are using NameOfTheModel.create in order to create a new document
        Actor.create(newActorDetails, function (err, actor) {
            if (err)
                return res.json(err);
            res.json(actor);
        });
    },

    //This function finds the document by a given id
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id }) // here we have given the id as a filter in order to obtain the document

            //The main use of .populate() is to automatically replace the specified path in the document with the doucments from other collections
            .populate('movies') // populate function can accept a string or an object as it's input. It can also take another argument which basically happens to name of the field of the other document that will populate the given field of the mentioned document.
            .exec(function (err, actor) {
                if (err) return res.json(err);
                if (!actor) return res.json();
                res.json(actor);
            });
    },

    //This function finds the document by it's id and update it's content on the basis of the req.body
    updateOne: function (req, res) {

        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);

        });
    },

    //This function deletes the actor document on the basis of the given id
    deleteOne: function (req, res) {

        Actor.findOneAndRemove({ _id: req.params.id }, function (err,) {
            if (err) return res.status(400).json(err);
            res.json();

        });
    },

    //This function deletes the actor and all the movies to which the actor is related to
    deleteActorAndRelatedMovies : function(req ,res){

        Actor.findOneAndRemove({_id: req.params.id}, function(err, actor){

            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            console.log("The specified actor has been deleted !")
            
            let actorID = actor._id;
            console.log(typeof actorID);
            
            Movie.deleteMany({ actors: {$in: [actorID] } }, function(err, movie) {

                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                console.log("The related movies have also been deleted !");
                console.log(movie);

            })

        })
    },

    //This function deletes the specified movie from the movie array of the specified actor
    removeMovieFromMovieArrayOfActor: function(req, res){

        Actor.findOne({ _id: req.params.id }, function (err, actor) {

            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            console.log("The Actor has been located !")

            let movieToBeDeleted = req.params.movieid;
            let movieArray = actor.movies;

            const {ObjectId} = require('mongodb');
            movieToBeDeleted = ObjectId(movieToBeDeleted)

            //Iterating the movies array of the actor document
            for (i = 0; i < movieArray.length; i++)
            {
                //If we get the desired movie, then delete it
                if (String(movieToBeDeleted) == String(movieArray[i]))
                {
                    movieArray.splice(i, 1);
                }

            }
            actor.movies = movieArray;
            actor.save(function (err) {

                if (err) return res.status(500).json(err);
                res.json(actor);

                console.log("Successfully deleted the specified movie from the movie array of the actor document.");

            });

        });

    },

    //This function adds a movie id to the list of movies that's there in the actor document
    addMovie: function (req, res) {

        //Here we are finding the desired actor document
        Actor.findOne({ _id: req.params.id }, function (err, actor) {

            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            console.log("The Actor has been located !")

            //Here we are the desired movie document
            Movie.findOne({ _id: req.body.id }, function (err, movie) {

                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                console.log("The Movie has been located !");

                //Once we have found the desired movie, the we simply push it's id in the movie array that's there in the actor document and save it
                actor.movies.push(movie._id);
                actor.save(function (err) {

                    if (err) return res.status(500).json(err);
                    res.json(actor);

                    console.log("Successfully added a movie to the array of the specified Actor.");

                });
            })
        });
    },

}