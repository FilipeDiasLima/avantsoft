import { Request, Response } from "express";
import { makeUpdateClientService } from "../../application/factories/make-update-client-service";

export async function updateClientController(
  request: Request,
  response: Response
) {
  try {
    const { id } = request.params;
    const { name, email, birthday } = request.body;
    const service = makeUpdateClientService();
    const client = await service.execute({
      id,
      name,
      email,
      birthday: birthday ? new Date(birthday) : undefined,
    });
    return response.status(200).json(client);
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "Erro ao atualizar cliente",
      });
  }
}
