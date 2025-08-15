import { Request, Response } from "express";
import { makeGetAllSalesService } from "../../application/factories/make-get-all-sales-service";

export async function getAllSalesController(
  request: Request,
  response: Response
) {
  try {
    const service = makeGetAllSalesService();
    const sales = await service.execute();
    return response.status(200).json(sales);
  } catch (error) {
    return response
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Erro ao buscar vendas",
      });
  }
}
