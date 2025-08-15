import { Request, Response } from "express";
import z from "zod";
import { makeCreateSaleService } from "../../application/factories/make-create-sale-service";

const createSaleSchema = z.object({
  date: z.string().min(1, { message: "A data da venda é obrigatória." }),
  value: z.number().min(1, { message: "O valor da venda é obrigatório." }),
  clientId: z.string().min(1, { message: "O cliente é obrigatório." }),
});

export async function createSaleController(
  request: Request,
  response: Response
) {
  try {
    const { date, value, clientId } = createSaleSchema.parse(request.body);
    const service = makeCreateSaleService();
    const sale = await service.execute({
      date: new Date(date),
      value,
      clientId,
    });
    return response.status(201).json(sale);
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "Erro ao cadastrar venda",
      });
  }
}
