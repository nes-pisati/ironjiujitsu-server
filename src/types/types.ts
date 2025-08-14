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

export interface AthleteBody {
    name: string;
    surname: string;
    birthDate: Date;
    email: string;
    phoneNumber: string;
    type: AthleteType;
    belt: Belt
}

export interface AthleteState extends AthleteBody {
    medicalCertificateId: string;
    medicalCertificateExp: string;
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

//Medical Certificate

//User

export interface UserBody {
    username: string;
    password: string;
}