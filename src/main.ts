import { TelegramUrls } from './Helpers/TelegramUrls';
import { SendMessageResponse } from './models/SendMessageResponse';
import { Telegram } from './models/Telegram';

type Logger = 'error' | 'success' | 'info' | 'warning' | 'test';

/**
 * @type {string, string}
 * @returns {boolean} Returning true means that configuration was successfull
 */
export function init(botToken: string, chatId: number): boolean {
  var telegram = Telegram.getInstance();

  if (telegram) {
    Telegram.setBotToken(botToken);
    Telegram.setChatId(chatId);
  }

  if (Telegram.getBotToken() && Telegram.getChatId()) return true;

  return false;
}

/**
 * @type {Logger[], string}
 * @returns {SendMessageResponse} Returns true or false with the error message
 */
export async function sendMessage(
  type: Logger,
  message: string,
): Promise<SendMessageResponse> {
  let messageType = getMessageHeader(type);

  const fullMessage = `
    ${messageType}

    ${message}    
  `;

  let sendMessageResponse: SendMessageResponse;

  try {
    var chat_id = Telegram.getChatId();
    var requestBody = {
      chat_id,
      text: fullMessage,
    };

    const botToken = Telegram.getBotToken();

    if (botToken) {
      const url = TelegramUrls.sendMessage(botToken);

      sendMessageResponse = await request(
        url,
        'POST',
        JSON.stringify(requestBody),
      );
    } else {
      sendMessageResponse = {
        success: false,
        errorMessage: 'Bot token was not recognized, try init again.',
      };
    }

    return sendMessageResponse;
  } catch (e: any) {
    sendMessageResponse = {
      success: false,
      errorMessage: e.toString(),
    } as SendMessageResponse;

    return sendMessageResponse;
  }
}

/**
 * @returns {SendMessageResponse} Returns true or false with the error message
 */
export async function checkBot(): Promise<SendMessageResponse> {
  let sendMessageResponse: SendMessageResponse;
  try {
    const botToken = Telegram.getBotToken();

    if (botToken) {
      const url = TelegramUrls.checkBot(botToken);
      sendMessageResponse = await request(url, 'GET');
      return sendMessageResponse;
    } else {
      return (sendMessageResponse = {
        success: false,
        errorMessage: 'Bot token was not recognized, try init again.',
      });
    }
  } catch (e: any) {
    sendMessageResponse = {
      success: false,
      errorMessage: e.toString(),
    } as SendMessageResponse;

    return sendMessageResponse;
  }
}

export async function sendTestMessage(): Promise<SendMessageResponse> {
  let sendMessageResponse: SendMessageResponse;
  try {
    var chat_id = Telegram.getChatId();
    let messageType = getMessageHeader('test');

    const fullMessage = `
      ${messageType}

      ${'Your configuration was successful'}    
    `;

    var requestBody = {
      chat_id,
      text: fullMessage,
    };

    const botToken = Telegram.getBotToken();

    if (botToken) {
      const url = TelegramUrls.sendMessage(botToken);

      sendMessageResponse = await request(
        url,
        'POST',
        JSON.stringify(requestBody),
      );
    } else {
      sendMessageResponse = {
        success: false,
        errorMessage: 'Bot token was not recognized, try init again.',
      };
    }

    return sendMessageResponse;
  } catch (e: any) {
    sendMessageResponse = {
      success: false,
      errorMessage: e.toString(),
    } as SendMessageResponse;

    return sendMessageResponse;
  }
}

async function request(
  url: string,
  method: string,
  body?: string,
): Promise<SendMessageResponse> {
  let sendMessageResponse: SendMessageResponse;

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });

    if (response.ok) {
      return (sendMessageResponse = {
        success: true,
      });
    } else {
      const responseBody = await response.json();
      return (sendMessageResponse = {
        success: false,
        errorMessage: responseBody['description'],
      });
    }
  } catch (e: any) {
    throw e;
  }
}

function getMessageHeader(type: string): string {
  switch (type) {
    case 'error':
      return '🔴🔴🔴 Error 🔴🔴🔴';
    case 'info':
      return '🔵🔵🔵 Information 🔵🔵🔵';
    case 'success':
      return '🟢🟢🟢 Success 🟢🟢🟢';
    case 'warning':
      return '🟡🟡🟡 Warning 🟡🟡🟡';
    default:
      return '⚫️⚫️⚫️ Logger Message ⚫️⚫️⚫️';
  }
}
