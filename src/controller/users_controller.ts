import { Request, Response } from 'express';
import { User } from '../models/users.model';
import { UserBody } from '../types/types';

export const createUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response): Promise<any> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: 'Errore nella creazione dell’utente',
      details: error,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(400).json({
      error: 'Errore nel recupero delle informazioni sugli utenti',
      details: error,
    });
  }
}

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const { id }  = req.params;

  try {
    const user = await User.findById(id)

    if (!user) {return res.status(404).json({ error: 'Utente non trovato' })}
    return res.status(200).json(user)
  } catch (error) {
    res.status(400).json({
      error: 'Errore nel recupero delle informazioni sull\'utente',
      details: error,
    });
  }
}

export const updateUser = async (
  req: Request<{ id: string }, {}, UserBody>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const obj = req.body

  try {
    const editedUser = await User.findByIdAndUpdate(id, obj)
    return res.status(200).json(editedUser)
  } catch (error) {
    res.status(400).json({
      error: 'Errore nell\'aggiornamento dell\'atleta',
      details: error,
    });
  }
}

export const deleteUser = async (
  req: Request<{ id: string}>,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByIdAndDelete(id)
    return res.status(200).json({message: 'Utente rimosso correttamente'})
  } catch (error) {
    res.status(400).json({
      error: 'Errore nell\'eliminazione dell\'utente',
      details: error,
    });
  }
}