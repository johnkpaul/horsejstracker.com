var q = require('q');
var twit = require('../lib/twit');
var _ = require('lodash');

module.exports = _.memoize(function(){
  var def = q.defer();
  var args = _.toArray(arguments);

  args.push(function(data){
      return def.resolve(data);
  });

  try{
    twit.get.apply(twit, args);
  }
  catch(e){
    def.resolve(e);
  }

  return def.promise;
});

setInterval(clearCache, 15 * 60);

function clearCache(){
  module.exports.cache = {};
}

