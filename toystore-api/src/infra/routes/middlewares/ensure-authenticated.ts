import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");
  console.log({ token });
  try {
    const decoded = jwt.verify(token, "segredo_xiu");
    request.user = decoded;
    return next();
  } catch {
    return response.status(401).json({ error: "Token inválido." });
  }
}
