import mongoose from "mongoose";
import { MONGO_URI } from ".";

export default async () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then((result: any) => {
        console.log("DB connected");
      })
      .catch((err: any) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
