import express, { Router } from 'express';
import { createSubscription, getAllActiveSubscriptions, getAllSingleEntries, getAllSubscriptions, getSubscriptionsByAthlete } from '../controller/subscription_controller';

const router: Router = express.Router();

//POST
router.post('/post/', createSubscription)
router.post('/post/:athleteId', createSubscription)

//GET BY ATHLETE
router.get('/getbyathlete/:athleteId', getSubscriptionsByAthlete)

//GET ALL
router.get('/getall', getAllSubscriptions)

//GET ALL MENSILI E TRIMESTRALI
router.get('/getactivesubscriptions', getAllActiveSubscriptions)

//GET INGRESSI SINGOLI
router.get('/getsingleentries', getAllSingleEntries)


export default router;