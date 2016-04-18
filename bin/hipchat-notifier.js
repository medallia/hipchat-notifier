#!/usr/bin/env node

/**
 * @copyright Copyright © 2016 Medalla, Inc. All rights reserved.
 * @license Licensed under the MIT License (MIT).
 */

var argv = require('argv');

const configFile = {
    name: 'config',
    short: 'c',
    type: 'path',
    description: 'Specify the configuration json file',
    example: '--config=./config.json or -c ./config.json'
};

const template = {
    name: 'template',
    short: 't',
    type: 'path',
    description: 'Specify the message template file',
    example: '--template=./message.txt or -t ./message.txt'
};


const message = {
    name: 'message',
    short: 'm',
    type: 'string',
    description: 'Specify the message',
    example: '--message=\'Hi @all !\' or -m \'Hi @all !\''
};

argv.option(configFile);
argv.option(template);
argv.option(message);
argv.version('1.1.1');

const args = argv.run();

const definedMessage = args.options.message || args.options.template;

if (!args.options.config || !(definedMessage)) {
    argv.help();
    process.exit(1);
}

require('../lib/app')(args.options.config, definedMessage);
