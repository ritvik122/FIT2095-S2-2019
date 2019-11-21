let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

let db = []

//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//setting up the static directories
app.use(express.static('images'));
app.use(express.static('css'));


//to handle the request for the home page
app.get('/', function (req, res) {

    res.sendFile(__dirname+'/index.html');

});

//to hanlde new task request
app.get('/newtask', function (req, res) {

    res.sendFile(__dirname+'/addNewTask.html');

});

//to handle post request
app.post('/data', function (req, res) {

    let myObj = {

        name: req.body.TaskName,
        date: req.body.TaskDue,
        des: req.body.TaskDes

    };

    db.push(myObj);

})

//to hanlde list task request
app.get('/listtasks', function (req, res) {

    res.render('listAllTask.html', {db: db});

})

app.listen(8080);