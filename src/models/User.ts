import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
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
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;