import { Request, Response } from 'express';
import { User } from '../models/users.model';
import { UserBody } from '../types/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

export const createUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response): Promise<any> => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username già in uso' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: 'Errore nella creazione dell’utente',
      details: error,
    });
  }
};

export const loginUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Password non valida' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: 'user' },
      jwtSecretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante il login',
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
  const { id } = req.params;

  try {
    const user = await User.findById(id)

    if (!user) { return res.status(404).json({ error: 'Utente non trovato' }) }
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
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Utente rimosso correttamente' })
  } catch (error) {
    res.status(400).json({
      error: 'Errore nell\'eliminazione dell\'utente',
      details: error,
    });
  }
}