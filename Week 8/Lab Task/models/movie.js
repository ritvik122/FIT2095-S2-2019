const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    //Here we are refering to the Actor collection and in this manner each movie document can refer to a set of actors
    actors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});
module.exports = mongoose.model('Movie', movieSchema);