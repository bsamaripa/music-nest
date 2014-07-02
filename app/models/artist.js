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
  aliases: [alias],
});

var alias = new mongoose.Schema({
  name: String,
  aliasID: String,
  aliasEchoID: String
});

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
