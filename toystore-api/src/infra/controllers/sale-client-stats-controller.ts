import { Request, Response } from "express";
import { makeSaleStatisticsService } from "../../application/factories/make-sale-statistics-service";

export async function saleClientStatsController(
  request: Request,
  response: Response
) {
  try {
    const service = makeSaleStatisticsService();
    const stats = await service.getClientStats();
    return response.status(200).json(stats);
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar estatísticas de clientes",
      });
  }
}
