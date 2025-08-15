import "dotenv/config";

import cors from "cors";

import type { Express, Request, Response } from "express";
import express from "express";
import { routes } from "./infra/routes";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("TOYSTORE API ONLINE");
});

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Erro interno do servidor",
  });
});

export { app };
