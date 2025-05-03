export type AthleteType = 'adult' | 'kids'
export type KidsBelts = 'white' | 'greywhite' | 'grey' | 'greyblack' | 'yellowwhite' | 'yellow' | 'yellowblack' | 'orangewhite' | 'orange' | 'orangeblack' | 'greenwhite' | 'green' | 'greenblack'
export type AdultsBelts = 'white' | 'blue' | 'purple' | 'brown' | 'black'
export type Belt = KidsBelts | AdultsBelts;

export interface AthleteBody {
    name: string;
    surname: string;
    birthDate: Date;
    email: string;
    phoneNumber: string;
    type: AthleteType;
    belt: Belt
}
