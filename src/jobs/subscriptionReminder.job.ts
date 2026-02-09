import cron from 'node-cron';
import { sendWhatsappMessage } from '../services/whatsapp.service';
import { Subscription } from '../models/subscription.model';

cron.schedule('0 9 * * *', async () => {

  const today = new Date();
  const day = today.getDate();

  let reminderType: '7_DAYS' | '3_DAYS' | 'EXPIRED' | null = null;

  if (day === 8) reminderType = '7_DAYS';
  if (day === 12) reminderType = '3_DAYS';
  if (day === 15) reminderType = 'EXPIRED';

  if (!reminderType) return;

  const start = new Date(today.getFullYear(), today.getMonth(), 15);
  const end = new Date(today.getFullYear(), today.getMonth(), 16);

  const subscriptions = await Subscription.find({
    subscriptionExp: {
      $gte: start,
      $lt: end
    },
    hasAlreadyPaid: false
  }).populate('athleteId');


  for (const sub of subscriptions) {
    const athlete: any = sub.athleteId;

    if (!athlete?.whatsappConsent) continue;
    if (!athlete?.phoneNumber) continue;

    await sendWhatsappMessage({
      phone: athlete.phoneNumber,
      name: athlete.name,
      reminderType
    });
  }
});
