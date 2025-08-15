import { Request, Response } from "express";
import { makeSaleStatisticsService } from "../../application/factories/make-sale-statistics-service";

export async function saleStatisticsController(
  request: Request,
  response: Response
) {
  try {
    const { days } = request.query;
    const daysNumber = days ? parseInt(days as string) : undefined;

    if (days && (isNaN(daysNumber!) || daysNumber! <= 0)) {
      return response
        .status(400)
        .json({ error: 'Parâmetro "days" deve ser um número positivo' });
    }

    const service = makeSaleStatisticsService();
    const stats = await service.getTotalSalesByDay(daysNumber);
    return response.status(200).json(stats);
  } catch (error) {
    return response.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro ao buscar estatísticas de vendas",
    });
  }
}
