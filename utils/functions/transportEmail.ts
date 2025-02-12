import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.HOST_NODEMAILER,
    port: +process.env.PORT_NODEMAILER,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
    }
});