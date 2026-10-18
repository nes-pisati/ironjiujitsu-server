import { Schema, model, Types, Document } from 'mongoose';
import { PaymentType, SubscriptionTypes } from '../types/types';

const subscriptionTypes: SubscriptionTypes[] = [
    'single',
    'month',
    'quarterly',
    'sixmonth',
    '10entrance'
  ];

const paymentTypes: PaymentType[] = ['banktransfer', 'cash', 'paypal', 'other'];

export interface SubscriptionDocument extends Document {
  date: Date;
  type: SubscriptionTypes;
  amount: number;
  subscriptionExp: Date;
  paymentType: PaymentType;
  athleteId: Types.ObjectId;
  hasAlreadyPaid: boolean;
  notes?: string;
}

const SubscriptionSchema = new Schema<SubscriptionDocument>(
  {
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: subscriptionTypes,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    subscriptionExp: {
      type: Date,
      required: true
    },
    paymentType: {
      type: String,
      enum: paymentTypes,
      required: true
    },
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
      required: true,
      unique: true, 
      index: true
    },
    hasAlreadyPaid: {
      type: Boolean,
      required: true
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

export const Subscription = model<SubscriptionDocument>(
  'Subscription',
  SubscriptionSchema
);
