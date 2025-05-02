import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js"; // Add `.js` extension if needed
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return; 
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `reminder ${daysBefore} days before`, reminderDate);
    }
    await triggerReminder(context, `Reminder ${daysBefore} days before`,subscription);
  }
});
 


const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    const subscription = await Subscription.findById(subscriptionId).populate("user", "name email");
    return subscription ? subscription.toObject() : null;
  });
};

const triggerReminder = async (context, label,subscription) =>{
  return await context.run(label, async() => {
    console.log(`Triggering ${label} reminder`);
    // send email, sms, push notification here

    await sendReminderEmail({
      to: subscription.user.email,
      type: reminder.label.subscription,
    })
  });
};
