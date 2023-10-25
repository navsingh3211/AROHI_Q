import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
/**
 * Generate jwt token for user data
 * data: user data
 * cb: callback function
 */
export const generateToken = (data, cb) => {
  return jwt.sign({ data }, JWT_SECRET_TOKEN,{expiresIn: "15d"});
};