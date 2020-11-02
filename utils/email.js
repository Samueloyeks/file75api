const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url, attachmentPaths) {
    this.to = user.email;
    this.firstName = user.fullName.split(' ')[0];
    this.url = url;
    this.from = `Asset and Equity <${process.env.EMAIL}>`;
    this.attachmentPaths = attachmentPaths
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport(
        mailgun({
          auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
          },
        })
      );
    }

    return nodemailer.createTransport(
      mailgun({
        auth: {
          api_key: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        },
      })
    );
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const fileAttachments = [];

    for (var filePath of this.attachmentPaths) {
      fileAttachments.push({ path: `${__dirname}/../${filePath}` })
    }


    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
      attachments: [
        ...fileAttachments,
        {
          filename: 'logo.png',
          path: `${__dirname}/../public/images/logo.png`,
          cid: 'logo',
        },
      ],
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err)
        // eslint-disable-next-line no-console
        return console.log('Error occurs');
      }
      // eslint-disable-next-line no-console
      return console.log('Email sent!!!');
    });
  }

  async welcome() {
    await this.send('welcome', 'Welcome to My File !');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
