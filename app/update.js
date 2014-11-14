// update.js
//================== Echonest Fetch ===========================================
module.exports = function(app) {
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
};
