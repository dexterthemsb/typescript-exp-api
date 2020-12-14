import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { User } from "../models/user";

import { validateEmailPassword, isEmailPasswordEmpty } from "../validators/authValidator";

import { generateToken } from "../utils/authUtils";

// register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validations = validateEmailPassword(email, password);

    if (validations.success) {
      const user = await User.create(req.body);

      res.status(201).json({
        msg: "User successfully created",
        userID: user._id,
        token: generateToken(email, user._id)
      });
    } else res.status(400).json({ msg: validations.msg });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check for empty email and password
    const checkForEmptyEmailPassword = isEmailPasswordEmpty(email, password);

    if (!checkForEmptyEmailPassword.success)
      res.status(400).json({ msg: checkForEmptyEmailPassword.msg });

    const user: any = await User.findOne({ email });

    // compare password & check for user
    if (user && (await bcrypt.compare(password, user.password)))
      res.status(200).json({ msg: "Logged in", token: generateToken(email, user._id) });
    else if (!user) res.status(404).json({ msg: "Email does not exist" });
    else res.status(401).json({ msg: "Incorrect password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// logout
export const logout = async (req: Request, res: Response) => {
  console.log("Logout");
};
