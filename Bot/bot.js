
// const express = require('express');
// const bodyParser = require('body-parser');
// const { Telegraf } = require('telegraf');

// const app = express();
// const port = process.env.TZ || 3000;
// const bot = new Telegraf('6465312406:AAG9bJ89G1IyRV8gZhRpoFNamd8oVcFnAYg');
// const web_link = "https://bot-telegram-iota.vercel.app/";

// bot.start((ctx) =>
//     ctx.reply("Welcome :)))))", {
//         reply_markup: {
//             keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
//         },
//     })
// );

// // Định nghĩa endpoint POST '/increment'
// app.post('/increment', (req, res) => {

//     let data = ''

//     req.on('data', chunk => {
//         data += chunk.toString();
//     })

//     req.on('end', () => {
//         console.log('Received data:', data);

//         bot.telegram.sendMessage('7003593765', `Total price: ${data} $`);

//         // Phản hồi về cho trang web
//         res.status(200).send('Data received');
//     })


// });

// app.use(bodyParser.json());

// bot.launch();

// // Lắng nghe yêu cầu trên cổng được cung cấp hoặc cổng mặc định 3000
// app.listen(port, () => {
//     console.log(`Web server is listening on port ${port}`);
// });




const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome!'));

bot.on('text', (ctx) => {
    ctx.reply(`You said: ${ctx.message.text}`);
});

// Định nghĩa hàm handler cho Vercel
module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body, res);
    } catch (err) {
        console.error('Error handling update', err);
        res.status(500).send('Error handling update');
    }
};
