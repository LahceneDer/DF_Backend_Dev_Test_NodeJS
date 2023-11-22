import express from "express"
import { createMovie, getMovie, getMovieTrailer, getMovies, getTopMovies, searchMovies } from "../controllers/movie.controllers"
import { Authenticate } from "../middlewares/authenticate"


const router = express.Router()

router.post("/", Authenticate, createMovie)
router.get("/", getMovies)
router.get("/top", getTopMovies)
router.get("/:movieId", getMovie)
router.get("/:movieId/trailer", getMovieTrailer)
router.get("/search/:query", searchMovies)




export { router as MovieRoutes }