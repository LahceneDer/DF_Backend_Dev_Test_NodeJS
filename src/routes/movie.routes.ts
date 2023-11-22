import express, { Request, Response, NextFunction } from "express"
import { createMovie, getMovies } from "../controllers/movie.controllers"
import { Authenticate } from "../middlewares/authenticate"

const router = express.Router()


router.post("/", Authenticate, createMovie)
router.get("/", getMovies)




export { router as MovieRoutes }