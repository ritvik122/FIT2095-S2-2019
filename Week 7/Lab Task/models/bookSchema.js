var mongoose = require('mongoose'); //importing the mongoose module

let bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    title: {
        type: String,
        required: true
    },
    isbn: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,//object id dataype is used here because we want to refer to the author's document
        ref: 'TestingAuthor' //the ref field is used when we want to provide the reference to a schema
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//we use the module.exports in order to export the mongoose model / schema
module.exports = mongoose.model('TestingBook', bookSchema); //the first argument is the name of the model and the second argument is the reference to hte schema
