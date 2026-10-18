import { PaymentType, SubscriptionTypes } from '../types/types';

export interface CreateSubscriptionBody {
  date: Date;
  type: SubscriptionTypes;
  amount: number;
  paymentType: PaymentType;
  notes?: string;
}

export interface UpdateSubscriptionBody {
  date?: Date;
  type?: SubscriptionTypes;
  amount?: number;
  paymentType?: PaymentType;
  notes?: string;
}
