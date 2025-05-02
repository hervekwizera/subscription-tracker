import{emailTemplates} from './email-template'
import dayjs from 'dayjs';
import transporter,{ accountEmail } from '../config/nodemailer.js';

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required parameters");
  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error("Invalid email type");

  const mailInfor = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewaldate: dayjs(subscription.renewalDate).format("MMM D,YYYY"),
    PlanName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethode,
  };
  const message = template.generateBody(mailInfor);
  const subject = template.generateSubject(mailInfor);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions,(error, info)=>{
    if(error) return console.log(error,'Error sending email');
    console.log('Email sent: ' + mailInfor.response);
  })


};
