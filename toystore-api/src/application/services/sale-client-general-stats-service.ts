import { makeClientRepository } from "../factories/make-client-repository";
import { SaleRepository } from "../repositories/sale-repository";

export class SaleClientGeneralStatsService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute() {
    const clientRepository = makeClientRepository();
    const clients = await clientRepository.findAll({});
    const sales = await this.saleRepository.findAll();

    const salesByClient = new Map();
    for (const sale of sales) {
      if (!salesByClient.has(sale.clientId))
        salesByClient.set(sale.clientId, []);
      salesByClient.get(sale.clientId).push(sale);
    }

    return clients.map((client) => {
      const clientSales = salesByClient.get(client.id) || [];
      const total = clientSales.reduce((sum, s) => sum + s.value, 0);
      const average =
        clientSales.length > 0
          ? parseFloat((total / clientSales.length).toFixed(2))
          : 0;
      const uniqueDays = new Set(
        clientSales.map((s) => s.date.toISOString().split("T")[0])
      ).size;
      return {
        client,
        total,
        average,
        uniqueDays,
      };
    });
  }
}
