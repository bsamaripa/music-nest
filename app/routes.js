var Artist = require('./models/artist');
var Echojs = require('echojs');
var Twit = require('twit');
var FB = require('fb')
var SC = require('soundclouder');
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
/*var disc = new Discogs({});
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

// One Function to RULE DEM ALL!
//  Checks DB for existing user
//  If found, select
//  Else, Check echonest
//    If not found, ERROR OUT
//    Else Create
//  Update/fill profile
//  Return it to page
function updateArtist(userInput) {
  var thisArtist;
  var artistID; // Used inside thisArtist
  thisArtist = Artist.findOne({
    name: userInput,
  }, function(err, results) {
    if (results === null) { // If no results
      console.log(userInput + " not found locally");
      // Create empty, return id
      thisArtist = new Artist({
        name: userInput
      });
      thisArtist.save(function(err, artist) {
        artistID = artist.id;
        console.log("inside " + artistID);
      });

    } else {
      artistID = results._id;
      console.log("Results: " + results);
    }
    echoNest(userInput, artistID);

    // SCOPE ENDS HERE
  });
}

function echoNest(userInput, outputID) {
  echo('artist/search').get({
    name: userInput,
    fuzzy_match: true,
    bucket: [
      'biographies',
      'urls',
    ]
  }, function(err, json) {
    if (json.response.artists !== '') {
      console.log(json.response);
    }
  });
}

function soundcloud(userInput) {
  // All soundcloud related queries
}

function facebook(userInput) {
  // All facebook related queries

}

function twitter(userInput) {
  // All twitter related queries

}

function discogs(userInput) {
  // All discogs related queries

}

module.exports = function(app) {
  // api ---------------------------------------------------------------------
  app.get('/api/artists', function(req, res) {

    // use mongoose to get all todos in the database
    Artist.findOne({
      name: req.body.text
    }, function(err, artist) {
      console.log("GET IT!! ");
      if (err) {
        res.send(err);
        console.log("error");
      }
      res.json(artist); // return all todos in JSON format
    });
  });
  // Searches for artist
  app.post('/api/artists', function(req, res) {
    console.log("Querying DB for " + req.body.text);
    var userInput = req.body.text;
    var thisArtist;
    var artistID; // Used inside thisArtist
    thisArtist = Artist.findOne({
      name: userInput,
    }, function(err, results) {
      if (results === null) { // If no results
        console.log(userInput + " not found locally");
        // Create empty, return id
        thisArtist = new Artist({
          name: userInput
        });
        thisArtist.save(function(err, artist) {
          artistID = artist.id;
          console.log("inside " + artistID);
        });

      } else {
        artistID = results._id;
        console.log("Results: " + results);
      }
      echoNest(userInput, artistID);

      // SCOPE ENDS HERE
    });

    Artist.findOne({
      name: req.body.text
    }, function(err, artist) {
      if (err) {
        res.send(err);
        console.log("error");
      }
      res.json(artist);
    });
  });

  // application  ------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
