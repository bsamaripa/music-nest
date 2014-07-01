var Artist = require('./models/artist');
var Echojs = require('echojs');
var SC = require('soundclouder');
var Twit = require('twit');
var wait = require('wait.for');

var echo = new Echojs({
  key: 'EME9AVQQ0MNGJXEP1'
});
var twit = new Twit({
  consumer_key: 'th59UDh4FWWvVK3GHJFhYrCLR',
  consumer_secret: 'tv1afS4lcLuKiPkeEN2NqBZDp21UMM1vYiwfqu3GtYx23QDGg7',
  access_token: '17489216-Rzd3LvcnzZelpY9Xbnn6u3F5CW2Nifjci0wDiSRf0',
  access_token_secret: '0KQ8u8cOlz1PdcncWysO9NeCRfrGH0JxFZadmdOLxbXLl'
});

function resolveArtistName(userInput) {
  echo('artist/search').get({
    name: userInput,
  }, function(err, json) {
    // Search id used in everything below
    var searchID = json.response.artists[0].id;

    echo('artist/profile').get({
      id: searchID,
      bucket: ['id:facebook', 'id:twitter']
    }, function(err, json) {
      console.log(json.response.artist.foreign_ids[1].foreign_id);
      Artist.create({
        name: json.response.artist.name,
        echonestID: searchID,
        //facebookID: json.response.artist.foreign_ids[0].foreign_id,
        //twitterID: json.response.artist.foreign_ids[1].foreign_id
      });
      //  Outputs the current set of artists
      Artist.find(function(err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
      });
    });
  });
}
resolveArtistName('eric prydz');

function updateArtist(userInput) {
  // Use this to update existing artist object
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
