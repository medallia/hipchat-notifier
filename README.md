# Hipchat Notifier

## Synopsis
Push HipChat notifications to the configured room.

## Prerequisites
You will need an HipChat API token for your team room & admin access to it.

Go to hipchat.com -> rooms -> \<room-name\> -> tokens

## Usage

### As a binary
```bash
npm install -g medallia-hipchat-notifier
hipchat-notifier <config-file> <template-file>
```

### As a module

`template.msg`
```
Hi {dev1} {dev2}
```

```javascript
var notify = require('medallia-hipchat-notifier');

var context = {
  dev1: @Eze,
  dev2: @Lucia
}

notify("./config.json", "./template.msg", context);
```

## Configuration

- Setup the message that you would like to send into a file.

- Prepare the `configuration` file:

```json
{
  "req-body": {
    "from": "Jira Board Notifier"
    "message_format": "text",
    "color": "red",
    "notify": "true"
  },
  "settings": {
    "api-token": "...",
    "room": "My Awesome room"
  }
}
```

The `req-body` follows [HipChat V2 room notification](https://www.hipchat.com/docs/apiv2/method/send_room_notification)

## Developer Information
Ezequiel Bergamaschi - ezequiel@medallia.com
