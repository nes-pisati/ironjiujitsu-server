import cron from 'node-cron';
import { sendWhatsappMessage } from '../services/whatsapp.service';
import { Subscription } from '../models/subscription.model';

cron.schedule('* * * * *', async () => {

  console.log('⏰ Cron WhatsApp avviato');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDays = new Date(today);
  sevenDays.setDate(today.getDate() + 7);

  const threeDays = new Date(today);
  threeDays.setDate(today.getDate() + 3);

  // 🔎 Prendiamo tutte le subscription che scadono entro 7 giorni
  const subscriptions = await Subscription.find({
    subscriptionExp: { $lte: sevenDays }
  }).populate('athleteId');

  console.log('Subscriptions trovate:', subscriptions.length);

  for (const sub of subscriptions) {

    const athlete: any = sub.athleteId;
    if (!athlete?.whatsappConsent) continue;
    if (!athlete?.phoneNumber) continue;

    const expDate = new Date(sub.subscriptionExp);
    expDate.setHours(0, 0, 0, 0);

    let reminderType: '7_DAYS' | '3_DAYS' | 'EXPIRED' | null = null;

    if (expDate.getTime() === sevenDays.getTime()) {
      reminderType = '7_DAYS';
    } else if (expDate.getTime() === threeDays.getTime()) {
      reminderType = '3_DAYS';
    } else if (expDate.getTime() < today.getTime()) {
      reminderType = 'EXPIRED';
    }

    if (!reminderType) continue;

    console.log(`Invio ${reminderType} a ${athlete.name}`);

    await sendWhatsappMessage({
      phone: athlete.phoneNumber,
      name: athlete.name,
      reminderType
    });
  }

});
