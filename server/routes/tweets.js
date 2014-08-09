var twitGet = require('../lib/twitGet');
var appendOembed = require('../lib/append-oembed');

module.exports = function(app) {
  var express = require('express');
  var tweetsRouter = express.Router();
  tweetsRouter.get('/', function(req, res) {
    twitGet('/statuses/user_timeline.json',{screen_name: 'horse_js', count: 40, include_rts: 0})
             .then(function(data) {
                  appendOembed(data).then(function(data){
                    res.send({tweets: data});
                  }).done(null, function(err){
                    console.log("Appending failed", err);
                  });
              }).done(null, function(err){
                console.log("twitter get failed", err);
              });
              
  });
  app.use('/api/tweets', tweetsRouter);
};
