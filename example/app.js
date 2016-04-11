var notify = require('medallia-hipchat-notifier');

var context = {
  "DAY_MOMENT": "morning"
}

notify("./config.json", "./template.msg", context);
