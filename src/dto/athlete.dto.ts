import { AthleteBody } from '../types/types';

export type CreateAthleteBody = Omit<AthleteBody, 'subscriptionId'>;
export type UpdateAthleteBody = Partial<CreateAthleteBody>;
