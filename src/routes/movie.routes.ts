import express, { Request, Response, NextFunction } from "express"
import { createMovie, getMovies, searchMovies } from "../controllers/movie.controllers"
import { Authenticate } from "../middlewares/authenticate"

const router = express.Router()


router.post("/", Authenticate, createMovie)
router.get("/", getMovies)
router.get("/search/:query", searchMovies)




export { router as MovieRoutes }