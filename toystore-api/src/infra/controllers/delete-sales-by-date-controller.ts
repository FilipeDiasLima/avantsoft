import { Request, Response } from "express";
import { makeDeleteSalesByDateService } from "../../application/factories/make-delete-sales-by-date-service";

export async function deleteSalesByDateController(
  request: Request,
  response: Response
) {
  try {
    const { date } = request.params;

    if (!date) {
      return response.status(400).json({ error: "A data é obrigatória." });
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return response.status(400).json({ error: "Data inválida." });
    }

    const service = makeDeleteSalesByDateService();
    await service.execute(dateObj);

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro ao deletar vendas do dia",
    });
  }
}
