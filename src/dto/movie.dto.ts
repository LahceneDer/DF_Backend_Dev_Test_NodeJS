import { IsNumber, IsNotEmpty, Min, Max } from "class-validator";
import { Types } from "mongoose";

export class createMovieInputs {
  constructor(
    title: string,
    genre: string,
    rating: number,
    description: string
  ) {
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.description = description;
  }

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: "Rating must be greater than or equal to 0" })
  @Max(5, { message: "Rating must be less than or equal to 5" })
  rating: number;

  @IsNotEmpty()
  description: string;
}

export class searchMovieInputs {
  constructor(query: string) {
    this.query = query;
  }

  @IsNotEmpty()
  query: string;
}


export class getMovieInputs {
  constructor(movieId: string) {
    this.movieId = movieId;
  }

  @IsNotEmpty()
  movieId: string;
}
