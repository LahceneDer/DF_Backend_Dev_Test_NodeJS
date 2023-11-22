import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.services";
import User from "../models/User";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { addFavoritesInputs, deleteFavoritesInputs } from "../dto/user.dto";
import Movie from "../models/Movie";
import { MovieService } from "../services/movie.service";

const userService = new UserService(User);
const movieService = new MovieService(Movie);

export const addMovieToFavorites = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  const Inputs = plainToClass(addFavoritesInputs, req.body);
  const InputErrors = await validate(Inputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }

  const { movieId, userId } = req.body as addFavoritesInputs;

  try {
    const user = await userService.findUserByIdOrUsername(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await movieService.getMovie(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (user.favorites.includes(movieId)) {
      return res
        .status(400)
        .json({ message: "Movie already in favorites list" });
    }

    const updatedUser = await userService.addFavorite(user, movieId);
    return res
      .status(200)
      .json({
        message: "Movie or series added to favorites list",
        data: updatedUser,
      });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};




export const deleteMovieFromFavorites = async (
    req: Request,
    res: Response,
    nex: NextFunction
  ) => {
    const Inputs = plainToClass(deleteFavoritesInputs, req.body);
    const InputErrors = await validate(Inputs, {
      validationError: { target: true },
    });
  
    if (InputErrors.length > 0) {
      return res.status(400).json(InputErrors);
    }
  
    const { movieId, userId } = req.body as deleteFavoritesInputs;
  
    try {
      const user = await userService.findUserByIdOrUsername(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const movie = await movieService.getMovie(movieId);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      if (!user.favorites.includes(movieId)) {
        return res
          .status(400)
          .json({ message: "Movie not in favorites list" });
      }
  
      const updatedUser = await userService.deleteFavorite(user, movieId);
      return res
        .status(200)
        .json({
          message: "Movie or series deleted from favorites list",
        });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
  