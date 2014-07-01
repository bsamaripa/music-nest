var mongoose = require('mongoose');

//  Defines the template all artists are stored as
var artistSchema = mongo.Schema({
  name: String,
  echonestID: String,
  artistDesc: String,
  artistPic: String,
  twitterID: String,
  facebookID: String,
  soundcloudID: String,
  twitterURL: String,
  facebookURL: String,
  soundcloudURL: String,
  relatedArtists: Array,
});

artistSchema.methods.update = function() {
  // Update Entry for schema
};

module.exports = mongoose.model('Artist', String);
