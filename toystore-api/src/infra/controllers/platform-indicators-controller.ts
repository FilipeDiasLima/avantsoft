import { Request, Response } from "express";
import { makePlatformIndicatorsService } from "../../application/factories/make-platform-indicators-service";

export async function platformIndicatorsController(
  request: Request,
  response: Response
) {
  try {
    const service = makePlatformIndicatorsService();
    const indicators = await service.execute();
    return response.status(200).json(indicators);
  } catch (error) {
    return response
      .status(400)
      .json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar indicadores da plataforma",
      });
  }
}
