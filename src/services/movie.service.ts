import { Types } from "mongoose";
import Movie, { IMovie } from "../models/Movie"

export class MovieService {
    private movieModel: typeof Movie

    constructor(movieModel: typeof Movie) {
        this.movieModel = movieModel
    }

    public async createMovie(movie: IMovie): Promise<IMovie | null> {
            const newMovie = await this.movieModel.create(movie);
            return newMovie;   
    }

    public async getAllMoviesInBatch(limit: number, skip: number): Promise<IMovie[] | null> {
        const movies = this.movieModel.find().skip(skip).limit(limit)
        return movies
    }

    public async getMovie(id: Types.ObjectId): Promise<IMovie | null> {
      const movie = this.movieModel.findById(id)
      return movie
  }
}