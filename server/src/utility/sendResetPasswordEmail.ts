import nodemailer from 'nodemailer';
import { dev } from '../config/index';

export const sendPasswordEmail = async (
  id: string,
  name: string,
  email: string,
  title: string,
  token: string,
  url: string
) => {
  try {
    //create transporter
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: dev.app.authEmail,
        pass: dev.app.authPassword,
      }
    });

    const mailOptions = {
      from: dev.app.authEmail,
      to: email, //list of receivers
      subject: title,
      html: `<p>Hi ${name}!! \n<a href="http://localhost:3000/reset-password/${token}">\nPlease click on this link to reset password.</p>`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};