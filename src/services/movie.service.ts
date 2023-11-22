import { Types } from "mongoose";
import Movie, { IMovie } from "../models/Movie";

export class MovieService {
  private movieModel: typeof Movie;

  constructor(movieModel: typeof Movie) {
    this.movieModel = movieModel;
  }

  public async createMovie(movie: IMovie): Promise<IMovie | null> {
    const newMovie = await this.movieModel.create(movie);
    return newMovie;
  }

  public async getAllMoviesInBatch(
    limit: number,
    skip: number
  ): Promise<IMovie[] | null> {
    const movies = this.movieModel.find().skip(skip).limit(limit);
    return movies;
  }

  public async getMovie(id: Types.ObjectId): Promise<IMovie | null> {
    const movie = this.movieModel.findById(id);
    return movie;
  }

  public async getMovieTrailer(id: Types.ObjectId): Promise<IMovie | null> {
    const movie = this.movieModel.findById(id, { _id: 0, trailerUrl: 1 });
    return movie;
  }

  public async getTop5Movies(): Promise<IMovie[] | null> {
    const movies = this.movieModel.find().sort({ rating: -1 }).limit(5);
    return movies;
  }

  public async searchMovies(query: string): Promise<IMovie[] | null> {
    const movies = await this.movieModel.find({ $text: { $search: query } });
    return movies;
  }
}
