import { SaleClientGeneralStatsService } from "../services/sale-client-general-stats-service";
import { makeSaleRepository } from "./make-sale-repository";

export function makeSaleClientGeneralStatsService() {
  const saleRepository = makeSaleRepository();
  return new SaleClientGeneralStatsService(saleRepository);
}
