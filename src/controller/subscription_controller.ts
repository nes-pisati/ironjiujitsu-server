import { Request, Response } from 'express';
import { Subscription } from '../models/subscription.model';
import { SubscriptionBody } from '../types/types';
import { isSubscriptionActive, getSubscriptionExp } from '../utils/subscriptionUtils';
import { Athlete } from './../models/athlete.model';

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
            athleteId: athleteId || subscriptionData.athleteId || undefined,
            subscriptionExp
        });

        if (athleteId && subscriptionExp > new Date()) {
            if (isSubscriptionActive(subscriptionData)) {
                await Athlete.findByIdAndUpdate(athleteId, {
                    $set: { subscriptionId: newSubscription._id }
                });
            }
        }

        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(400).json({
            error: 'Errore nella creazione dell’abbonamento o ingresso',
            details: error,
        });
    }
};

//GET BY ATHLETE
export const getSubscriptionsByAthlete = async (
    req: Request<{ athleteId: string }>,
    res: Response
): Promise<any> => {
    try {
        const { athleteId } = req.params;

        const subscriptions = await Subscription.find({ athleteId })
            .sort({ date: -1 });

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(400).json({
            error: 'Errore nel recupero dello storico abbonamenti',
            details: error,
        });
    }
};

//GET ALL (get di tutte le subscription)
export const getAllSubscriptions = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json(subscriptions)
    } catch (error) {
        res.status(400).json({
            error: 'Errore nel recupero della lista abbonamenti',
            details: error,
        });
    }
}

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