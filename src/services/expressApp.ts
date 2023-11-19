import express, { Application } from "express";
import cookieParser from "cookie-parser"

export default async (app: Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));


  return app;
};
