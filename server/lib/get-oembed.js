var q = require('q');
var twit = require('./twit');

var getOembed = function(tweet_id){
  var def = q.defer(); 
  if(tweet_id){
    twit.get('/statuses/oembed.json', {id: tweet_id}, function(data) {
      data.html = stripTwitterScript(data.html);
      def.resolve(data);
    });
  }
  else{
    def.resolve({});
  }
  return def.promise;
}

module.exports = getOembed;

function stripTwitterScript(html){
  if(html ){
    var withoutScript = html.substr(0, html.indexOf("script async") - 1);
    return withoutScript;
  }
  else{
    return html;
  }
}
