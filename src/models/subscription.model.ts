import { Schema, model, Types, Document } from 'mongoose';
import { SubscriptionTypes } from '../types/types';

const subscriptionTypes: SubscriptionTypes[] = [
    'single',
    'month',
    'quarterly'
  ];

export interface SubscriptionDocument extends Document {
  date: Date;
  type: SubscriptionTypes;
  amount: number;
  subscriptionExp: Date;
  paymentType: 'banktransfer' | 'cash' | 'paypal' | 'other';
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
      enum: ['banktransfer', 'cash', 'paypal', 'other'],
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
