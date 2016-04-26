/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

'use strict';

const UrlProvider = require('../lib/UrlProvider');
const assert = require('chai').assert;
const querystring = require('querystring');

describe('UrlProvider test suite', () => {
    const room = 'My awesome room?';
    const apiToken = '123///45!!';

    it('urlObject test', () => {
        var actual = UrlProvider.urlObject(room, apiToken);
        var expected = {
            protocol: 'https:',
            host: 'api.hipchat.com',
            pathname: '/v2/room/' + querystring.escape(room) + '/notification',
            query: {auth_token: apiToken}
        };
        assert.deepEqual(actual, expected);
    });

    it('format test', () => {
        var url = UrlProvider.formatUrl(room, apiToken);
        assert.equal(querystring.unescape(url), 'https://api.hipchat.com/v2/room/' + room + '/notification?auth_token=' + apiToken);
    });

});