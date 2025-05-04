import { Request, Response, NextFunction } from 'express'
import { AthleteBody, AdultsBelts, KidsBelts, AthleteType } from '../../types/types'

function isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

function isAdultBelt(belt: string): belt is AdultsBelts {
    return (AdultsBelts as readonly string[]).includes(belt)
}

function isKidsBelt(belt: string): belt is KidsBelts {
    return (KidsBelts as readonly string[]).includes(belt)
}

export default function validateAthlete(req: Request, res: Response, next: NextFunction): any{
    const { name, surname, birthDate, email, phoneNumber, type, belt } = req.body as AthleteBody;

    if(!name || !surname || !birthDate || !email || !phoneNumber || !type || !belt) {
        return res.status(400).json({error: 'Tutti i campi sono obbligatori'})
    }

    if( typeof name !== 'string' || typeof surname !== 'string' || typeof email !== 'string' || typeof phoneNumber !== 'string') {
        return res.status(400).json({error: 'I campi nome, cognome, email e numero di telefono devono essere di tipo stringa'})
    }

    if(!isEmailValid(email)) {
        return res.status(400).json({error: 'Inserisci un indirizzo email valido'})
    }

    const actualYear = new Date().getFullYear()

    const birth = new Date(birthDate);
    if(isNaN(birth.getTime())) {
        return res.status(400).json({error: 'Data di nascita non valida'})
    }
    const athleteBirthYear = birth.getFullYear()

    if(actualYear-athleteBirthYear < 16 && type === 'adult') {
        return res.status(400).json({error: 'L\'atleta non ha un\'età adeguata al tipo adult'})
    }

    if(actualYear-athleteBirthYear > 16 && type === 'kids') {
        return res.status(400).json({error: 'L\'atleta non ha un\'età adeguata al tipo kids'})
    }

    if(!['adult', 'kids'].includes(type)) {
        return res.status(400).json({error: 'Tipo atleta non valido: può essere solo Adult o Kids'})
    }

    if(type === 'adult' && !isAdultBelt(belt)) {
        return res.status(400).json({error: 'Cintura non valida per il tipo adult'})
    }

    if(type === 'kids' && !isKidsBelt(belt)) {
        return res.status(400).json({error: 'Cintura non valida per il tipo kids'})
    }

    return next();
}