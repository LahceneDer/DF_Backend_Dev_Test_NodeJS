import express, { Application } from "express";
import cookieParser from "cookie-parser"
import { AuthRoutes } from "../routes/auth.routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));


  app.use('/auth', AuthRoutes)


  return app;
};
