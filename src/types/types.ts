export type AthleteType = 'adult' | 'kids'


export const KidsBelts = ['white' , 'greywhite' , 'grey' , 'greyblack' , 'yellowwhite' , 'yellow' , 'yellowblack' , 'orangewhite' , 'orange' , 'orangeblack' , 'greenwhite' , 'green' , 'greenblack'] as const
export type KidsBelts = typeof KidsBelts[number]

export const AdultsBelts = ['white' , 'blue' , 'purple' , 'brown' , 'black'] as const
export type AdultsBelts = typeof AdultsBelts[number]

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
