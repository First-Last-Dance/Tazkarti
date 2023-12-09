import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface UserData {
  userName: string;
  password: string;
  firstName: string;
  lastName: String;
  birthDate: Date;
  gender: String;
  city: String;
  address?: String;
  email: String;
  role: String;
  admin: boolean;
  authorized: boolean;
}

export interface IUser extends mongoose.Document {
  userName: string;
  password: string;
  firstName: string;
  lastName: String;
  birthDate: Date;
  gender: String;
  city: String;
  address?: String;
  email: String;
  role: String;
  admin: boolean;
  authorized: boolean;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  authorized: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
