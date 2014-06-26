var Echojs = require('echojs');
var SC = require('soundclouder');

//  Echo Nest
var echo = new Echojs({
    key: 'EME9AVQQ0MNGJXEP1'
});

echo('artist/search').get({
  name: 'dillon francis',
}, function (err, json) {
	var searchID = json.response.artists[0].id;
	console.log(searchID);
	echo('artist/profile').get({
	  id: searchID,
	  bucket: ['id:facebook', 'id:twitter']
	}, function (err,json) {
		console.log(json.response.artist);
	});




  // All before here
});
// Sound Cloud
var sc_client_id = 'fbadd9967f4268152fc4d886e04d0d00';
var sc_client_secret = '97068322988badc778a8377d99f9f282';
var sc_redirect_url = 'https://github.com/bsamaripa/social-nest';
SC.init(sc_client_id, sc_client_secret, sc_redirect_url);

SC.get('/users', {q:'dillon francis'}, function(users) {
	console.log(users);
});
