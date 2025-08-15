import { makeClientRepository } from "../factories/make-client-repository";
import { SaleRepository } from "../repositories/sale-repository";

export class SaleStatisticsService {
  constructor(private readonly saleRepository: SaleRepository) {}

  async getTotalSalesByDay(days?: number) {
    return this.saleRepository.getTotalSalesByDay(days);
  }

  async getClientStats() {
    const [highestVolume, highestAverage, mostUniqueDays] = await Promise.all([
      this.saleRepository.getClientWithHighestVolume(),
      this.saleRepository.getClientWithHighestAverage(),
      this.saleRepository.getClientWithMostUniqueDays(),
    ]);

    const clientRepository = makeClientRepository();
    async function getClientInfo(stat: any, extraKey: string) {
      if (!stat) return null;
      const client = await clientRepository.findAll({});
      const found = client.find((c) => c.id === stat.clientId);
      if (!found) return null;
      return { ...stat, client: found };
    }

    return {
      highestVolume: await getClientInfo(highestVolume, "total"),
      highestAverage: await getClientInfo(highestAverage, "average"),
      mostUniqueDays: await getClientInfo(mostUniqueDays, "days"),
    };
  }
}
