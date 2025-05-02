export const sendReminderEmail = async({to,type,subscription})=>{
 if(!to || !type) throw new Error('Missing required parameters');
 const template = emailTemplates.find((t)=>t.label===type);
 if(!template)throw new Error('Invalid email type');

 const mailInfor ={
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewaldate: dayjs(subscription.renewalDate).format('MMM D,YYYY'),
    PlanName: subscription.name,
    price:`${subscription.currency} ${subscription.price} (${subscription.frequency})`, 
    paymentMethod: subscription.paymentMethode,
 }
 
}