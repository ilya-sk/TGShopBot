const TelegramBot = require("node-telegram-bot-api");

const token = "6795720145:AAHVDpDZNU04xLgBis0g_LX-QXFLsvjoQmk";
const webAppUrl = "https://ya.ru";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Received your message", {
      reply_markup : {
        inline_keyboard : [
          [{text: 'Перейти в магазин', web_app: {url: webAppUrl}}]
        ]
      }
    });
  }
});
