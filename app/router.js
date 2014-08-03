import Ember from 'ember';

var Router = Ember.Router.extend({
  location: HorsejsTrackerENV.locationType
});

Router.map(function() {
  this.route('tweets');
});

export default Router;
