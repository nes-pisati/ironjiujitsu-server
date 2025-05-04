import express, { Router } from 'express';
import { createAthlete, deleteAthlete, getAllAthletes, getAthleteById, updateAthlete } from '../controller/athlete_controller';

const router: Router = express.Router();

//POST
router.post('/post', createAthlete);

//GETALL
router.get('/get', getAllAthletes)

//GETBYID
router.get('/get/:id', getAthleteById)

//UPDATE
router.put('/edit/:id', updateAthlete)

//DELETE
router.delete('/delete/:id', deleteAthlete)

export default router;
