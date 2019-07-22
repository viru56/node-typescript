import * as mongoose   from 'mongoose';
import  {hashPassword} from '../services';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First Name can not less than 2 chars'],
        maxlength: [250, 'First name can not greater than 250 chars'],
        lowercase: true,
        trim: true
    },
    lastName : {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last Name can not less than 2 chars'],
        maxlength: [250, 'Last name can not greater than 250 chars'],
        lowercase: true,
        trim: true
    },
    phone : {
        type: String,
        match: [/^[0-9]{10}$/, 'phone should have 10 digits only'],
        unique: true
    },
    email : {
        type: String,
        required: [true, 'email is required'],
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'not a valid email address'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ['Active','InActive'],
        default: 'InActive'

    },
    role:{
        type: String,
        enum: ['admin','employee','readOnly'],
        default: 'admin'
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

UserSchema.pre('validate', function() {
    this.password = hashPassword(this.password);
  }
);

export const User = mongoose.model('User', UserSchema);