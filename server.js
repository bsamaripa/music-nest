// server.js
//================== Variables ================================================
var express         = require('express'),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    mongoose        = require('mongoose'),
    dbconf          = require('./config/db'),
    app             = express();
    port            = process.env.PORT || 3000;

//================== Database Handling ========================================
mongoose.connect(dbconf.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connected to MongoDB!");
});

//================== File Handling ============================================
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

//================== Routes ===================================================
require('./app/routes')(app);

//================== Server ===================================================
app.listen(port);
console.log('Listening on port ' + port);
exports = module.exports = app;
