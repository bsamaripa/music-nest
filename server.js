var express			= require('express');
var morgan			= require('morgan');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var app 			= express();

var mongo 			= require('mongoose');
var port 			= process.env.PORT || 8080;
var db 				= ".musicnest";

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.listen(3000);
console.log('Listening on port 3000');