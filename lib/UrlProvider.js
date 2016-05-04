/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

'use strict';

const url           = require('url');
const querystring   = require('querystring');

/**
 * Returns an URL object with information about the Hipchat API URL used.
 * Room name and api token are being URL encoded.
 * @param room
 *          the room name
 * @param apiToken
 *          the room API token
 * @returns {{protocol: string, host: string, pathname: string, query: {auth_token: *}}}
 */
const urlObject = (room, apiToken) => {
    return {
        protocol: 'https:',
        host: 'api.hipchat.com',
        pathname: '/v2/room/' + querystring.escape(room) + '/notification',
        query: {auth_token: (apiToken)}
    };
};

module.exports = {
    /**
     * {@link #urlObject}
     */
    urlObject: urlObject,
    /**
     * Returns a formatted URL provided by {@link #urlObject}.
     * @param room
     *          the room name
     * @param apiToken
     *          the room API token
     * @returns {String}
     */
    formatUrl: (room, apiToken) => {
        return url.format(urlObject(room, apiToken));
    }
};