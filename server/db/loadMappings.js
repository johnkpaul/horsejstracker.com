var env = process.env.NODE_ENV;
var knex = require('knex')(require('./knexfile')[env]);
var Q = require('q');
var _ = require('lodash');

var mappings = require('../lib/mapping');
mappings = _.map(mappings, function(k, v){
  return {
    inspiration_tweet_id_str: _.last(k.split('/')), 
    horse_js_tweet_id_str: v
  };
});

var updates = _.map(mappings, function(obj){
  return knex('tweets')
    .where('horse_js_tweet_id_str', obj.horse_js_tweet_id_str)
    .update({'inspiration_tweet_id_str': obj.inspiration_tweet_id_str})
    .then(function(){
      console.log("ASDAKSDj", arguments);
    });

});
console.log(updates[0]);

Q.all(updates).then(function(ids){
  console.log('success with', ids);
});

