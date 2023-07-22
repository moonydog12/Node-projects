const nodemailer = require('nodemailer');

const sendEmail = async () => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'alexandra37@ethereal.email',
      pass: 'bNBwJGsAafvA1zzmMf',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Coding Ninja 🥷 <Ninja@gmail.com>',
    to: 'user@example.com',
    subject: 'Testing',
    html: '<h2>Testing email</h2>',
  });
};

module.exports = sendEmail;
