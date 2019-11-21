var mongoose = require('mongoose'); 


let taskSchema = mongoose.Schema({

    TaskID:{

        type: Number,
        required: true

    },

    Name: {
        type: String, 
        required: true 
    },

    AssignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer' 
        
    },

    DueDate: 
    {
        type: Date, 
        required: true
    },

    Status:
    {
        type: String,
        required: true
    },

    Desc:
    {
        type: String
    }
});


module.exports = mongoose.model('tasks', taskSchema); //the first argument is the name of the model and the second argument is the reference to the schema