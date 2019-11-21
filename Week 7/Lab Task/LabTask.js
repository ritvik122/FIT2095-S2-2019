//Importing packages
const mongoose = require('mongoose');
const express = require("express");
const bodyparser = require('body-parser');
const morgan = require('morgan');

//Configure Express
const app = express() //creating an instance of the express application
app.engine('html', require('ejs').renderFile); // app.engine(fileFormat, functionToBeCalledForRendering)
app.set('view engine', 'html'); // //app.set tells the application to use a template engine and which template engine to use and in this case it happens to be html ie. (templateEngine: whichTemplateEngine)
app.use(express.static('public')); //setting up the static directories
app.use(bodyparser.urlencoded({
    extended: false
})); //adding the body parser middleware to our application
app.use(morgan('common')); //specifying the format in which we want to have the HTTP log request

//accessing our schemas
const Developer = require('./models/developerSchema');
const Task = require('./models/taskSchema');

//specifying the url address of our server (mongodb://ServerAddress: Port//DbName)
let url = 'mongodb://localhost:27017/devDB';

//setting up the static directories
app.use(express.static('images'));
app.use(express.static('css'));

//connecting to our server
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },

    function (err) {

        if (err) {
            console.log('Error in Mongoose connection');
            throw err;
        }

        console.log('Successfully connected');

        //Route Handlers

        ///////////////////////////////////////////// //to handle the request for the home page/////////////////////////////////////////////
        app.get('/', function (req, res) {
            res.render('index.html');
        });

        ///////////////////////////////////////////// To handle add new task request ///////////////////////////////////////////// add new developer request /////////////////////////////////////////////

        //to handle add new task request
        app.get('/newtask', function (req, res) {

            res.render('addNewTask.html');
        });

        //to handle add new task data
        app.post('/taskdata', function (req, res) {

            let taskDetails = req.body;
            let randomGeneratedTaskID = Math.floor(Math.random() * Math.floor(1000));

            Developer.find().exec(function(err, data) {

                let numberOfDev = data.length;

                //if there are no developers in the database then just store the task without any developer id
                if (numberOfDev == 0)
                {
                    let taskInstance = new Task({
                        _id: new mongoose.Types.ObjectId(),
                        TaskID: randomGeneratedTaskID,
                        Name: taskDetails.TaskName,
                        DueDate: taskDetails.TaskDue,
                        Status: taskDetails.TaskStatus,
                        Desc: taskDetails.TaskDes
                    });

                    //saving the task instance
                    taskInstance.save(function (err) {
                        if (err) throw err;
                        res.redirect('/listtasks');
                    });
                }

                //if there are developers in the database then just store the task with the developer id
                else
                {
                    let randomDev = Math.floor(Math.random() * numberOfDev);

                    let taskInstance = new Task({
                        _id: new mongoose.Types.ObjectId(),
                        TaskID: randomGeneratedTaskID,
                        AssignTo: data[randomDev]._id,
                        Name: taskDetails.TaskName,
                        DueDate: taskDetails.TaskDue,
                        Status: taskDetails.TaskStatus,
                        Desc: taskDetails.TaskDes
                    });

                    //saving the task instance
                    taskInstance.save(function (err) {
                        if (err) throw err;
                        res.redirect('/listtasks');
                    });

                }

            });

        });

        ///////////////////////////////////////////////////////// add new developer request /////////////////////////////////////////////

         //to handle add new developer request
         app.get('/newdeveloper', function (req, res) {

            res.render('addNewDeveloper.html');
        });

        //to handle add new developer data
        app.post('/Devdata', function (req, res) {

            let DevDetails = req.body;
            let devInstance = new Developer({
                _id: new mongoose.Types.ObjectId(),
                Name: {
                    firstName: DevDetails.firstName,
                    lastName: DevDetails.lastName
                },

                Level: DevDetails.level,

                Address: {
                    State: DevDetails.state,
                    Suburb: DevDetails.suburb,
                    Street:DevDetails.street,
                    Unit: DevDetails.unit
                }

            });

            devInstance.save(function (err) {

                if (err) throw err;
                res.redirect('/listtasks');
            });

        });

        ///////////////////////////////////////////////Update Task Handling below/////////////////////////////////////////////

        //to handle delete task request
        app.get('/updateTask', function (req, res) {

            res.render('updateTask.html');
        });

        //to hanlde the data for delete task request
        app.post('/updateTaskData', function (req, res) {

            let userDetails = req.body;
            let filter = {
                'TaskID': userDetails.id
            };
            let update = {
                status: userDetails.status
            };
            update.status = update.status.toUpperCase();

            if (update.status === "COMPLETE") {
                Task.deleteOne(filter, function(err, result){
                    if (err) throw err;
                    console.log("1 Document Deleted: "+ result);
                });
            }
            res.redirect('/listtasks');

        });


        /////////////////////////////////////////////// List all Task handling below ///////////////////////////////////////////// and Developer handling below/////////////////////////////////////////////

        //to handle list all developer request
        app.get('/listdev', function (req, res) {

            Developer.find().exec(function (err, data) {
                res.render('listAllDev.html', {
                    db: data
                });
            });
        });

        ///////////////////////////////////////////// List all Developers handling below /////////////////////////////////////////////

        //to hanlde list all task request
        app.get('/listtasks', function (req, res) {

            Task.find().exec(function (err, data) {
                res.render('listAllTask.html', {
                    db: data
                });

            });
        });

    });

app.listen(8080);
