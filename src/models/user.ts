import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: Object, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema, 'user');
