/**
 * @copyright Copyright © 2016 Medallia Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */
var notify = require('medallia-hipchat-notifier');

var context = {
  "DAY_MOMENT": "morning"
};

notify("./config.json", "./template.msg", context);
