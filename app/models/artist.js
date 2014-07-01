var mongoose = require('mongoose');

//  Defines the template all artists are stored as
var artistSchema = mongoose.Schema({
  name: String,
  echonestID: String,
  artistDesc: String,
  artistPic: String,
  facebookID: String,
  twitterID: String,
  soundcloudID: String,
  twitterURL: String,
  facebookURL: String,
  soundcloudURL: String,
  relatedArtists: Array,
});

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
