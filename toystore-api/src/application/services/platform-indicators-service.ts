import { makeClientRepository } from "../factories/make-client-repository";
import { SaleRepository } from "../repositories/sale-repository";

export class PlatformIndicatorsService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute() {
    const clientRepository = makeClientRepository();
    const [sales, clients] = await Promise.all([
      this.saleRepository.findAll(),
      clientRepository.findAll({}),
    ]);

    const totalSalesValue = sales.reduce((sum, s) => sum + s.value, 0);
    const uniqueDays = new Set(
      sales.map((s) => s.date.toISOString().split("T")[0])
    );
    const salesPerDay =
      uniqueDays.size > 0 ? Math.round(totalSalesValue / uniqueDays.size) : 0;

    return {
      totalSalesValue,
      clients: clients.length,
      salesPerDay,
      daysWithSales: uniqueDays.size,
    };
  }
}
