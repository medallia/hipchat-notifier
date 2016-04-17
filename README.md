# Medallia Hipchat Notifier

## Synopsis
Push HipChat notifications to the configured room.

## Prerequisites
- NodeJS 4.X or higher
- You will need an HipChat API token for your team room & admin access to it.

### How to create a Hipchat Room Token
1. Go to hipchat.com
2. Click in "rooms"
3. Click in your room name
4. Click in "tokens"

## Installation
```bash
npm install -g medallia-hipchat-notifier
```

## Configuration

- Setup the message that you would like to send into a text file.

- Prepare the `configuration` file:

```
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
    "room": "My Awesome room"
  }
}
```

The `req-body` follows [HipChat V2 room notification](https://www.hipchat.com/docs/apiv2/method/send_room_notification)

## Usage

### As a binary
```bash
hipchat-notifier --config=<config-file> --template=<template-file>

# For more options
hipchat-notifier --help
```

### As a module
You can create a template file or specify the string message.

#### Create your `template.msg` file
```
Hi {dev1} {dev2}
```

#### Use the plugin
```javascript
var notify = require('medallia-hipchat-notifier');

var context = {
  dev1: "@Eze",
  dev2: "@Lucia"
}

// Option 1
notify("./config.json", "./template.msg", context);

// Option 2
notify("./config.json", "Hi {dev1} {dev2}", context);

// Option 3
var config = {...}
notify(config, "Hi {dev1} {dev2}", context);
```

## License
MIT

## Developer Information
Ezequiel Bergamaschi - ezequiel@medallia.com
