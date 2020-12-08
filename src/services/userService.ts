import { Request, Response } from "express";

import { User } from "../models/user";

// register
export const getUserData = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await User.findById(userID, { password: 0 });

    if (user) res.status(200).json({ userData: user });
    else res.status(404).json({ msg: "User not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
