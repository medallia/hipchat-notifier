/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

"use strict";

const app = require('../lib/app');
const assert = require('chai').assert;
const nock = require('nock');

describe("Main test", () => {

    const config = {
        "req-body": {
            "from": "HipChat Notifier",
            "message_format": "text",
            "color": "red",
            "notify": "true",
            "message": ""
        },
        "settings": {
            "api-token": "12345",
            "room": "MyRoom"
        }
    };

    const body = 'from=HipChat%20Notifier&message_format=text&color=red&notify=true&message=test';

    beforeEach(() => {
        nock('http://api.hipchat.com')
            .filteringRequestBody(/message=.*/, 'message=test')
            .post('/v2/room/' + config.settings.room + "/notification?auth_token=" + config.settings["api-token"], body)
            .reply(200, {
                ok: true
            });
    });

    it("Call without arguments test", () => {
        assert.throws(app, "Illegal argument, expected a file path or a json Object");
    });

    it("On the fly send test", () => {
        app(config, "hola");
    });

    it("From file send test", () => {
        app("test/resources/config.json", "test/resources/template.msg")
    });

    it("No template test", () => {
        assert.throws(() => { app(config, null); }, "Message cannot be null or undefined")
    });

});