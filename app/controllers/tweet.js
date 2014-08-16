import Ember from 'ember';

export default Ember.ObjectController.extend({
  inspirationTweetUrl: '',
  actions: {
   saveMapping: function(){
     var self = this;
     var data = {
        inspiration_url: self.get('inspirationTweetUrl'),
        horse_js_tweet_id_str: self.get('horse_js_tweet_id_str')
     };
     Ember.$.ajax({
      url: '/api/tweets/newMapping',
      data: JSON.stringify(data),
      type: 'POST',
      contentType: 'application/json'
     }).then(function(inspiration_tweet_oembed){
        self.set('inspiration_tweet_oembed', inspiration_tweet_oembed);
     });
   }
  }
});
