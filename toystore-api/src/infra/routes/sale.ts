import { Router } from "express";

import { createSaleController } from "../controllers/create-sale-controller";
import { deleteSalesByDateController } from "../controllers/delete-sales-by-date-controller";
import { getAllSalesController } from "../controllers/get-all-sales-controller";
import { platformIndicatorsController } from "../controllers/platform-indicators-controller";
import { saleClientGeneralStatsController } from "../controllers/sale-client-general-stats-controller";
import { saleClientStatsController } from "../controllers/sale-client-stats-controller";
import { saleStatisticsController } from "../controllers/sale-statistics-controller";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

const saleRouter = Router();

saleRouter.use(ensureAuthenticated);
saleRouter.post("/", createSaleController);
saleRouter.get("/statistics", saleStatisticsController);
saleRouter.get("/client-stats", saleClientStatsController);
saleRouter.get("/client-stats/general", saleClientGeneralStatsController);
saleRouter.get("/indicators", platformIndicatorsController);
saleRouter.delete("/date/:date", deleteSalesByDateController);
saleRouter.get("/", getAllSalesController);

export { saleRouter };
