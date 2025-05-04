import { Schema, model, Document } from 'mongoose';
import { AthleteBody, AthleteType, KidsBelts, AdultsBelts, Belt } from '../types/types';

export interface AthleteDocument extends AthleteBody, Document {}

const athleteTypes: AthleteType[] = ['adult', 'kids'];

const kidsBelt: KidsBelts[] = [
  'white', 'greywhite', 'grey', 'greyblack',
  'yellowwhite', 'yellow', 'yellowblack',
  'orangewhite', 'orange', 'orangeblack',
  'greenwhite', 'green', 'greenblack'
];

const adultBelts: AdultsBelts[] = ['white', 'blue', 'purple', 'brown', 'black'];

const allBelts: Belt[] = [...new Set([...kidsBelt, ...adultBelts])];

const AthleteSchema = new Schema<AthleteDocument>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: athleteTypes,
        required: true
    },
    belt: {
        type: String,
        enum: allBelts,
        required: true
    }
}, { timestamps: true })

export const Athlete = model<AthleteDocument>('Athlete', AthleteSchema)