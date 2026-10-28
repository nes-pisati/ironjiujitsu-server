import express, { Router } from 'express';
import { createAthlete, deleteAthlete, getAllAthletes, getAthleteById, setAthleteArchived, updateAthlete } from '../controller/athlete_controller';
import  validateAthlete from '../middlewares/athlete/athlete_validator'

const router: Router = express.Router();

//POST
router.post('/post', validateAthlete, createAthlete);

//GETALL
router.get('/get', getAllAthletes)

//GETBYID
router.get('/get/:id', getAthleteById)

//UPDATE
router.put('/edit/:id', validateAthlete, updateAthlete)

//ARCHIVE
router.put('/archive/:id', setAthleteArchived)

//DELETE
router.delete('/delete/:id', deleteAthlete)

export default router;
