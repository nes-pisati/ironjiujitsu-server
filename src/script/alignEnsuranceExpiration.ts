import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Athlete } from '../models/athlete.model';
import { getEnsuranceExpirationDate } from '../utils/athleteUtils';

dotenv.config();

const shouldApply = process.argv.includes('--apply');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const athletes = await Athlete.collection
      .find({ ensuranceStartDate: { $exists: true } })
      .project({ ensuranceStartDate: 1 })
      .toArray();

    const now = new Date();
    const expirationsByYear: Record<string, number> = {};
    let withoutValidStartDate = 0;
    let expiredAfterAlignment = 0;

    const operations = athletes.map((athlete) => {
      const startDate = new Date(athlete.ensuranceStartDate);

      if (!athlete.ensuranceStartDate || isNaN(startDate.getTime())) {
        withoutValidStartDate++;
        return {
          updateOne: {
            filter: { _id: athlete._id },
            update: { $unset: { ensuranceStartDate: '' } }
          }
        };
      }

      const ensuranceExp = getEnsuranceExpirationDate(startDate);
      const expirationYear = String(ensuranceExp.getUTCFullYear());

      expirationsByYear[expirationYear] = (expirationsByYear[expirationYear] ?? 0) + 1;

      if (ensuranceExp < now) {
        expiredAfterAlignment++;
      }

      return {
        updateOne: {
          filter: { _id: athlete._id },
          update: {
            $set: { ensuranceExp },
            $unset: { ensuranceStartDate: '' }
          }
        }
      };
    });

    console.log('Database:', mongoose.connection.name);
    console.log('Atleti da aggiornare:', operations.length);
    console.log('Scadenze al 31/8 per anno:', expirationsByYear);
    console.log('Assicurazioni scadute dopo il riallineamento:', expiredAfterAlignment);
    console.log('Atleti senza data di attivazione valida (scadenza invariata):', withoutValidStartDate);

    if (!shouldApply) {
      console.log('Simulazione: nessuna modifica eseguita. Usa --apply per salvare.');
      process.exit(0);
    }

    if (operations.length > 0) {
      const result = await Athlete.collection.bulkWrite(operations);
      console.log('Atleti aggiornati:', result.modifiedCount);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
