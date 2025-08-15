import { Router } from "express";

import { createClientController } from "../controllers/create-client-controller";
import { deleteClientController } from "../controllers/delete-client-controller";
import { getAllClientsController } from "../controllers/get-all-clients-controller";
import { updateClientController } from "../controllers/update-client-controller";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

const clientRouter = Router();

clientRouter.use(ensureAuthenticated);
clientRouter.get("/", getAllClientsController);
clientRouter.post("/", createClientController);
clientRouter.put("/:id", updateClientController);
clientRouter.delete("/:id", deleteClientController);

export { clientRouter };
