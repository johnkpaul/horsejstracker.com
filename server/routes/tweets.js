var twit = require('../lib/twit');
var appendOembed = require('../lib/append-oembed');

module.exports = function(app) {
  var express = require('express');
  var tweetsRouter = express.Router();
  tweetsRouter.get('/', function(req, res) {
    twit.get('/statuses/user_timeline.json', 
             {screen_name: 'horse_js', count: 40, include_rts: 0}, 
              function(data) {
                  appendOembed(data).then(function(data){
                    res.send({tweets: data});
                  });
              });
  });
  app.use('/api/tweets', tweetsRouter);
};
