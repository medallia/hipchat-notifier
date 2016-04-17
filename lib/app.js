"use strict";
/**
 * @copyright Copyright © 2016 Medallia Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

const request = require('request');
const config = require('nconf');
const fs = require('fs');
const path = require('path');
const strformat = require('strformat');

const sendMessage = (data, context) => {
    var message = strformat("" + data, context);
    var body = config.get('req-body');
    body.message = message;
    request.post(
        "http://api.hipchat.com/v2/room/" + config.get('settings:room') + "/notification?auth_token=" + config.get('settings:api-token'),
        (err, response, body) => {
            if (err) console.log(err);
            console.log(body);
        }
    ).form(body);
};

module.exports = (configFileOrObject, fileOrMessage, context) => {
    config.argv()
        .env()
        .file({ file: configFileOrObject})
        .defaults(configFileOrObject);

    if (!fs.existsSync(fileOrMessage)) {
        sendMessage(fileOrMessage, context);
    } else {
        fs.readFile(fileOrMessage, (err, data) => {
            if (err) throw err;
            sendMessage(data, context);
        });
    }
};
