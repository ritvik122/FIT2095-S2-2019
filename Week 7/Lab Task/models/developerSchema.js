var mongoose = require('mongoose');

let developerSchema = mongoose.Schema({

    Name: {

        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },

    Level: {

        type: String,
        validate: {
            validator: function (devLevel) {
                return devLevel == 'BEGINNER' || devLevel == 'EXPERT';
            },
            message: 'Invalid input for the level !'
        }

    },

    Address: {

        State: {
            type: String
        },
        Suburb: {
            type: String
        },
        Street: {
            type: String
        },
        Unit: {
            type: String
        },
    }
});

module.exports = mongoose.model('developers', developerSchema); //the first argument is the name of the model and the second argument is the reference to the schema