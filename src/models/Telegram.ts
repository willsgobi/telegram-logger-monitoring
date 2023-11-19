export class Telegram {
  private static instance: Telegram;
  private static botToken: string | undefined;
  private static chatId: number | undefined;

  private constructor() {}

  public static getInstance(): Telegram {
    if (!Telegram.instance) {
      Telegram.instance = new Telegram();
    }

    return Telegram.instance;
  }

  public static setBotToken(botToken: string) {
    if (botToken) {
      Telegram.botToken = botToken;
    }
  }

  public static setChatId(chatId: number) {
    if (chatId) {
      Telegram.chatId = chatId;
    }
  }

  public static getBotToken(): string | undefined {
    return Telegram.botToken;
  }

  public static getChatId(): number | undefined {
    return Telegram.chatId;
  }
}
