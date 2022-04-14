"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
const services_1 = require("../services");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First Name can not less than 2 chars'],
        maxlength: [250, 'First name can not greater than 250 chars'],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last Name can not less than 2 chars'],
        maxlength: [250, 'Last name can not greater than 250 chars'],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
        match: [/^[0-9]{10}$/, 'phone should have 10 digits only'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'not a valid email address'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inActive'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
UserSchema.pre('validate', function () {
    this.password = (0, services_1.hashPassword)(this.password);
});
exports.User = mongoose.model('User', UserSchema);
