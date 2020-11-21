import mongoose, { Document, Schema, Model } from 'mongoose';

export type UserAttributes = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
