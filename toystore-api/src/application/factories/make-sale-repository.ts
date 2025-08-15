import { PrismaSaleRepository } from "../../infra/database/repositories/prisma-sale-repository";
import { SaleRepository } from "../repositories/sale-repository";

export function makeSaleRepository(): SaleRepository {
  return new PrismaSaleRepository();
}
