import { DeleteSalesByDateService } from "../services/delete-sales-by-date-service";
import { makeSaleRepository } from "./make-sale-repository";

export function makeDeleteSalesByDateService() {
  const saleRepository = makeSaleRepository();
  return new DeleteSalesByDateService(saleRepository);
}
