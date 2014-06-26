var express			= require('express');
var morgan			= require('morgan');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var app 			= express();

var port 			= process.env.PORT || 8080;
var mongo 			= require('mongoose');
var db 				= "./config/db";

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

//mongo.connect(db.url);

app.listen(3000);
console.log('Listening on port 3000');