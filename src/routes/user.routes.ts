import express from "express"
import { createMovie, getMovies } from "../controllers/movie.controllers"
import { Authenticate } from "../middlewares/authenticate"
import { addMovieToFavorites, deleteMovieFromFavorites } from "../controllers/user.controllers"

const router = express.Router()


router.patch("/favorites", Authenticate, addMovieToFavorites)
router.delete("/favorites", Authenticate, deleteMovieFromFavorites)





export { router as UserRoutes }