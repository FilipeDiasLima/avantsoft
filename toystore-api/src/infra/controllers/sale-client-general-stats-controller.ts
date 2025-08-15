import { Request, Response } from "express";
import { makeSaleClientGeneralStatsService } from "../../application/factories/make-sale-client-general-stats-service";

export async function saleClientGeneralStatsController(
  request: Request,
  response: Response
) {
  try {
    const service = makeSaleClientGeneralStatsService();
    const stats = await service.execute();
    return response.status(200).json(stats);
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar estatísticas gerais por cliente",
      });
  }
}
