# Medallia HipChat Notifier

## Synopsis
Push notifications to a [HipChat][1] room.

## Prerequisites
- NodeJS 4.X or higher
- A [HipChat][1] API token for and admin access to your team room

### Creating a HipChat Room Token
1. Go to [hipchat.com][1].
2. Click "rooms".
3. Click your room name.
4. Click "tokens".

## Installation
```bash
npm install -g @medallia/hipchat-notifier
```

## Configuration
- Save the message to post to a text file
- Prepare the `configuration` file as shown below:

```javascript
{
  "req-body": {
    "from": "Jira Board Notifier",
    "message_format": "text",
    "color": "red",
    "notify": "true"
    ...
  },
  "settings": {
    "api-token": "...",
    "room": "Room Name"
  }
}
```

The `req-body` section follows the [room notification][2] API from HipChat.

## Usage

### As a binary
```bash
hipchat-notifier --config=<config-file> --template=<template-file>

# For more options
hipchat-notifier --help
```

### As a module
You can create a template file or specify the string message.

#### Create the `template.msg` file
```text
Hi {dev1} {dev2}
```

#### Use the plugin
```javascript
var notify = require('@medallia/hipchat-notifier');

var context = {
  dev1: '@Eze',
  dev2: '@Lucia'
};

// Option 1
notify('./config.json', './template.msg', context)
    .then(body => console.log("Done!"))
    .catch(err => console.error("Something wrong happened."));

// Option 2
notify('./config.json', 'Hi {dev1} {dev2}', context)
    .then(body => console.log("Done!"))
    .catch(err => console.error("Something wrong happened."));

// Option 3
var config = {...};
notify(config, 'Hi {dev1} {dev2}', context)
    .then(body => console.log("Done!"))
    .catch(err => console.error("Something wrong happened."));
```

## Development

### Run test
```bash
npm install
npm test
```

## License & Copyright
This software is copyrighted 2016 by Medallia, Inc. and released under the
[MIT License][3].

[1]: https://www.hipchat.com
[2]: https://www.hipchat.com/docs/apiv2/method/send_room_notification
[3]: ./LICENSE
