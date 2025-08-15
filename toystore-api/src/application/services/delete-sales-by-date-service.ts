import { SaleRepository } from "../repositories/sale-repository";

export class DeleteSalesByDateService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(date: Date): Promise<void> {
    if (!date) throw new Error("A data é obrigatória.");

    await this.saleRepository.deleteSalesByDate(date);
  }
}
