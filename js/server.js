/*
    server.js: contains all of the node configuration.
    as well as the database information
*/

var express = require('express');
var app = express();
var mongo = require('mongoose');
var dbName = "/mytest";
var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;

mongo.connect(connection_string);



app.get('*', function(req, res) {
	res.sendfile('../index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000);
