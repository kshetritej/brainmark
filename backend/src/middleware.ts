import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./configs";

export interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with the actual user type
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.token;
  if (!token) {
    return res.status(401).json({
      message: "Token is not provided. Try logging in again.",
    });
  }

  jwt.verify(token as string, JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token is not valid.",
      });
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;
