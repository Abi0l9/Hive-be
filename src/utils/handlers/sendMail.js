const config = require("../config");
const nodemailer = require("nodemailer");

const sendMail = async ({ user, code, email }) => {
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
    subject: "Verification Code",
    text: `${code}`,
    html: `
    <section style="font-family: Arial, Helvetica, sans-serif">
    <h2>New Verification Code</h2>
    <p>Hi, <b>${user}</b>!</p>
    <p>Below is your verification code.</p>
    <p>
      <span
        style="
          padding: 8px 16px;
          background-color: rgb(21, 41, 41);
          font-weight: bold;
          font-size: large;
          border-radius: 5px;
          border: 0 solid rgb(21, 41, 41);
          color: white;
        "
        >12345</span
      >
    </p>
    <p><small>code will expire in 15 minutes.</small></p>
    <p>
      If you didn't request for a verification code, please, ignore this
      message.
    </p>
    <b>Thanks.</b>
  </section>
    `,
  });

  console.log("message sent");
};

module.exports = sendMail;
