require('dotenv').config()
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = require('./router/router.js');
// var models = require('./models/models.js');
var fileUpload = require('express-fileupload');
var sessions = require('./sessions.js');


var app = express();
var IP = process.env.IP || 'localhost';
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, '../public')));

app.use(sessions(process.env.REDIS_URL, process.env.COOKIE_SECRET));

app.use(router);


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, function () {
  console.log('listening to port', port);
});
