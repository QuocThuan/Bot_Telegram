
const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.TZ || 3000;
const bot = new Telegraf('6465312406:AAG9bJ89G1IyRV8gZhRpoFNamd8oVcFnAYg');

bot.start((ctx) => {
    const username = ctx.from.username || ctx.from.first_name;
    console.log(username)
    const web_link = `https://bot-telegram-iota.vercel.app?username=${encodeURIComponent(username)}`;

    ctx.reply("Welcome :)))))", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
});

let receivedData = '';

// Định nghĩa endpoint POST '/increment'
app.post('/increment', (req, res) => {

    let data = ''

    req.on('data', chunk => {
        data += chunk.toString();
    })

    req.on('end', () => {
        console.log('Received data:', data);

        receivedData = data;

        bot.telegram.sendMessage('7003593765', `Total price: ${data} $`);

    })

});

app.use(bodyParser.json());

// bot.on('text', async (ctx) => {

//     await ctx.telegram.sendMessage('7003593765', `Data: ${receivedData} `)

// })

bot.on('/telegram-webhook', (ctx) => {
    const { username, message } = ctx.message;

    // Xử lý dữ liệu
    console.log(`Received message from ${username}: ${message}`);
});

// function sendQuiz(chatId, question, options, extra) {
//     return bot.telegram.sendPoll(chatId, question, options, { type: 'quiz', ...extra });
// }

// bot.on('text', (ctx) => {
//     const chatId = '7003593765';
//     const question = 'What is the capital of VietNam?';
//     const options = ['Berlin', 'Madrid', 'Paris', 'Hanoi'];
//     const extra = {
//         correct_option_id: 3, // Paris is the correct answer
//         explanation: 'Paris is the capital of France.',
//     };

//     sendQuiz(chatId, question, options, extra)
//         .then(() => {
//             console.log('Quiz sent successfully');
//         })
//         .catch((error) => {
//             console.error('Failed to send quiz:', error);
//         });
// });

// // Danh sách câu hỏi và câu trả lời
// const questions = [
//     {
//         question: 'Ai là nghệ sĩ nữ giành nhiều giải Grammy nhất?',
//         options: ['Beyoncé', 'Taylor Swift', 'Adele', 'Madonna'],
//         correctOptionIndex: 0
//     },
//     {
//         question: 'Đâu là tên tiếng việt của nghệ sĩ Taylor Swift',
//         options: ['Con trâu nước Mỹ', 'Robot Mỹ', 'Con rắn háo giai', 'Thúy Loan'],
//         correctOptionIndex: 3
//     },
//     {
//         question: 'Nhóm nhạc nữ Gen 3 giành được PAK ở Hàn đầu tiên là nhóm nào?',
//         options: ['BLACKPINK', 'TWICE', 'Red Velvet', 'GFRIEND'],
//         correctOptionIndex: 3
//     },
//     {
//         question: 'Đâu không phải là biệt danh mà fan đặt cho Taylor Swift?',
//         options: ['Nữ hoàng CO2', 'Con trâu nước Mỹ', 'Con rắn háo giai', 'Tất cả đều sai'],
//         correctOptionIndex: 3
//     },
//     {
//         question: 'Nhóm nhạc nữ giành được nhiều Daesang nhất trong lịch sử Hàn Quốc là nhóm nào?',
//         options: ['BLACKPINK', 'TWICE', 'Girls Generation', '2NE1'],
//         correctOptionIndex: 2
//     },
//     {
//         question: 'Đâu là một trong những bài hát quốc dân của Hàn Quốc?',
//         options: ['Kill This Love', 'Cheer Up', 'Dynamic', 'Love Shot'],
//         correctOptionIndex: 1
//     },
//     {
//         question: 'Thành viên Sulli thuộc nhóm nhạc Kpop nào?',
//         options: ['NMIXX', 'F(x)', 'EXID', 'SES'],
//         correctOptionIndex: 1
//     },
//     // Thêm các câu hỏi tiếp theo
// ];

// let userStates = {};  // Để theo dõi trạng thái của người dùng

// // Hàm gửi câu hỏi
// function sendQuiz(chatId, questionIndex) {
//     const question = questions[questionIndex];
//     bot.telegram.sendPoll(chatId, question.question, question.options, {
//         type: 'quiz',
//         correct_option_id: question.correctOptionIndex,
//         is_anonymous: false
//     });
// }

// // Bắt đầu trò chơi khi nhận lệnh /start
// bot.start((ctx) => {
//     userStates[ctx.chat.id] = { currentQuestionIndex: 0 };
//     sendQuiz(ctx.chat.id, 0);
// });

// // Xử lý câu trả lời của người dùng
// bot.on('poll_answer', (ctx) => {
//     const userId = ctx.update.poll_answer.user.id;
//     const chatId = ctx.update.poll_answer.user.id;
//     const answer = ctx.update.poll_answer.option_ids[0];
//     const userState = userStates[chatId];

//     if (userState) {
//         const currentQuestion = questions[userState.currentQuestionIndex];
//         if (answer === currentQuestion.correctOptionIndex) {
//             userState.currentQuestionIndex++;
//             if (userState.currentQuestionIndex < questions.length) {
//                 sendQuiz(chatId, userState.currentQuestionIndex);
//             } else {
//                 bot.telegram.sendMessage(chatId, 'Chúc mừng bạn đã chiến thắng!');
//                 delete userStates[chatId];
//             }
//         } else {
//             bot.telegram.sendMessage(chatId, 'Bạn đã trả lời sai. Trò chơi kết thúc.');
//             delete userStates[chatId];
//         }
//     }
// });

bot.launch();

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;");
    next();
});

// Lắng nghe yêu cầu trên cổng được cung cấp hoặc cổng mặc định 3000
app.listen(port, () => {
    console.log(`Web server is listening on port ${port}`);
});





