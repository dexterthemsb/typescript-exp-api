import * as jwt from "jsonwebtoken";

// generate a token on successful authentication
export const generateToken = (email: string, id: string): string => {
  return jwt.sign({ email, id }, process.env.JWT_TOKEN_PRIVATE_KEY!, { expiresIn: "5m" });
};
