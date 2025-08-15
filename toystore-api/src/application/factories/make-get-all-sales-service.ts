import { GetAllSalesService } from "../services/get-all-sales-service";
import { makeSaleRepository } from "./make-sale-repository";

export function makeGetAllSalesService() {
  const saleRepository = makeSaleRepository();
  return new GetAllSalesService(saleRepository);
}
