import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "../routes/auth.routes";
import { MovieRoutes } from "../routes/movie.routes";
import * as yaml from "yamljs";
import { UserRoutes } from "../routes/user.routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  const swaggerDocument = yaml.load("src/config/swagger.yaml");

  //swagger
  const swaggerJsdoc = yaml.load("src/app.yaml");
  const swaggerUi = require("swagger-ui-express");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

  app.use("/auth", AuthRoutes);
  app.use("/movies", MovieRoutes);
  app.use("/users", UserRoutes);

  return app;
};
