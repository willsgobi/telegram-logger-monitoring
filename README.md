# Telegram Logger Monitoring ![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) !["Telegram"](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)

This package aims to simplify the capture of errors, warnings and informations by sending directly to your Telegram.

First of all, you need configurate your bot on Telegram, this is required to use this package!

### Follow the required steps to create a Telegram's Bot

- Create an Telegram account
- Search on Telegram for "BotFather"
  - Open the chat with BotFather
  - Send a message with the text **/newbot**
  - Send a message with the name of your bot (_eg: MyAwesomeBot_)
  - Send a username for your bot (_eg: MyAwesomeBot_bot_)

After sent the username, your bot has been created successfully, and you did receive the message whitin a directly link to the bot and the Token to use in this package.

The message received is similar to this:

```
Done! Congratulations on your new bot. You will find it at t.me/YOUR-USERNAME_bot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
YOUR-BOT-TOKEN
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

### Configuring the package

With the bot token on your hands, you can configure the package on your application.

To configure correctly, you will need the chat_id of a particular user or a group, to get this chat id, you can follow this steps:

Note: you can send a message just for you or for a group

**Send message to your particular chat_id:**

Clink on t.me/YOUR-USERNAME_bot that the BotFather sent to you and send a message.

**Send message to your group chat_id:**

To send messages to a group, follow this steps:

- Create a group on Telegram
- Enter a good name
- Add your bot on group **(this is very important)**

After add the bot, send a message starting with _**'/'**_, eg: **/start** or **/anything**

After sent the message, open this link on your browser or _Postman_:

```
https://api.telegram.org/botYOUR-BOT-TOKEN/getUpdates
```

On the json response, search for the message that you sent and you'll find the **chat_id**

Note: if you create a group, the chat_id probably start with dash **( - )**, eg: **-123456789**, otherwise, it can seems like **123456789**

With the **chat_id** in your hand, you can configure the logger.

Run the command on your terminal:

```
npm i telegram-logger-monitoring
```

After, initialize the logger on your application:

Import the package's method **init** and call:

```javascript
init(YOUR - BOT - TOKEN, YOUR - CHAT - ID);
```

Now, you can send test message:

```javascript
await sendTestMessage();
```

All send message methods return this object:

```javascript
{
  success: boolean;
  errorMessage?: string;
}
```

Follow the `sendMessage` method with the type of message:

```javascript
await sendMessage('error', 'This is a error message');

await sendMessage('info', 'this is a info message');

await sendMessage('success', 'This is a success message');

await sendMessage('warning', 'This is a warning message');
```

You can pass on the firt parameters this options:

```javascript
'error' | 'success' | 'info' | 'warning' | 'test';
```

If you need any help or improvements, feel free to send an email to
[sgobiapps@gmail.com](mailto:sgobiapps@gmail.com)
