var twitGet = require('../lib/twitGet');
var appendOembed = require('../lib/append-oembed');
var Q = require('q');
var _ = require('lodash');
var knex = require('../lib/knex');
var getOembed = require('../lib/get-oembed');
var saveOembed = require('../db/save-oembeds');

module.exports = function(app) {
  var express = require('express');
  var tweetsRouter = express.Router();
  tweetsRouter.get('/', function(req, res) {
    knex('tweets').select('*')
      .orderBy('horse_js_tweet_id_str', 'desc')
      .limit(10)
      .then(function(tweets){
        var response = tweets.map(function(row){
           if(!row.horse_js_tweet_oembed || (row.horse_js_tweet_oembed.statusCode == "429")){
             var horseOembed = getOembed(row.horse_js_tweet_id_str);
           }
           if(row.inspiration_tweet_id_str && (!row.inspiration_tweet_oembed || row.inspiration_tweet_oembed.statusCode == "429")){
             var inspirationOembed = getOembed(row.inspiration_tweet_id_str);
           }
           return Q.all([horseOembed, inspirationOembed])
             .then(function(oembeds){
               saveOembeds(oembeds, row.horse_js_tweet_id_str);
               var tweet = row.horse_js_tweet_data;
               tweet.inspirationOembed = oembeds[1] || row.inspiration_tweet_oembed || {};
               tweet.originalOembed = oembeds[0] || row.horse_js_tweet_oembed || {};
               return tweet;
             })
        })

        Q.all(response).then(function(tweets){
          res.send({tweets: tweets});
        });

    });
              
  });
  app.use('/api/tweets', tweetsRouter);
};

function saveOembeds(oembeds, horse_js_tweet_id_str){
  var saveOembeds = require('../db/save-oembeds');
  if(oembeds[0]) {
    saveOembed(horse_js_tweet_id_str, 'horse_js', oembeds[1]);
  }
  if(oembeds[1]) {
    saveOembed(horse_js_tweet_id_str, 'inspiration', oembeds[1]);
  }
}
