var env = process.env.NODE_ENV;
var knex = require('knex')(require('./knexfile')[env]);

var twitGet = require('../lib/twitGet');
twitGet('/statuses/user_timeline.json', {screen_name: 'horse_js', count: 40, include_rts: 0})
         .then(function(data) {
            return data.map(function(tweet){
              return knex('tweets').insert({
                horse_js_tweet_id_str: tweet.id_str,
                horse_js_tweet_data: tweet
              });
            });
          }).done(null, function(err){
            console.log("twitter get failed", err);
          });

