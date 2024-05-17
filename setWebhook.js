// setWebhook.js
const axios = require('axios');
require('dotenv').config();

const setWebhook = async () => {
    const url = 'https://bot-telegram-iota.vercel.app/'; // Thay bằng URL thực của bạn
    const token = process.env.BOT_TOKEN;
    const telegramUrl = `https://api.telegram.org/bot${token}/setWebhook?url=${url}`;

    try {
        const response = await axios.get(telegramUrl);
        console.log('Webhook set:', response.data);
    } catch (err) {
        console.error('Error setting webhook', err);
    }
};

setWebhook();
