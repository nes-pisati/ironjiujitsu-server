import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../../models/users.model';
import { UserBody } from '../../types/types';

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

interface AuthenticatedRequest extends Request {
    creator?: UserBody;
}

const authUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : header;

    if (!token) {
        return res.status(401).json({ message: 'Token inesistente!' });
    }

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    } catch (error) {
        return res.status(401).json({ message: 'Token non valido o scaduto' });
    }

    try {
        const creator = await User.findById(decoded.id);

        if (!creator) {
            return res.status(401).json({ message: 'Utente inesistente' });
        }

        req.creator = creator;

        if (decoded.role && decoded.role === 'user') {
            next();
        } else {
            return res.status(403).json({ message: 'Accesso negato' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Errore durante la verifica del token' });
    }
};

export default authUser;
