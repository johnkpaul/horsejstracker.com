import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    var scr = document.createElement('script');
    scr.src = '//platform.twitter.com/widgets.js';
    document.body.appendChild(scr);
  }
});
