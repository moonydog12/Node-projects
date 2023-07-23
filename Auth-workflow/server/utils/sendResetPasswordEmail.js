const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const URL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p style="background-color:red;"><a href="${URL}">Reset Password</a></p>`;

  return sendEmail({ to: email, subject: 'Reset Password', html: message });
};

module.exports = sendResetPasswordEmail;
