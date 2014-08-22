var Artist = require('./models/artist');
var Keys = require('../config/apis'); //  File for API Keys, get your own!
var Echojs = require('echojs');
var Twit = require('twit');
var assert = require('chai').assert;
//var FB = require('fb');
//var SC = require('soundclouder');
//var Discogs = require('discogs');

var echo = new Echojs({
  key: Keys.echoKey
});
var twit = new Twit({
  consumer_key: Keys.twConsumerKey,
  consumer_secret: Keys.twConsumerSecret,
  access_token: Keys.twAccessToken,
  access_token_secret: Keys.twAccessTokenSecret
});

function echoNest(userInput, outputID) {
  echo('artist/search').get({ // Profile Search
    name: userInput,
    fuzzy_match: true
  }, function(err, json) {
    if (json.response.artists !== '') {
      console.log("Response from Echonest!");
      var searchID = json.response.artists[0].id;
      echo('artist/profile').get({
        id: searchID,
        bucket: [
          'biographies',
          'urls',
          'images',
        ]
      }, function(err, json) {
        // Updates artist in DB
        console.log("Updating artist...");
        Artist.update({
          _id: outputID
        }, {
          echonestID: searchID,
          artistPic: json.response.artist.images[0].url,
        }, Artist.find(function(err, kittens) {
          console.log("Updated!");
          if (err) return console.error(err);
        }));
      });
    }
  });
}

module.exports = function(app) {
  // api ---------------------------------------------------------------------
  app.get('/api/v1/artists', function(req, res) {

    // use mongoose to get all todos in the database
    Artist.find(function(err, artist) {
      if (err) {
        res.send(err);
        console.log("error");
      }
      res.json(artist); // return all todos in JSON format
    });
  });

  // Searches for artist
  app.post('/api/v1/artists', function(req, res) {
    console.log("Querying DB for " + req.body.text);
    var userInput = req.body.text;
    var thisArtist;
    var artistID; // Used inside thisArtist

    // Queries echonest for artist name, used internally always
    echo('artist/search').get({ // Profile Search
      name: userInput,
      fuzzy_match: true
    }, function(err, json) {
      if (JSON.stringify(json.response.artists) === '[]') {
        //  Checks if artists category is valid
        console.log("Bad Search terms");
        return new Error("Echonest failed to find " + userInput);
      }
      var artistName = json.response.artists[0].name;
      thisArtist = Artist.findOne({
        name: artistName,
      }, function(err, results) {
        if (results === null) { // If no results
          console.log("Not Found: " + userInput + " not found locally");
          // Create empty, return id
          echo('artist/search').get({ // Profile Search
            name: userInput,
            fuzzy_match: true
          }, function(err, json) {
            if (json.response === undefined) {
              console.log("Bad Search terms");
              return new Error("Echonest failed to find " + userInput);
            }
            if (json.response.artists !== '') {
              console.log("Response from Echonest!");
              var searchID = json.response.artists[0].id;
              echo('artist/profile').get({
                id: searchID,
                bucket: [
                  'biographies',
                  'urls',
                  'images',
                  'id:facebook',
                  'id:twitter'
                ]
              }, function(err, json) {
                // Artist should be valid before you get here
                var fb = json.response.artist.foreign_ids[1];
                console.log("Facebook: " + fb);
                thisArtist = new Artist({
                  name: json.response.artist.name,
                  echonestID: searchID,
                  artistPic: json.response.artist.images[0].url,
                  artistDesc: json.response.artist.biographies[0].text,
                  facebookURL: "http://www.facebook.com",
                  twitterURL: "http://www.twitter.com/",
                  soundcloudURL: "http://www.soundcloud.com"
                }, echoNest(userInput, artistID));
                thisArtist.save(function(err, artist) {
                  artistID = artist.id;
                  console.log("Creating new entry for " + userInput);
                });
              });
            }
          });

        } else {
          artistID = results._id;
          console.log("Updating entry! " + artistID);
          echoNest(userInput, artistID);
        }

        Artist.findById(artistID, function(err, artist) {
          if (err) {
            res.send(err);
            console.log("error");
          }
          res.json(artist);
        });
      });
    });
  });

  // application  ------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
