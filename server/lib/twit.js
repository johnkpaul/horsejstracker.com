var twitter = require('twitter');
var twitterCreds = require('../../config/secrets.js').twitterCreds;

var twit = new twitter(twitterCreds);

module.exports = twit;
