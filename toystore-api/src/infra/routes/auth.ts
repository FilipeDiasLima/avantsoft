import { Router } from "express";
import { authenticateController } from "../controllers/authenticate-controller";
import { getMeController } from "../controllers/get-me-controller";
import { registerController } from "../controllers/register-controller";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

const authRoutes = Router();

authRoutes.post("/", authenticateController);
authRoutes.post("/register", registerController);
authRoutes.get("/me", ensureAuthenticated, getMeController);

export { authRoutes };
