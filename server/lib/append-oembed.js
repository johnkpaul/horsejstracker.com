var twit = require('./twit');
var mapping = require('./mapping');
var q = require('q');
var _ = require('lodash');
var util = require('util');

var getOembed = function(tweet_id){
  var def = q.defer(); 
  if(tweet_id){
    twit.get('/statuses/oembed.json', {id: tweet_id}, function(data) {
      def.resolve(data);
    });
  }
  else{
    def.resolve({});
  }
  return def.promise;
}

getOembed = _.memoize(getOembed);

module.exports = function(tweets){

  var oEmbedRequests = tweets.map(function(tweet){
     var inspiration = mapping[_.last(tweet.id_str.split('/'))];
     if(inspiration){
       tweet.inspiration_id_str = _.last(inspiration.split('/'));
     }
     return tweet;
  }).map(function(tweet){
    return q.all([getOembed(tweet.inspiration_id_str), getOembed(tweet.id_str)])
            .spread(function(inspirationOembed, originalOembed){
              tweet.inspirationOembed = inspirationOembed;
              tweet.originalOembed = originalOembed;
              return tweet;
            });
  });
  
  return q.all(oEmbedRequests);
}

