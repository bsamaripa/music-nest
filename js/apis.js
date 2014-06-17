var Twit = require('twit');
var sc = require('soundclouder');
var Echojs = require('echojs');
var request = require('request');
var fs = require('fs');


//  Twitter
var twitter = new Twit({
    consumer_key: 'th59UDh4FWWvVK3GHJFhYrCLR',
    consumer_secret: 'tv1afS4lcLuKiPkeEN2NqBZDp21UMM1vYiwfqu3GtYx23QDGg7',
    access_token: '17489216-Rzd3LvcnzZelpY9Xbnn6u3F5CW2Nifjci0wDiSRf0',
    access_token_secret:'0KQ8u8cOlz1PdcncWysO9NeCRfrGH0JxFZadmdOLxbXLl'
});

//  Echo Nest
var echo = new Echojs({
    key: 'EME9AVQQ0MNGJXEP1'
});

// Echo Nest
var sc_client_id = 'fbadd9967f4268152fc4d886e04d0d00';
var sc_client_secret = '97068322988badc778a8377d99f9f282';
var sc_redirect_url = 'https://github.com/bsamaripa/social-nest';
sc.init(sc_client_id, sc_client_secret, sc_redirect_url);
sc.auth( code, function (error, access_token) 
{
    if(error) 
    {
        console.error(e.message);
    } 
    else 
    {
        console.log('access_token=' + access_token );
    }
});

twitter.get('followers/ids', { screen_name: 'byronsamaripa' },  function (err, data, response) { console.log(data) });

echo('song/search').get({
  artist: 'radiohead',
  title: 'karma police'
}, function (err, json) {
  console.log(json.response);
});