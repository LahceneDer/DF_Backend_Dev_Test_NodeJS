import { NextFunction, Request, Response } from "express";
import { createMovieInputs } from "../dto/movie.dto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import Movie, { IMovie } from "../models/Movie";
import { MovieService } from "../services/movie.service";

const movieService = new MovieService(Movie);

export const createMovie = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  // Req body inputs alidation
  const movieInputs = plainToClass(createMovieInputs, req.body);
  const InputErrors = await validate(movieInputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }
  const { description, genre, rating, title } = <createMovieInputs>req.body;

  try {
    const createdMovie = await movieService.createMovie({
      description,
      genre,
      rating,
      title,
    } as IMovie);

    return res
      .status(200)
      .json({ message: "Movie created successuflly", data: createdMovie });
  } catch (error) {
    return res.status(400).json({ message: "Error with creating movie." });
  }
};

export const getMovies = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = 10;
  const skip = (page - 1) * limit

  try {
    const countMovies = await Movie.countDocuments()

    if(skip > countMovies) {
        return res.status(400).json({ message: "Please, Enter a small page number"})
    }
    const movies = await movieService.getAllMoviesInBatch(limit, skip);

    return res.status(200).json({ data: movies });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


