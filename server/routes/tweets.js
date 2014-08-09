var twit = require('../lib/twit');
var appendOembed = require('../lib/append-oembed');

module.exports = function(app) {
  var express = require('express');
  var tweetsRouter = express.Router();
  tweetsRouter.get('/', function(req, res) {
    twit.get('/statuses/user_timeline.json', 
             {screen_name: 'horse_js', count: 20, include_rts: 0}, 
              function(data) {
                  appendOembed(data).then(function(data){
                    res.send({tweets: data});
                  }).done(null, function(err){
                    console.log("Appending failed", err);
                  });
              });
  });
  app.use('/api/tweets', tweetsRouter);
};
