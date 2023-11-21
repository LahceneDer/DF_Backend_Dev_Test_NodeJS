import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  salt: string;
  favorites: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
}, {
  toJSON: {
    transform(doc, ret){
        delete ret.password;
        delete ret.salt;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
    }
},
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;