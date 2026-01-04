import express, { Router } from 'express';
import { createSubscription, getAllSubscriptions, getSubscriptionByAthlete, getSubscriptionById, updateSubscription } from '../controller/subscription_controller';

const router: Router = express.Router();

//POST
router.post('/post/:athleteId', createSubscription)

//GET BY ATHLETE
router.get('/getbyathlete/:athleteId', getSubscriptionByAthlete)

//GET ALL
router.get('/getall', getAllSubscriptions)

//UPDATE
router.put('/edit/:id', updateSubscription)

//GET BY ID
router.get('/get/:id', getSubscriptionById);


//GET ALL MENSILI E TRIMESTRALI
// router.get('/getactivesubscriptions', getAllActiveSubscriptions)

//GET INGRESSI SINGOLI
// router.get('/getsingleentries', getAllSingleEntries)


export default router;