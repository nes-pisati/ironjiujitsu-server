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

const greyBelts = ['greywhite', 'grey', 'greyblack']
const yellowBelts = ['yellowwhite', 'yellow', 'yellowblack']
const orangeBelts = ['orangewhite', 'orange', 'orangeblack']
const greenBelts = ['greenwhite', 'green', 'greenblack']

export default function validateAthlete(req: Request, res: Response, next: NextFunction): any {
    const { name, surname, birthDate, email, phoneNumber, type, belt } = req.body as AthleteBody;

    const actualYear = new Date().getFullYear()

    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) {
        return res.status(400).json({ error: 'Data di nascita non valida' })
    }
    const athleteBirthYear = birth.getFullYear()
    const athleteAge = actualYear - athleteBirthYear;

    // Controllo presenza dei campi
    if (!name || !surname || !birthDate || !email || !phoneNumber || !type || !belt) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori' })
    }

    // Validazione tipi di dato
    if (typeof name !== 'string' || typeof surname !== 'string' || typeof email !== 'string' || typeof phoneNumber !== 'string') {
        return res.status(400).json({ error: 'I campi nome, cognome, email e numero di telefono devono essere di tipo stringa' })
    }

    // Validazione email
    if (!isEmailValid(email)) {
        return res.status(400).json({ error: 'Inserisci un indirizzo email valido' })
    }

    // Criteri di età per essere adult
    if (athleteAge < 16 && type === 'adult') {
        return res.status(400).json({ error: 'L\'atleta non ha un\'età adeguata al tipo adult' })
    }

    // Criteri di età per essere kids
    if (athleteAge > 16 && type === 'kids') {
        return res.status(400).json({ error: 'L\'atleta non ha un\'età adeguata al tipo kids' })
    }

    // Controlla che non venga inserito un tipo diverso da kids o adult
    if (!['adult', 'kids'].includes(type)) {
        return res.status(400).json({ error: 'Tipo atleta non valido: può essere solo Adult o Kids' })
    }

    // Controlla che vengano assegnate solo cinture Adult per tipo adult
    if (type === 'adult' && !isAdultBelt(belt)) {
        return res.status(400).json({ error: 'Cintura non valida per il tipo adult' })
    }

    // Controlla che vengano assegnate solo cinture per Kids al tipo kids
    if (type === 'kids' && !isKidsBelt(belt)) {
        return res.status(400).json({ error: 'Cintura non valida per il tipo kids' })
    }

    // Bambini sotto i 7 anni possono avere solo cinture grigie
    if (type === 'kids' && athleteAge < 7 && !greyBelts.includes(belt)) {
        return res.status(400).json({ error: 'Cintura non valida per questa età' });
    }

    // Bambini sotto i 10 anni possono avere solo cinture grigie o gialle
    if (type === 'kids' && athleteAge < 10 && !(greyBelts.includes(belt) || yellowBelts.includes(belt))) {
        return res.status(400).json({ error: 'Cintura non valida per questa età' });
    }

    // Bambini sotto i 13 anni NON possono avere cinture verdi
    if (type === 'kids' && athleteAge < 13 && greenBelts.includes(belt)) {
        return res.status(400).json({ error: 'Cintura non valida per questa età' });
    }

    // Adulti sotto i 18 anni NON possono avere cinture marroni o nere
    if (type === 'adult' && athleteAge < 18 && (belt === 'brown' || belt === 'black')) {
        return res.status(400).json({ error: 'Cintura non valida per questa età' });
    }

    //Adulti sotto i 19 anni NON possono avere la cintura nera
    if (type === 'adult' && athleteAge < 19 && belt === 'black') {
        return res.status(400).json({ error: 'Cintura non valida per questa età' });
    }

    return next();
}