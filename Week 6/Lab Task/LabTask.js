
//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const morgan = require('morgan');

//Configure Express
const app = express() //creating an instance of the express application
app.engine('html', require('ejs').renderFile);// app.engine(fileFormat, functionToBeCalledForRendering)
app.set('view engine', 'html'); // //app.set tells the application to use a template engine and which template engine to use and in this case it happens to be html ie. (templateEngine: whichTemplateEngine)
app.use(express.static('public')); //setting up the static directories
app.use(bodyparser.urlencoded({ extended: false })); //adding the body parser middleware to our application
app.use(morgan('common')); //specifying the format in which we want to have the HTTP log request
app.listen(8080);

//Configure MongoDB (creating an instance of MongoDB client)
const MongoClient = mongodb.MongoClient;

// Connection URL (Defining the location and the port number of the server)
const url = "mongodb://localhost:27017/";

//setting up the static directories
app.use(express.static('images'));
app.use(express.static('css'));

//reference to the database (i.e. collection)
let db;

// url : server’s URL, which is a local server listening at port 27017 (MongoDB's default port)
// {useNewUrlParser: true}: object required for the latest version of MongoDB
//callback function: executed when the connect operation finishes. If there's an error then err parameter returns error code and if there are no errors then we use the client
//parameter to access the databas. In the below case we will connect to database namely 'fit2095tabe'

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("Week6LabTask");
        }
    });


//Route Handlers

//to handle the request for the home page
app.get('/', function (req, res) {

    res.render('index.html');

});

//to handle add new task re quest
app.get('/newtask', function (req, res) {

    res.render('addNewTask.html');

});

//to handle add new task request
app.post('/data', function (req, res) {

    let userDetails = req.body;
    let taskID = Math.floor(Math.random() * Math.floor(1000));

    db.collection('users').insertOne({ 

        id: taskID,
        name: userDetails.TaskName, 
        assign: userDetails.assign, 
        dueDate: userDetails.TaskDue,
        status: "In Progress",
        description: userDetails.TaskDes});

    res.redirect('/listtasks'); // redirect the client to list users page

});

//to hanlde list all task request
app.get('/listtasks', function (req, res) {

    //db.collection creates new collection if the givne collection doesn't exist
    db.collection('users').find({}).toArray(function (err, data) {
        res.render('listAllTask', { db: data });
    });

});

//to handle delete task request
app.get('/updateTask', function (req, res) {

    res.render('updateTask.html', {db: db});

});

//to hanlde the data for delete task request 
app.post('/updateTaskData', function(req, res){

    let userDetails = req.body;
    let filter = { id: userDetails.id };
    let update = {status: userDetails.status};
    update.status = update.status.toUpperCase();

    filter.id = parseInt(filter.id, 10);

    if (update.status === "COMPLETE")
    {
        db.collection('users').deleteOne(filter, function(err, result){
            if (err) throw err;
            console.log("1 Document Deleted: "+ result);
        });
    }

    res.redirect('/listtasks');

});
