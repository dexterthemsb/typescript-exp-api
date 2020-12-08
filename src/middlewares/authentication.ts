import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

// token error handler
const handleJWTErrors = (err: Error) => {
  switch (err.name) {
    case "TokenExpiredError":
      return "Token has expired";
    case "JsonWebTokenError":
      return "Invalid token";
    case "NotBeforeError":
      return "Token not active";
    default:
      return "Something went wrong";
  }
};

// validation middleware
export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY!);
      if (decodedToken) next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: handleJWTErrors(err) });
    }
  } else res.status(404).json({ msg: "Token not found" });
};
