import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  description: string;
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;