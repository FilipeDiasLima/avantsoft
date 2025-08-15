import { Request, Response } from "express";
import { makeGetMeService } from "../../application/factories/make-get-me-service";

export async function getMeController(request: Request, response: Response) {
  try {
    const userId = request.user?.userId;
    if (!userId) {
      return response.status(401).json({ error: "Token inválido" });
    }

    const service = makeGetMeService();
    const user = await service.execute(userId);
    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro ao buscar dados do usuário",
    });
  }
}
