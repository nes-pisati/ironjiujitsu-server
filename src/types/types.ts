//Athlete

export type AthleteType = 'adult' | 'kids'

export const KidsBelts = [
    'white', 'greywhite', 'grey', 'greyblack',
    'yellowwhite', 'yellow', 'yellowblack',
    'orangewhite', 'orange', 'orangeblack',
    'greenwhite', 'green', 'greenblack'
] as const;

export type KidsBelts = typeof KidsBelts[number];

export const AdultsBelts = [
    'white', 'blue', 'purple', 'brown', 'black'
] as const;

export type AdultsBelts = typeof AdultsBelts[number];

export type Belt = Exclude<KidsBelts, 'white'> | AdultsBelts;

export type SubscriptionTypes = 'single' | 'month' | 'quarterly'

export type GenderType = 'M' | 'F'

export type EnsuranceType = 'A' | 'B'

export interface AthleteBody {
    name: string;
    surname: string;
    birthDate: Date;
    fiscalCode: String;
    gender: GenderType;
    email: string;
    phoneNumber: string;
    type: AthleteType;
    belt: Belt,
    medicalCertificate: boolean;
    medicalCertificateReleaseDate: Date;
    medicalCertificateExp: Date;
    ensurance: boolean;
    ensuranceType: EnsuranceType;
    ensuranceStartDate: Date;
    ensuranceExp: Date;
    whatsappConsent: Boolean;
    whatsappConsentDate: Date;
}

export interface AthleteState extends AthleteBody {
    subscriptionId: string;
    subscriptionExp: string;
}

//Subscription

export interface SubscriptionBody {
    date: Date;
    type: SubscriptionTypes;
    amount: number;
    athleteId?: string;
    notes?: string;
}

//User

export interface UserBody {
    username: string;
    password: string;
}