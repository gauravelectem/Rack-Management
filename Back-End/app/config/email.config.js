const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  ssl: false,
  tls: true,
  auth: {
     user: 'ec73e7fc551eeb',
     pass: '294d09e53bedb7'
  }
});

