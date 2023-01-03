const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL, //email ID
    pass: process.env.USER_PASSWORD, //Password
  },
});
const EmailController = {
  send: (email, name, subject, otp, reset, status) => {
    let templates = {};
    templates.pass = reset
      ? `
    <p>Magandang araw ${name},<br/>
      Nakalimutan mo ba ang iyong password?<br/><br/>
      Natanggap namin ang iyong kahilingan sa pagreset ng password para sa iyong account.<br/><br/>
      Para mareset ang iyong password, narito ang iyong one time password <a href="#">${otp}</a>.
    </p><br/><br/>Maraming Salamat!</p>`
      : `
    <p>Magandang araw ${name},<br/><br/>
       Para makagawa ng iyong password,  narito ang iyong one time password <a href="#">${otp}</a><br/><br/>Maraming Salamat!</p></p>.`;
    templates.approved = ` <p>Magandang araw ${name},<br/><br/>
       Ang iyong account ay kasulukuyang naapproved na ng administrator.<br/><br/>Maraming Salamat!</p>`;
    templates.removed = `
    <p>Magandang araw ${name},<br/><br/> Ang iyong account ay nareject! Maaring kontakin ang iyong administrator.<br/><br/>Maraming Salamat!</p>`;
    const mailOptions = {
      from: '"TRI-SAKAY Notification" <foo@example.com>',
      to: email,
      subject: subject,
      html:
        otp !== ""
          ? templates.pass
          : status === 1
          ? templates.approved
          : templates.removed,
    };
    transporter.sendMail(mailOptions);
  },
};

module.exports = EmailController;
