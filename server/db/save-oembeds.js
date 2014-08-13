var Q = require('q');
var _ = require('lodash');
var knex = require('../lib/knex');

module.exports = function(horse_js_tweet_id_str, type, data){
  var update = {};
  update[type + '_tweet_oembed'] = data;

  return knex('tweets')
    .where('horse_js_tweet_id_str', horse_js_tweet_id_str)
    .update(update)
    .then(function(){
      return this;
    });
}
