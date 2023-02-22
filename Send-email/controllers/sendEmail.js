const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'haley.walker@ethereal.email',
      pass: 'aHpBDr9NQrKHDz5F1G',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Coding Ninja <Ninja@gmail.com>',
    to: 'bar@example.com',
    subject: 'Hello',
    html: '<h2>Use node.js to send email</h2>',
  });

  res.json(info);
};

module.exports = sendEmail;
