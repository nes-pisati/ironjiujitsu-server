import { Request, Response } from 'express';
import { Athlete } from '../models/athlete.model';
import { getExpirationDate } from '../utils/athleteUtils';
import { CreateAthleteBody, UpdateAthleteBody } from '../dto/athlete.dto';
import { Subscription } from '../models/subscription.model';
import { normalizeItalianPhone } from '../utils/phoneNumberUtils';

export const createAthlete = async (
  req: Request<{}, {}, CreateAthleteBody>,
  res: Response
): Promise<any> => {

  const data = req.body;

  try {
    const medicalCertificateExp = data.medicalCertificateReleaseDate
      ? getExpirationDate(data.medicalCertificateReleaseDate)
      : undefined;

    const ensuranceExp = data.ensuranceStartDate
      ? getExpirationDate(data.ensuranceStartDate)
      : undefined;

    const newAthlete = await Athlete.create({
      ...data,
      phoneNumber: normalizeItalianPhone(data.phoneNumber), // 👈 QUI
      ...(medicalCertificateExp && { medicalCertificateExp }),
      ...(ensuranceExp && { ensuranceExp })
    });

    res.status(201).json(newAthlete);
  } catch (error) {
    res.status(400).json({
      error: 'Errore nella creazione dell’atleta',
      details: error
    });
  }
};


export const getAllAthletes = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const athletes = await Athlete.find().populate('subscriptionId');
    res.status(200).json(athletes);
  } catch (error) {
    res.status(400).json({
      error: 'Errore nel recupero degli atleti',
      details: error
    });
  }
};


export const getAthleteById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  try {
    const athlete = await Athlete.findById(req.params.id)
      .populate('subscriptionId');

    if (!athlete) {
      return res.status(404).json({ error: 'Atleta non trovato' });
    }

    res.status(200).json(athlete);
  } catch (error) {
    res.status(400).json({
      error: "Errore nel recupero dell'atleta",
      details: error
    });
  }
};

// export const getAthleteByIdWithSubscription = async (
//   req: Request<{ id: string }>,
//   res: Response
// ) => {
//   const { id } = req.params;

//   try {
//     // Trova l'atleta e popola subscriptionId
//     const athlete = await Athlete.findById(id)
//       .populate('subscriptionId'); // <-- popola tutti i campi dell'abbonamento

//     if (!athlete) {
//       return res.status(404).json({ error: 'Atleta non trovato' });
//     }

//     res.status(200).json(athlete);
//   } catch (error) {
//     res.status(400).json({
//       error: "Errore nel recupero dell'atleta",
//       details: error
//     });
//   }
// };


export const updateAthlete = async (
  req: Request<{ id: string }, {}, UpdateAthleteBody>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updateData: any = { ...data };

    if (data.phoneNumber) {
      updateData.phoneNumber = normalizeItalianPhone(data.phoneNumber); // 👈 QUI
    }

    if (data.medicalCertificateReleaseDate) {
      updateData.medicalCertificateExp = getExpirationDate(
        data.medicalCertificateReleaseDate
      );
    }

    if (data.ensuranceStartDate) {
      updateData.ensuranceExp = getExpirationDate(
        data.ensuranceStartDate
      );
    }

    delete updateData.subscriptionId;

    const updatedAthlete = await Athlete.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedAthlete) {
      return res.status(404).json({ error: 'Atleta non trovato' });
    }

    return res.status(200).json(updatedAthlete);
  } catch (error) {
    res.status(400).json({
      error: "Errore nell'aggiornamento dell'atleta",
      details: error
    });
  }
};

export const deleteAthlete = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    await Subscription.findOneAndDelete({ athleteId: id });
    await Athlete.findByIdAndDelete(id);

    res.status(200).json({ message: 'Atleta rimosso correttamente' });
  } catch (error) {
    res.status(400).json({
      error: "Errore nell'eliminazione dell'atleta",
      details: error
    });
  }
};

//GET ALL WITH SUBSCRIPTIONS 

//GET BY ID WITH SUBSCRIPTION 