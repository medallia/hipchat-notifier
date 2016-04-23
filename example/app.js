/**
 * @copyright Copyright © 2016 Medalla, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

var notify = require('@medallia/hipchat-notifier');

var context = {
  'DAY_MOMENT': 'morning'
};

notify('./config.json', './template.msg', context)
    .then(body => console.log('Done!'))
    .catch(error => console.error(error));
