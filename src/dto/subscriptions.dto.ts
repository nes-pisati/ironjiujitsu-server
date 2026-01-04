import { SubscriptionTypes } from '../types/types';

export interface CreateSubscriptionBody {
  date: Date;
  type: SubscriptionTypes;
  amount: number;
  paymentType: 'banktransfer' | 'cash' | 'paypal' | 'other';
  notes?: string;
}

export interface UpdateSubscriptionBody {
  date?: Date;
  type?: SubscriptionTypes;
  amount?: number;
  paymentType?: 'banktransfer' | 'cash' | 'paypal' | 'other';
  notes?: string;
}
