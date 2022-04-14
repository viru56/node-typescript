import * as mongoose from 'mongoose';
import { IToken } from '../interfaces';
const Schema = mongoose.Schema;

const TokenSchema = new Schema<IToken>({

    expirationTime: {
        type: Number,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TokenSchema.pre('validate', function () {
    this.expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
});

export const Token = mongoose.model('token', TokenSchema);