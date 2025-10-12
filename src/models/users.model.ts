import { Schema, model, Document } from 'mongoose';
import { UserBody } from '../types/types';

const UserSchema = new Schema<UserBody>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const User = model<UserBody>('User', UserSchema)