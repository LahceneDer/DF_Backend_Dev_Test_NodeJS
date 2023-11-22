import { NextFunction, Request, Response } from "express";
import {
  createMovieInputs,
  getMovieInputs,
  searchMovieInputs,
} from "../dto/movie.dto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import Movie, { IMovie } from "../models/Movie";
import { MovieService } from "../services/movie.service";
import mongoose, { isValidObjectId } from "mongoose";

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
  const { description, genre, rating, title, trailerUrl } = <createMovieInputs>(
    req.body
  );

  try {
    const createdMovie = await movieService.createMovie({
      description,
      genre,
      rating,
      title,
      trailerUrl,
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
  const skip = (page - 1) * limit;

  try {
    const countMovies = await Movie.countDocuments();

    if (skip > countMovies) {
      return res
        .status(400)
        .json({ message: "Please, Enter a small page number" });
    }
    const movies = await movieService.getAllMoviesInBatch(limit, skip);

    return res.status(200).json({ data: movies });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTopMovies = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    const movies = await movieService.getTop5Movies();

    return res.status(200).json({ data: movies });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchMovies = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  // Req body inputs alidation
  const searchInputs = plainToClass(searchMovieInputs, req.params);

  const InputErrors = await validate(searchInputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }
  const { query } = searchInputs;

  try {
    const movies = await movieService.searchMovies(query);
    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMovie = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  const inputs = plainToClass(getMovieInputs, req.params);

  const InputErrors = await validate(inputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }
  const { movieId } = inputs;

  if (!isValidObjectId(movieId)) {
    return res.status(400).json({ message: "Movie Id is not a valid ID" });
  }

  const id = new mongoose.Types.ObjectId(movieId);

  try {
    const movie = await movieService.getMovie(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMovieTrailer = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  const inputs = plainToClass(getMovieInputs, req.params);

  const InputErrors = await validate(inputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }
  const { movieId } = inputs;

  if (!isValidObjectId(movieId)) {
    return res.status(400).json({ message: "Movie Id is not a valid ID" });
  }

  const id = new mongoose.Types.ObjectId(movieId);

  try {
    const movie = await movieService.getMovieTrailer(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
