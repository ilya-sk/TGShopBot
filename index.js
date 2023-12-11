import TelegramBot from "node-telegram-bot-api";
import express, { json } from 'express';
import cors from 'cors';


const token = "6795720145:AAHVDpDZNU04xLgBis0g_LX-QXFLsvjoQmk";
const webAppUrl = "https://resilient-alfajores-9cbe8b.netlify.app";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(json());
app.use(cors());


bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "В данный момент есть", {
      reply_markup : {
        inline_keyboard : [
          [{text: 'Купить', web_app: {url: webAppUrl}}]
        ]
      }
    });
  }
});

app.post('/web-data', async (req, res) => {
  const {queryId, products = [], totalPrice} = req.body;
  try {
      await bot.answerWebAppQuery(queryId, {
          type: 'article',
          id: queryId,
          title: 'Успешная покупка',
          input_message_content: {
              message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
          }
      })
      return res.status(200).json({});
  } catch (e) {
      return res.status(500).json({})
  }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))