/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

"use strict";

const UrlProvider = require("../lib/UrlProvider");
const assert = require('chai').assert;

describe("UrlProvider test suite", () => {
    const room = "My awesome room?";
    const apiToken = "12345!!";

    it("urlObject test", () => {
        var actual = UrlProvider.urlObject(room, apiToken);
        var expected = {
            protocol: "https",
            host: "api.hipchat.com",
            pathname: "/v2/room/My awesome room?/notification",
            query: {auth_token: apiToken}
        };
        assert.deepEqual(actual, expected);
    });

    it("format test", () => {
        assert.equal(UrlProvider.formatUrl(room, apiToken), "https://api.hipchat.com/v2/room/My awesome room%3F/notification?auth_token=12345!!")
    });

});