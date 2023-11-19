const base_url = 'https://api.telegram.org/bot';

export class TelegramUrls {
  static sendMessage = (botToken: string) =>
    `${base_url}${botToken}/sendMessage`;

  static checkBot = (botToken: string) => `${base_url}${botToken}/getMe`;

  static getChat = (botToken: string, chatId: number) =>
    `${base_url}${botToken}/getChat?chat_id=${chatId}`;

  static getUpdates = (botToken: string) => `${base_url}${botToken}/getUpdates`;
}
