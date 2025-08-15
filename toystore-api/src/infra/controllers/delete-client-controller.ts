import { Request, Response } from "express";
import { makeDeleteClientService } from "../../application/factories/make-delete-client-service";

export async function deleteClientController(
  request: Request,
  response: Response
) {
  try {
    const { id } = request.params;
    const service = makeDeleteClientService();
    await service.execute(id);
    return response.status(204).send();
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "Erro ao remover cliente",
      });
  }
}
