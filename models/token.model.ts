import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({

    expirationTime: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TokenSchema.pre('validate', function () {
    this.expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
}
);
export const Token = mongoose.model('Token', TokenSchema);