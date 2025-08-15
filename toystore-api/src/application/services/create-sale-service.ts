import { Sale } from "@prisma/client";
import { SaleRepository } from "../repositories/sale-repository";

interface CreateSaleInput {
  date: Date;
  value: number;
  clientId: string;
}

export class CreateSaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute({ date, value, clientId }: CreateSaleInput): Promise<Sale> {
    if (!date) throw new Error("A data da venda é obrigatória.");
    if (!value) throw new Error("O valor da venda é obrigatório.");
    if (!clientId) throw new Error("O cliente é obrigatório.");
    return this.saleRepository.create({ date, value, clientId });
  }
}
