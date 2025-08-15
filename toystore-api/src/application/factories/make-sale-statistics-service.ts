import { SaleStatisticsService } from "../services/sale-statistics-service";
import { makeSaleRepository } from "./make-sale-repository";

export function makeSaleStatisticsService() {
  const saleRepository = makeSaleRepository();
  return new SaleStatisticsService(saleRepository);
}
