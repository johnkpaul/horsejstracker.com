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
    getTweets()
      .then(fillOembeds)
      .then(function(tweets){
        res.send({tweets: tweets});
      });;
              
  });
  app.use('/api/tweets', tweetsRouter);
};

function getTweets(){
    return knex('tweets').select('*')
      .orderBy('horse_js_tweet_id_str', 'desc')
      .limit(50);
}

function fillOembeds(tweets){
  return Q.all(tweets.map(function(tweet){
    var horse_js_tweet_oembed = getHorseJSTweetOembed(tweet);
    var inspiration_tweet_oembed = getInspirationTweetOembed(tweet);
    return Q.all([horse_js_tweet_oembed, inspiration_tweet_oembed])
            .then(function(oembeds){
              tweet.horse_js_tweet_oembed = oembeds[0];
              tweet.inspiration_tweet_oembed = oembeds[1];
              return tweet;
            });
  }));
}

function getHorseJSTweetOembed(tweet){
  if (tweet.horse_js_tweet_oembed){
    return Q(tweet.horse_js_tweet_oembed);
  }
  else{
    var oembed = getOembed(tweet.horse_js_tweet_id_str);
    return oembed.then(function(data){
      if(data.statusCode == "429") { return; }
      saveOembed(tweet.horse_js_tweet_id_str, 'horse_js', data);
      return data;
    });
  }
}

function getInspirationTweetOembed(tweet){
  if (tweet.inspiration_tweet_oembed.html){
    return Q(tweet.inspiration_tweet_oembed);
  }
  else{
    var oembed = getOembed(tweet.inspiration_tweet_id_str);
    return oembed.then(function(data){
      if(data && data.statusCode != "429"){
        saveOembed(tweet.horse_js_tweet_id_str, 'inspiration', data);
        return data;
      }
      else{
        return {};
      }
    });
  }
}
