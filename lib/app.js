"use strict";

const request = require('request');
const config = require('nconf');
const fs = require('fs');
const path = require('path');
const strformat = require('strformat');

module.exports = (configFile, fileTemplate, context) => {
    config.argv()
        .env()
        .file({ file: configFile});

    fs.readFile(fileTemplate, (err, data) => {
        if (err) throw err;

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
    });
};