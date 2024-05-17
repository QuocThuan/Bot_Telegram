// const { Telegraf } = require("telegraf");
// const TelegramBot = require('node-telegram-bot-api');
// const token = "6465312406:AAG9bJ89G1IyRV8gZhRpoFNamd8oVcFnAYg";
// // const bot = new Telegraf(TOKEN);
// const bot = new TelegramBot(token, { polling: true });

// // const web_link = "https://meek-meringue-1c4bf1.netlify.app";

// bot.start((ctx) =>
//     ctx.reply("Welcome :)))))", {
//         reply_markup: {
//             keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
//         },
//     })
// );

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     console.log(msg)
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });

// // bot.launch();

// const http = require('http');
// const { Telegraf } = require('telegraf');
// const express = require('express');

// const bot = new Telegraf('6465312406:AAG9bJ89G1IyRV8gZhRpoFNamd8oVcFnAYg');
// const web_link = "https://meek-meringue-1c4bf1.netlify.app";
// const port = process.env.PORT
// const app = express();


// bot.start((ctx) =>
//     ctx.reply("Welcome :)))))", {
//         reply_markup: {
//             keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
//         },
//     })
// );

// // Xử lý tin nhắn từ người dùng
// bot.on('text', (ctx) => {
//     console.log('Received message:', ctx.message.text);
//     // Xử lý tin nhắn ở đây và trả lời lại nếu cần
// });

// bot.launch();

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST' && req.url === '/increment') {
//         let data = '';

//         // Nghe sự kiện 'data' để nhận dữ liệu gửi lên từ phía client
//         req.on('data', chunk => {
//             data += chunk.toString(); // Chuyển đổi dữ liệu từ buffer thành chuỗi và cộng vào biến data
//         });

//         // Nghe sự kiện 'end' để biết khi dữ liệu kết thúc gửi lên
//         req.on('end', () => {
//             console.log('Received data:', data);

//             bot.telegram.sendMessage('7003593765', `Total price: ${data} $`);

//             // Phản hồi về cho client
//             res.writeHead(200, { 'Content-Type': 'text/plain' });
//             res.end('Data received');
//         });
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not found');
//     }
// });

// server.listen(port, () => {
//     console.log('Web server is listening on port 3000');
// });


const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const port = 'https://meek-meringue-1c4bf1.netlify.app' || 3001;
const bot = new Telegraf('6465312406:AAG9bJ89G1IyRV8gZhRpoFNamd8oVcFnAYg');
const web_link = "https://meek-meringue-1c4bf1.netlify.app";
console.log(port)
// Sử dụng bodyParser để phân tích dữ liệu từ yêu cầu POST

bot.start((ctx) =>
    ctx.reply("Welcome :)))))", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

// Định nghĩa endpoint POST '/increment'
app.post('/increment', (req, res) => {

    let data = ''

    req.on('data', chunk => {
        data += chunk.toString();
    })

    req.on('end', () => {
        console.log('Received data:', data);

        bot.telegram.sendMessage('7003593765', `Total price: ${data} $`);

        // Phản hồi về cho trang web
        res.status(200).send('Data received');
    })


});

app.use(bodyParser.json());

bot.launch();

// Lắng nghe yêu cầu trên cổng được cung cấp hoặc cổng mặc định 3000
app.listen(port, () => {
    console.log(`Web server is listening on port ${port}`);
});