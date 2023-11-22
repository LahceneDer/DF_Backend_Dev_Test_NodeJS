import express from "express"
import { Authenticate } from "../middlewares/authenticate"
import { addMovieToFavorites, deleteMovieFromFavorites, getFavoritesList } from "../controllers/user.controllers"

const router = express.Router()


router.patch("/favorites", Authenticate, addMovieToFavorites)
router.delete("/favorites", Authenticate, deleteMovieFromFavorites)
router.get("/favorites/:userId", getFavoritesList)





export { router as UserRoutes }