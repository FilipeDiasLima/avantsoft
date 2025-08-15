import { CreateSaleService } from "../services/create-sale-service";
import { makeSaleRepository } from "./make-sale-repository";

export function makeCreateSaleService() {
  const saleRepository = makeSaleRepository();
  return new CreateSaleService(saleRepository);
}
