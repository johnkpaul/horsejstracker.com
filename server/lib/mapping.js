var mapping = {
  'https://twitter.com/horse_js/status/495576140334243840': 'https://twitter.com/fivetanley/status/495404763081478144',
  'https://twitter.com/horse_js/status/495646693359374336': 'https://twitter.com/searls/status/495405355514744832',
  'https://twitter.com/horse_js/status/495316559909224448': 'https://twitter.com/wycats/status/495315214418468866',
  'https://twitter.com/horse_js/status/495635328703934464': 'https://twitter.com/potch/status/361966029234122754',
  'https://twitter.com/horse_js/status/495365980760322048': 'https://twitter.com/swannodette/status/495364324693913600',
  'https://twitter.com/horse_js/status/495997098853421056': 'https://twitter.com/monsika/status/495994787737395200',
  'https://twitter.com/horse_js/status/496154962133786624': 'https://twitter.com/mikewest/status/495988209818419202',
  'https://twitter.com/horse_js/status/495342711386685440': 'https://twitter.com/meandave2020/status/495326262777245696'
};

var _ = require('lodash');
mapping = _.chain(mapping).invert().mapValues(function(val){
  return _.last(val.split('/'));
}).invert().value();

module.exports = mapping;
