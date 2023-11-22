import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
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
  toJSON: {
    transform(doc, ret){
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
    }
},
  timestamps: true,
});

movieSchema.index({ title: 'text', description: 'text' });


const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;