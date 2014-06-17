/*
    server.js: contains all of the node configuration.
    as well as the database information
*/

var express = require('express');
var app = express();
var mongo = require('mongoose');

mongo.connect('mongodb://admin:48W_-Enjw_E-@127.6.219.2:27017');



app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000);