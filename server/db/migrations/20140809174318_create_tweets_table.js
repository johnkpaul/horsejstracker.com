'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('tweets', function(table){
    table.string('horse_js_tweet_id_str').primary().index().unique();
    table.json('horse_js_tweet_data');
    table.json('horse_js_tweet_oembed');

    table.string('inspiration_tweet_id_str');
    table.json('inspiration_tweet_data');
    table.json('inspiration_tweet_oembed');

  }).then(function(){});
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('tweets').then(function(){});
};
