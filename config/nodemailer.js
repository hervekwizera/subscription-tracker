import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'hervekwizera63@gmail.com',
        pass: EMAIL_PASSWORD
    }
})