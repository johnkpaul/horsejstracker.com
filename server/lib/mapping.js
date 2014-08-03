var mapping = {
  'https://twitter.com/horse_js/statuses/495576140334243840': 'https://twitter.com/fivetanley/status/495404763081478144',
  'https://twitter.com/horse_js/status/495646693359374336': 'https://twitter.com/searls/status/495405355514744832',
  'https://twitter.com/horse_js/status/495316559909224448': 'https://twitter.com/wycats/status/495315214418468866',
  'https://twitter.com/horse_js/status/495635328703934464': 'https://twitter.com/potch/status/361966029234122754'
};










var _ = require('lodash');
mapping = _.chain(mapping).invert().mapValues(function(val){
  return _.last(val.split('/'));
}).invert().value();

module.exports = mapping;
