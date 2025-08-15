import { Sale } from "@prisma/client";

export interface SaleRepository {
  create(data: Omit<Sale, "id" | "createdAt" | "updatedAt">): Promise<Sale>;

  findAll(): Promise<Sale[]>;

  getTotalSalesByDay(
    days?: number
  ): Promise<Array<{ date: Date; total: number }>>;
  getClientWithHighestVolume(): Promise<{
    clientId: string;
    total: number;
  } | null>;
  getClientWithHighestAverage(): Promise<{
    clientId: string;
    average: number;
  } | null>;
  getClientWithMostUniqueDays(): Promise<{
    clientId: string;
    days: number;
  } | null>;
  deleteSalesByDate(date: Date): Promise<void>;
}
