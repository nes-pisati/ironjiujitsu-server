import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Athlete } from '../models/athlete.model';

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const result = await Athlete.updateMany(
      { whatsappConsent: { $exists: false } },
      {
        $set: {
          whatsappConsent: true,
          whatsappConsentDate: new Date(),
          whatsappConsentSource: 'legacy'
        }
      }
    );

    console.log('Atleti aggiornati:', result.modifiedCount);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
