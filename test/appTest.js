/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

"use strict";

const chai              = require('chai');
chai.should();
const chaiAsPromised    = require("chai-as-promised");
chai.use(chaiAsPromised);

const nock              = require('nock');
const app               = require('../lib/app');

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
        nock('https://api.hipchat.com')
            .filteringRequestBody(/message=.*/, 'message=test')
            .post('/v2/room/' + config.settings.room + "/notification?auth_token=" + config.settings["api-token"], body)
            .reply(200, {
                ok: true
            });
    });

    it("Call without arguments test", () => {
        return app().should.be.rejectedWith("Illegal argument, expected a file path or a json Object");
    });

    it("On the fly send test", () => {
        return app(config, "hola")
            .should.eventually.equal("{\"ok\":true}");
    });

    it("From file send test", () => {
        return app("test/resources/config.json", "test/resources/template.msg")
            .should.eventually.equal("{\"ok\":true}");
    });

    it("No template test", () => {
        return app(config, null).should.be.rejectedWith("Message cannot be null or undefined");
    });

});