import Ember from 'ember';
import { raw as icAjaxRaw } from 'ic-ajax';

export default Ember.Route.extend({
  model: function(){
    return icAjaxRaw('/api/tweets').then(function(){
      return arguments[0].response.tweets;
    });
  }
});
