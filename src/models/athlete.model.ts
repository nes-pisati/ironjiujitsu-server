import { Schema, model, Document, Types } from 'mongoose';
import { AthleteBody, AthleteType, KidsBelts, AdultsBelts, Belt, GenderType, EnsuranceType } from '../types/types';

export interface AthleteDocument extends Document, AthleteBody {
    subscriptionId?: Types.ObjectId;
}

const athleteTypes: AthleteType[] = ['adult', 'kids'];

const genderTypes: GenderType[] = ['M', 'F'];

const ensuranceTypes: EnsuranceType[] = ['A', 'B']

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
    fiscalCode: {
        type: String,
        required: true,
        length: 16
    },
    gender: {
        type: String,
        enum: genderTypes
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
    },
    subscriptionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Subscription', 
        default: null 
    },
    medicalCertificate: {
        type: Boolean,
        required: false
    },
    medicalCertificateExp: {
        type: Date,
        required: false
    },
    ensurance: {
        type: Boolean,
        required: true
    },
    ensuranceType: {
        type: String,
        required: true,
        enum: ensuranceTypes
    },
    ensuranceExp: {
        type: Date,
        required: true
    }
  }, {timestamps: true});
  

export const Athlete = model<AthleteDocument>('Athlete', AthleteSchema)