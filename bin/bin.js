#!/usr/bin/env node

const args = require('argv').run();

if (args.targets.length != 2) {
    console.log("Usage: hipchat-notifier <config-file> <template-file>")
    process.exit(1);
}

require('../lib/app')(args.targets[0], args.targets[1]);