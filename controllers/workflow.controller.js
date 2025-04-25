import dayjs from "dayjs";
import Subscription from "../models/subscription.model";

import { createRequire } from "modele";
import Subscription from "../models/subscription.model";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7,5,2,1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== active) return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`renewal date has passed for subscription ${subscriptionId}.stopping worlflow.`);
    return; 
  }
 for(const daysBefore of REMINDERS){
    const reminderDate = renewalDate.subtract(daysBefore , 'day');
    if(reminderDate.isAfter(dayjs())){
      await sleepUntilReminder(context, `reminder ${daysBefore} days before`)
    }
    await triggerReminder(context,`Reminder ${daysBefore} days before`);
 }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, reminderDate)=>{
    console.log(`sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder = async(context,label) =>{
    return await context.run(label,() =>{
        console.log(`Triggering ${label} reminder`);
        //send email, sms, push notification. 
    })
}