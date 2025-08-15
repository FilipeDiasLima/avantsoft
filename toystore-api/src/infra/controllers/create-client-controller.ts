import { Request, Response } from "express";
import z from "zod";
import { makeCreateClientService } from "../../application/factories/make-create-client-service";

const createClientSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "O e-mail é obrigatório." }),
  birthday: z
    .string()
    .min(1, { message: "A data de nascimento é obrigatória." }),
});

export async function createClientController(
  request: Request,
  response: Response
) {
  try {
    const { name, email, birthday } = createClientSchema.parse(request.body);
    const service = makeCreateClientService();
    const client = await service.execute({
      name,
      email,
      birthday: new Date(birthday),
    });
    return response.status(201).json(client);
  } catch (error) {
    return response
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Erro ao criar cliente",
      });
  }
}
