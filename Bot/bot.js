const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const path = require('path');
const port = process.env.TZ || 3000;
const bot = new Telegraf('6465312406:AAG9bJ89G1IyRV8gZhRpoFNamd8oVcFnAYg');

app.use(express.static(path.join(__dirname, 'build')));

// Route cho URL gốc
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

bot.start((ctx) => {
    const username = ctx.from.username || ctx.from.first_name;
    const web_link = `https://7196-2001-ee0-4f95-a910-74c2-a4aa-f324-e9cb.ngrok-free.app?username=${encodeURIComponent(username)}`;

    ctx.reply("Welcome :)))))", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
});

app.use(bodyParser.json());

app.post('/telegram-webhook', (req, res) => {
    try {
        console.log('first');
        const { username, data } = req.body; // Lấy dữ liệu từ request body
        console.log(username);
        if (username && data) {
            console.log(`Received message from ${username}: ${data}`);
            bot.telegram.sendMessage('7003593765', `Total price: ${data} $`);
            res.status(200).send('Data received and message sent to bot.');
        } else {
            res.status(400).send('Invalid data.');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal server error.');
    }
});

bot.launch();

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'https://fonts.googleapis.com'; font-src 'self' https://fonts.gstatic.com");
//     next();
// });








