# veld.chat-ts
## A library for the chat service at [chat.veld.dev](https://chat.veld.dev)
# Client
## Events
### message:create
#### This emits a message object
```js
content?: string;
embed?: Embed;
channelId: string;
mentions: Array<string>;
```
# Functions
## sendMessage
```js
const  content = 'Test'  // Or it could be an embed. {title: 'a', description: 'b', thumbnailUrl: 'image url'...}

client.sendMessage(channelID, content)
```
### channelID: the channel ID
### content: the message's content
---
# Other types
## Embed
```js
author?: EmbedAuthor;
title?: string;
description?: string;
color?: number;
footer?: string;
imageUrl?: string;
thumbnailUrl?: string;
```
## EmbedAuthor
```js
value: string;
iconUrl?: string;
```