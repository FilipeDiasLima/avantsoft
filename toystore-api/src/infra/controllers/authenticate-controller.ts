import { Request, Response } from "express";
import z from "zod";
import { makeAuthenticateService } from "../../application/factories/make-authenticate-service";

const createUserSchema = z.object({
  email: z.email({
    error: "O e-mail é obrigatório.",
  }),
  password: z.string().min(1, { error: "A senha é obrigatória." }),
});

export async function authenticateController(
  request: Request,
  response: Response
) {
  try {
    const { email, password } = createUserSchema.parse(request.body);

    const authenticateService = makeAuthenticateService();

    const { user, token } = await authenticateService.execute(email, password);

    return response.status(200).json({ user, token });
  } catch (error) {
    return response
      .status(401)
      .json({
        error: error instanceof Error ? error.message : "Erro de autenticação",
      });
  }
}
