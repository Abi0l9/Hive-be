const config = require("../config");
const nodemailer = require("nodemailer");

const sendRegCongrats = async ({ user, email }) => {
  let transporter = nodemailer.createTransport({
    host: config.HOST,
    port: config.EPORT,
    auth: {
      user: "api",
      pass: config.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Hive <mailtrap@feadohonline.online>"`,
    to: `${email}`,
    subject: `Congratulations ${user}🎉`,
    text: `Account Verified!`,
    html: `
    <section style="font-family: Arial, Helvetica, sans-serif">
    <h2 style="
        font-weight: bold;
        font-size: large;
    ">
        Account Verified!
    </h2>
    <p>Hi, <b>${user}</b>!</p>
    <p>Your account has been verified.</p>
    <p>
      More than 1,000 jobs are waiting for you. Log into your account, now, and start applying.
    </p>
   
    <b>Thanks.</b>
  </section>
    `,
  });

  console.log("message sent");
};

module.exports = sendRegCongrats;
