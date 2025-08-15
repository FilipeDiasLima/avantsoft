import { Request, Response } from "express";
import { makeGetAllClientsService } from "../../application/factories/make-get-all-clients-service";

export async function getAllClientsController(
  request: Request,
  response: Response
) {
  try {
    const { name, email } = request.query;
    const service = makeGetAllClientsService();
    const clients = await service.execute({
      name: typeof name === "string" ? name : undefined,
      email: typeof email === "string" ? email : undefined,
    });
    return response.status(200).json(clients);
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "Erro ao buscar clientes",
      });
  }
}
