var Actor = require('../models/actor');
var Movie = require('../models/movie');

const mongoose = require('mongoose');

module.exports = {

    //This function get's the entire movie collection
    getAll: function (req, res) {

        Movie.find({}).populate("actors").exec(function (err, actor) {
            if (err) return res.json(err);
            if (!actor) return res.json();
            res.json(actor);
        });
    },

    //This function creates a new document in the movie collection
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },

    //This function uses the movie model in order to retrieve the movie using it's id and then we populate the actor field of that movie with all the all the movie document
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },

    //This function updates update the document in the movie collection
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    //This function deletes the movie on the basis of the provided id
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    //This function adds the specified actor to the actor array of the movie document
    addSpecifiedActor: function(req, res){

        //Here we are finding the desired movie document
        Movie.findOne({ _id: req.params.id }, function (err, movie) {

            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            console.log("The Movie has been located !")

            //Here we are the desired actor document
            Actor.findOne({ _id: req.body.id }, function (err, actor) {

                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                console.log("The Actor has been located !");

                //Once we have found the desired movie, the we simply push it's id in the movie array that's there in the actor document and save it
                movie.actors.push(actor._id);
                movie.save(function (err) {

                    if (err) return res.status(500).json(err);
                    res.json(movie);

                    console.log("Successfully added a Actor to the actor array of the specified Movie.");
    
                    });
                })
        });
    },

    //In order to remove the specified actor from the actor array of the movie document
    removeSpecifiedActorFromActorsArray: function(req, res)
    {
        Movie.findOne({ _id: req.params.id }, function (err, movie){

            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            console.log("The specified movie has been located !");

            let actorToBeDeleted = req.params.actorid;
            let actorArray = movie.actors;

            for(i=0 ; i < actorArray.length ; i++)
            {
                if (actorToBeDeleted == String(actorArray[i]))
                {
                    actorArray.splice(i, 1);
                }
            }

            movie.actors = actorArray;
            movie.save(function (err) {

                if (err) return res.status(500).json(err);
                res.json(movie);

                console.log("Successfully deleted the specified actor from the actor array of the movie document.");

            });

        });
    },

    //To get all the movies between the specified period
    getAllTheMoviesBetweenSpecifiedPeriod: function(req, res)
    {
        let year1 = Number(req.params.year1);
        let year2 = Number(req.params.year2);
        Movie.find({year: {$gt: year2, $lt: year1}}, function(err, movie) {

            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            console.log("All the movies between the specific range has been located !");

            res.json(movie);

        })
    },

    //Increment the year by 7 of those movies which have been produced after 1995
    incrementTheYearOfTheMovies: function(req, res)
    {

        Movie.updateMany({year: {$gt: 1995}}, {$inc:7} , function (err, movie){

            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            console.log(movie)
            
            movie.save(function (err) {

                if (err) return res.status(500).json(err);
                res.json(movie);

                console.log("Successfully incremented the year of all the movies produced after 1995.");

            });

        });

    }
};