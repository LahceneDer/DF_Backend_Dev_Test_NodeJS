import { NextFunction, Request, Response } from "express";
import { UserAuthInputs } from "../dto/auth.dto";
import { findUserByIdOrUsername } from "../services/user.services";
import User from "../models/User";
import { validate } from "class-validator";

import {
  GeneratePassword,
  GenerateSalt,
  GenerateToken,
  ValidatePassword,
} from "../utilities/PasswordUtilities";
import { plainToClass } from "class-transformer";

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Req body inputs alidation
  const userInputs = plainToClass(UserAuthInputs, req.body);
  const InputErrors = await validate(userInputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }
  const { username, password } = <UserAuthInputs>req.body;

  try {
    const existingUser = await findUserByIdOrUsername("", username);

    if (existingUser !== null) {
      return res.json({ message: "A user is exist with this email" });
    }

    // generate a salt and password
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createdUser = await User.create({
      username,
      salt,
      password: userPassword,
      favorites: [],
    });

    //generate the signature/token
    const token = GenerateToken({
      _id: createdUser._id,
      username: createdUser.username,
    });
    return res.cookie("token", `${token}`).status(200).json({ createdUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const userSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Req body inputs alidation
  const userInputs = plainToClass(UserAuthInputs, req.body);
  const InputErrors = await validate(userInputs, {
    validationError: { target: true },
  });

  if (InputErrors.length > 0) {
    return res.status(400).json(InputErrors);
  }
  const { username, password } = <UserAuthInputs>req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Username not valid" });
    }

    const validate = await ValidatePassword(password, user.password, user.salt);
    if (!validate) {
      return res.status(400).json({ message: "Password not valid" });
    }

    //generate the signature/token
    const token = GenerateToken({
      _id: user._id,
      username: user.username,
    });

    return res.cookie("token", `${token}`).status(200).json({ user });
  } catch (error) {}
};
