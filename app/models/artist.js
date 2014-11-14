// artist.js
//================== Variables ================================================
var mongoose = require('mongoose');

//================== Artist Schema ============================================
var artistSchema = mongoose.Schema({
  name:             String,
  echonestID:       String,
  artistDesc:       String,
  artistPic:        String,
  facebookID:       String,
  twitterID:        String,
  soundcloudID:     String,
  twitterURL:       String,
  facebookURL:      String,
  soundcloudURL:    String,
  relatedArtists:   Array,
  aliases:          [alias]
});

//================== Artist Alias Structure ===================================
var alias = new mongoose.Schema({
  name:         String,
  aliasID:      String,
  aliasEchoID:  String
});

//================== Export Schema ============================================
var Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
