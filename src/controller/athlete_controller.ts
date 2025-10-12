import { Request, Response } from 'express';
import { Athlete } from '../models/athlete.model';
import { AthleteBody } from '../types/types';

export const createAthlete = async (
  req: Request<{}, {}, AthleteBody>,
  res: Response): Promise<any> => {
  try {
    const newAthlete = await Athlete.create(req.body);
    res.status(201).json(newAthlete);
  } catch (error) {
    res.status(400).json({
      error: 'Errore nella creazione dell’atleta',
      details: error,
    });
  }
};

export const getAllAthletes = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allAthletes = await Athlete.find();
    res.status(200).json(allAthletes)
  } catch (error) {
    res.status(400).json({
      error: 'Errore nel recupero delle informazioni sugli atleti',
      details: error,
    });
  }
}

export const getAthleteById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const { id }  = req.params;

  try {
    const athlete = await Athlete.findById(id)

    if (!athlete) {return res.status(404).json({ error: 'Atleta non trovato' })}
    return res.status(200).json(athlete)
  } catch (error) {
    res.status(400).json({
      error: 'Errore nel recupero delle informazioni sull\'atleta',
      details: error,
    });
  }
}

export const updateAthlete = async (
  req: Request<{ id: string }, {}, AthleteBody>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const obj = req.body

  try {
    const editedAthlete = await Athlete.findByIdAndUpdate(id, obj)
    return res.status(200).json(editedAthlete)
  } catch (error) {
    res.status(400).json({
      error: 'Errore nell\'aggiornamento dell\'atleta',
      details: error,
    });
  }
}

export const deleteAthlete = async (
  req: Request<{ id: string}>,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const athleteToDelete = await Athlete.findByIdAndDelete(id)
    return res.status(200).json({message: 'Atleta rimosso correttamente'})
  } catch (error) {
    res.status(400).json({
      error: 'Errore nell\'eliminazione dell\'atleta',
      details: error,
    });
  }
}

//GET ALL WITH SUBSCRIPTIONS 

//GET BY ID WITH SUBSCRIPTION 