var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var dbconf = require('./config/db');

//  Database Connection
mongoose.connect(dbconf.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connected to MongoDB!");
});

//  Express File Handling
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

//  Routes
require('./app/routes')(app);

app.listen(port);
console.log('Listening on port ' + port);
