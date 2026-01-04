import { Request, Response } from 'express';
import { Subscription } from '../models/subscription.model';
import { SubscriptionBody } from '../types/types';
import { isSubscriptionActive, getSubscriptionExp } from '../utils/subscriptionUtils';
import { Athlete } from './../models/athlete.model';
import { CreateSubscriptionBody, UpdateSubscriptionBody } from '../dto/subscriptions.dto';

//const athleteModel = require('../models/athlete_model')

//POST
export const createSubscription = async (
    req: Request<{ athleteId: string }, {}, SubscriptionBody>,
    res: Response
  ): Promise<any> => {
    const { athleteId } = req.params;
    const subscriptionData = req.body;
  
    try {
      const subscriptionExp = getSubscriptionExp(subscriptionData);
  
      const newSubscription = await Subscription.create({
        ...subscriptionData,
        athleteId,
        hasAlreadyPaid: true,
        subscriptionExp
      });
  
      // Aggiorna atleta solo se abbonamento attivo
      if (subscriptionExp > new Date() && isSubscriptionActive(newSubscription)) {
        await Athlete.findByIdAndUpdate(athleteId, {
          $set: { subscriptionId: newSubscription._id }
        });
      }
  
      res.status(201).json(newSubscription);
    } catch (error) {
      res.status(400).json({
        error: 'Errore nella creazione dell’abbonamento o ingresso',
        details: error
      });
    }
  };
  
  
  

//GET BY ATHLETE
export const getSubscriptionByAthlete = async (
    req: Request<{ athleteId: string }>,
    res: Response
  ): Promise<any> => {
    try {
      const { athleteId } = req.params;
  
      const subscription = await Subscription.findOne({ athleteId });
  
      if (!subscription) {
        return res.status(404).json({ error: 'Abbonamento non trovato' });
      }
  
      res.status(200).json(subscription);
    } catch (error) {
      res.status(400).json({
        error: 'Errore nel recupero dell’abbonamento',
        details: error
      });
    }
  };


// GET subscription by Subscription ID
export const getSubscriptionById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    const { id } = req.params;
    console.log('ID ricevuto:', id);
    try {
      const subscription = await Subscription.findById(id);
      if (!subscription) {
        return res.status(404).json({ error: 'Abbonamento non trovato' });
      }
      res.status(200).json(subscription);
    } catch (error) {
      res.status(400).json({ error: 'Errore nel recupero dell\'abbonamento', details: error });
    }
  };
  
  

//GET ALL (get di tutte le subscription)
export const getAllSubscriptions = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const subscriptions = await Subscription.find();
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(400).json({
        error: 'Errore nel recupero della lista abbonamenti',
        details: error
      });
    }
  };
  
  

//UPDATE
export const updateSubscription = async (
    req: Request<{ id: string }, {}, SubscriptionBody>,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    const subscriptionData = req.body;
  
    try {
      // Recupero esistente
      const existingSubscription = await Subscription.findById(id);
      if (!existingSubscription) {
        return res.status(404).json({ error: 'Abbonamento non trovato' });
      }
  
      // Calcolo nuova scadenza
      const subscriptionExp = getSubscriptionExp({
        date: subscriptionData.date ?? existingSubscription.date,
        type: subscriptionData.type ?? existingSubscription.type
      });
  
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        id,
        {
          ...subscriptionData,
          subscriptionExp
        },
        { new: true }
      );

      if (!updatedSubscription) {
        return res.status(404).json({ error: 'Abbonamento non trovato' });
      }
  
      // Aggiorna athlete subscriptionId solo se esiste
      if (updatedSubscription.athleteId) {
        const isActive = isSubscriptionActive(updatedSubscription);
        if (subscriptionExp > new Date() && isActive) {
          await Athlete.findByIdAndUpdate(updatedSubscription.athleteId, {
            $set: { subscriptionId: updatedSubscription._id }
          });
        } else {
          await Athlete.findByIdAndUpdate(updatedSubscription.athleteId, {
            $unset: { subscriptionId: '' }
          });
        }
      }
  
      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(400).json({
        error: 'Errore nell\'aggiornamento dell\'abbonamento',
        details: error
      });
    }
  };

  export const deleteSubscription = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
  
    try {
      const subscription = await Subscription.findByIdAndDelete(id);
  
      if (!subscription) {
        return res.status(404).json({ error: 'Abbonamento non trovato' });
      }
  
      // Rimuovo riferimento in atleta
      await Athlete.findByIdAndUpdate(subscription.athleteId, {
        $unset: { subscriptionId: '' }
      });
  
      res.status(200).json({ message: 'Abbonamento eliminato correttamente' });
    } catch (error) {
      res.status(400).json({
        error: 'Errore nell\'eliminazione dell\'abbonamento',
        details: error
      });
    }
  };
  
  
  

//GET MENSILI E TRIMESTRALI
// export const getAllActiveSubscriptions = async (
//     req: Request,
//     res: Response
// ): Promise<any> => {
//     try {
//         const subscriptions = await Subscription.find({
//             type: { $in: ['month', 'quarterly'] }
//         }).populate({
//             path: 'athleteId',
//             select: 'name surname'
//         }).sort({ date: -1 });

//         res.status(200).json(subscriptions);
//     } catch (error) {
//         res.status(400).json({
//             error: 'Errore nel recupero degli abbonamenti mensili/trimestrali',
//             details: error,
//         });
//     }
// };

//GET ALL INGRESSI SINGOLI
// export const getAllSingleEntries = async (
//     req: Request,
//     res: Response
//   ): Promise<any> => {
//     try {
//       const entries = await Subscription.find({
//         type: 'single'
//       }).sort({ date: -1 });
  
//       res.status(200).json(entries);
//     } catch (error) {
//       res.status(400).json({
//         error: 'Errore nel recupero degli ingressi singoli',
//         details: error,
//       });
//     }
//   };