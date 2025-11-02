import { Schema, model, Document } from 'mongoose';
import { SubscriptionTypes, SubscriptionBody } from '../types/types';

const SubscriptionSchema = new Schema({
    date: { 
        type: Date, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['month', 'quarterly'], 
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
        ref: 'Athlete' 
    },
    hasAlreadyPaid: {
        type: Boolean,
        required: true
    },
    notes: String
  }, { timestamps: true });

export const Subscription = model<SubscriptionBody>('Subscription', SubscriptionSchema)