/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

'use strict';

const request       = require('request');
const nconf         = require('nconf');
const fs            = require('fs');
const path          = require('path');
const strformat     = require('strformat');
const util          = require('util');
const assert        = require('assert');
const UrlProvider   = require('./UrlProvider');

/**
 * Send a Hipchat Room notification
 * using the Hipchat API v2, {@link https://www.hipchat.com/docs/apiv2/method/send_room_notification}.
 * @param data
 *          the notification to be send.
 * @param context
 *          the contextual objects to format the message (optional).
 */
const sendNotification = (data, context) => {
    assert.ok(data, "Message cannot be null or undefined");
    var message = strformat('' + data, context);
    var body = nconf.get('req-body');
    body.message = message;
    request.post({
        uri: UrlProvider.formatUrl(nconf.get('settings:room'), nconf.get('settings:api-token'))
    }, (err, response, body) => {
            if (err) throw err;
            console.log(body);
        }
    ).form(body);
};

/**
 * Returns {@code true} if the given file exists.
 * @param file
 *          the file path to evaluate.
 */
const fileExist = (file) => {
    return fs.existsSync(file);
};

/**
 * Prepare and sends the Hipchat room notification.
 * For the json configuration, the precedence order is first for configuration
 * files and then for configuration Objects.
 * @param configFileOrObject
 *          a javascript Object or a json configuration file containing the settings needed.
 * @param fileOrMessage
 *          a String message or a text file with the message to be sent
 * @param context
 *          the contextual objects to format the message (optional).
 * @throws
 *          an Error if the configuration file or object or the message to send are not present.
 */
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
        sendNotification(fileOrMessage, context);
    } else {
        fs.readFile(fileOrMessage, (err, data) => {
            if (err) throw err;
            sendNotification(data, context);
        });
    }
};
