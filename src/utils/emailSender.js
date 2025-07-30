// src/utils/emailSender.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendMail(content) {
  const info = await transporter.sendMail({
    from: `"Daily Standup Bot" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // Bạn có thể gửi cho nhiều người, ngăn cách bởi dấu phẩy
    subject: "📝 Daily Standup Report",
    text: content
  });

  console.log('📧 Email sent: %s', info.messageId);
}

module.exports = { sendMail };


