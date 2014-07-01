var Artist = require('./models/artist');
var Echojs = require('echojs');
var SC = require('soundclouder');
var Twit = require('twit');
var Discogs = require('discogs');

var echo = new Echojs({
  key: 'EME9AVQQ0MNGJXEP1'
});
var twit = new Twit({
  consumer_key: 'th59UDh4FWWvVK3GHJFhYrCLR',
  consumer_secret: 'tv1afS4lcLuKiPkeEN2NqBZDp21UMM1vYiwfqu3GtYx23QDGg7',
  access_token: '17489216-Rzd3LvcnzZelpY9Xbnn6u3F5CW2Nifjci0wDiSRf0',
  access_token_secret: '0KQ8u8cOlz1PdcncWysO9NeCRfrGH0JxFZadmdOLxbXLl'
});
var disc = new Discogs({});
/*
disc.search('porter robinson', artist, function(err, artist) {
  console.log(artist.searchresults.results[1]);
});*/

//  Functions to work with local Database and APIs
function resolveArtistName(userInput) {
  //echo('artist/biographies')
  //REFACTOR THIS SHIT ASAP!
  // Break up into variables, then set all at once at end
  // Make this the one create/update function
  var output;
  echo('artist/search').get({
    name: userInput,
  }, function(err, json) {
    // Search id used in everything below
    var searchID = json.response.artists[0].id;
    echo('artist/profile').get({
      id: searchID,
      bucket: ['id:facebook', 'id:twitter']
    }, function(err, json) {
      output = json.response.artist;
      console.log(searchID);
      Artist.update({
        echonestID: searchID
      }, {
        name: json.response.artist.name,
        echonestID: searchID,
        facebookID: json.response.artist.foreign_ids[0].foreign_id,
        twitterID: json.response.artist.foreign_ids[1].foreign_id
      }, {
        upsert: true
      });
      console.log(Artist.echonestID);
      Artist.find(function(err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
      });
    });
  });
}
resolveArtistName('porter robinson');

function wrangler(userInput) {
  var temp = resolveArtistName(userInput);
  createArtist(temp);
  Artist.find(function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
}

function createArtist(userInput) {
  console.log(userInput);
  Artist.create({
    name: userInput.artist.name,
    echonestID: searchID,
    facebookID: userInput.artist.foreign_ids[0].foreign_id,
    twitterID: userInput.artist.foreign_ids[1].foreign_id
  });
}

function updateArtist(userInput) {
  var name = echo
}

module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all artists
  app.get('/api/artist', function(req, res) {
    // use mongoose to get all artists in the database
    Artist.find(function(err, artists) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      res.json(artists); // return all artists in JSON format
    });
  });
  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

    // create an artist
    Artist.create({
      text: req.body.text,
      done: false
    }, function(err, todo) {
      if (err)
        res.send(err);
    });
  });

  // delete an artist
  app.delete('/api/artist/:artist_id', function(req, res) {
    artist.remove({
      _id: req.params.artist_id
    }, function(err, artist) {
      if (err)
        res.send(err);
      // get and return all the artists after you create another
      Artist.find(function(err, artists) {
        if (err)
          res.send(err)
        res.json(artists);
      });
    });
  });

  // application  ------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
