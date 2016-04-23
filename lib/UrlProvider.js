/**
 * @copyright Copyright © 2016 Medalia, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

"use strict";

const url           = require('url');

const urlObject = (room, apiToken) => {
    return {
        protocol: "https",
        host: "api.hipchat.com",
        pathname: '/v2/room/' + room + '/notification',
        query: {auth_token: apiToken}
    };
};

module.exports = {
    urlObject: urlObject,
    formatUrl: (room, apiToken) => {
        return url.format(urlObject(room, apiToken));
    }
};