import express, { Request, Response, NextFunction } from "express"
import { userSignIn, userSignUp } from "../controllers/auth.controller"

const router = express.Router()

router.post("/signup", userSignUp)
router.post("/signin", userSignIn)



export { router as AuthRoutes }