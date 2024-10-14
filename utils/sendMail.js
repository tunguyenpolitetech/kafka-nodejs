const nodemailer = require('nodemailer');

const sendEmail = async (id) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_AUTH_USERNAME,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
        to: `anhtu-test-${id}@yopmail.com`,
        subject: 'Test Notification',
        text: `You have an unread message`,
      },
      (error, info) => {
        if (error) {
          console.log(`Error: ${error.message}`);
          return reject(new Error(`${JSON.stringify(error)}`));
        }

        console.log(`Message sent anhtu-test-${id}@yopmail.com`);
        resolve('Success');
      }
    );
  });
};

module.exports = {
  sendEmail,
};
