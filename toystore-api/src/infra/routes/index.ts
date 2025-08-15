import { Router } from "express";
import { authRoutes } from "./auth";
import { clientRouter } from "./client";
import { saleRouter } from "./sale";

const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/clients", clientRouter);
routes.use("/sales", saleRouter);

export { routes };
