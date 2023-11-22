import express, { Application } from "express";
import cookieParser from "cookie-parser"
import { AuthRoutes } from "../routes/auth.routes";
import { MovieRoutes } from "../routes/movie.routes";
import { UserRoutes } from "../routes/user.routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));


  app.use('/auth', AuthRoutes)
  app.use('/movies', MovieRoutes)
  app.use('/users', UserRoutes)


  return app;
};
