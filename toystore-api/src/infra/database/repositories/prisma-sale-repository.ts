import { PrismaClient, Sale } from "@prisma/client";
import { SaleRepository } from "../../../application/repositories/sale-repository";

const prisma = new PrismaClient();

export class PrismaSaleRepository implements SaleRepository {
  async findAll() {
    return prisma.sale.findMany({ orderBy: { date: "desc" } });
  }
  async create(
    data: Omit<Sale, "id" | "createdAt" | "updatedAt">
  ): Promise<Sale> {
    try {
      return await prisma.sale.create({ data });
    } catch (error) {
      throw new Error("Erro ao cadastrar venda");
    }
  }
  async getTotalSalesByDay(days?: number) {
    const where = days
      ? {
          date: {
            gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
          },
        }
      : undefined;

    const result = await prisma.sale.groupBy({
      by: ["date"],
      _sum: { value: true },
      orderBy: { date: "desc" },
      where,
    });
    return result.map((r) => ({ date: r.date, total: r._sum.value ?? 0 }));
  }

  async getClientWithHighestVolume() {
    const result = await prisma.sale.groupBy({
      by: ["clientId"],
      _sum: { value: true },
      orderBy: { _sum: { value: "desc" } },
      take: 1,
    });
    if (result.length === 0) return null;
    return { clientId: result[0].clientId, total: result[0]._sum.value ?? 0 };
  }

  async getClientWithHighestAverage() {
    const result = await prisma.sale.groupBy({
      by: ["clientId"],
      _avg: { value: true },
      orderBy: { _avg: { value: "desc" } },
      take: 1,
    });
    if (result.length === 0) return null;
    return { clientId: result[0].clientId, average: result[0]._avg.value ?? 0 };
  }

  async getClientWithMostUniqueDays() {
    const sales = await prisma.sale.findMany({
      select: { clientId: true, date: true },
    });
    const freqMap = new Map<string, Set<string>>();
    for (const sale of sales) {
      const day = sale.date.toISOString().split("T")[0];
      if (!freqMap.has(sale.clientId)) freqMap.set(sale.clientId, new Set());
      freqMap.get(sale.clientId)!.add(day);
    }
    let maxClient: string | null = null;
    let maxDays = 0;
    for (const [clientId, days] of freqMap.entries()) {
      if (days.size > maxDays) {
        maxDays = days.size;
        maxClient = clientId;
      }
    }
    if (!maxClient) return null;
    return { clientId: maxClient, days: maxDays };
  }

  async deleteSalesByDate(date: Date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      await prisma.sale.deleteMany({
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
    } catch (error) {
      throw new Error("Erro ao deletar vendas do dia");
    }
  }
}
