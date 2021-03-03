import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema, 'user');
