let express = require('Express');
let app = express();
let router = require('./LabTask.js');

app.use('/',router);

app.listen(8080);