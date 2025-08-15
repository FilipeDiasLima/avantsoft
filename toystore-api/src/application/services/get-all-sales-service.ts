import { Sale } from "@prisma/client";
import { SaleRepository } from "../repositories/sale-repository";

export class GetAllSalesService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(): Promise<Sale[]> {
    return this.saleRepository.findAll();
  }
}
