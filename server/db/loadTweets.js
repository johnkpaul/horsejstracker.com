var env = process.env.NODE_ENV;
var knex = require('knex')(require('./knexfile')[env]);
var Q = require('q');

var twitGet = require('../lib/twitGet');
knex.select('*').from('tweets').orderBy('horse_js_tweet_id_str', 'desc').limit(1).then(function(rows){
  if (rows.length === 0){
    return '491729185514061824';
  } 
  else{
    return rows[0].horse_js_tweet_data.id_str;
  }
}).then(function(since_id){

  return twitGet('/statuses/user_timeline.json', {screen_name: 'horse_js', count: 50, include_rts: 0, since_id: since_id})

}).then(function(tweets) { 
  return Q.all(tweets.map(function(tweet){
    return knex('tweets').insert({
      horse_js_tweet_id_str: tweet.id_str,
      horse_js_tweet_data: tweet
    });
  }));
}).done(function(){
  process.exit(0);
}, function(err){
  console.log("twitter get failed", err);
});

