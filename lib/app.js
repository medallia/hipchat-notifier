/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

'use strict';

const request = require('request');
const nconf = require('nconf');
const fs = require('fs');
const path = require('path');
const strformat = require('strformat');
const util = require('util');

const sendMessage = (data, context) => {
    var message = strformat('' + data, context);
    var body = config.get('req-body');
    body.message = message;
    request.post(
        'http://api.hipchat.com/v2/room/' + nconfg.get('settings:room') + '/notification?auth_token=' nconf.get('settings:api-token'),
        (err, response, body) => {
            if (err) console.log(err);
            console.log(body);
        }
    ).form(body);
};

const fileExist = (file) => {
    return fs.existsSync(file);
};

module.exports = (configFileOrObject, fileOrMessage, context) => {
    var config = nconf.argv().env();
    if (fileExist(configFileOrObject)) {
        config.file({ file: configFileOrObject})
    } else if (util.isObject(configFileOrObject)) {
        config.defaults(configFileOrObject);
    } else {
        throw new Error("Illegal argument, expected a file path or a json Object");
    }

    if (!fileExist(fileOrMessage)) {
        sendMessage(fileOrMessage, context);
    } else {
        fs.readFile(fileOrMessage, (err, data) => {
            if (err) throw err;
            sendMessage(data, context);
        });
    }
};
