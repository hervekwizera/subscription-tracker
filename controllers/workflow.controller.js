import {createRequire} from 'modele';
const require = createRequire (import.meta.url);
const {serve} = require('@upstash/workflow/express');


export const sendReminders = serve(async (context)=>{
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);
    if (!subscription || subscription.status !== active) return;

    const renewalDate =

} );


