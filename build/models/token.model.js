"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TokenSchema = new Schema({
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
exports.Token = mongoose.model('token', TokenSchema);
