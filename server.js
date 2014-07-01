var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var dbconf = require('./config/db')
var Echojs = require('echojs');
var SC = require('soundclouder');

//  Database Connection
mongoose.connect(dbconf.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connected to MongoDB!");
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

//require('./app/routes.js')(app);

app.listen(port);
console.log('Listening on port ' + port);
