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
hipchat-notifier <config-file> <template-file>
```

### As a module

#### Create your `template.msg` file
```
Hi {dev1} {dev2}
```

#### Use the plugin
```javascript
var notify = require('medallia-hipchat-notifier');

var context = {
  dev1: @Eze,
  dev2: @Lucia
}

notify("./config.json", "./template.msg", context);
```

### Roadmap
- [Support json Objects for configuration](https://github.com/medallia/hipchat-notifier/issues/1)
- [Support template messages on the fly](https://github.com/medallia/hipchat-notifier/issues/2)

## Developer Information
Ezequiel Bergamaschi - ezequiel@medallia.com
