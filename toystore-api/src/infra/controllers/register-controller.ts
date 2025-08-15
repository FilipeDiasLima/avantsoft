import { Request, Response } from "express";
import z from "zod";
import { makeRegisterService } from "../../application/factories/make-register-service";

const createUserSchema = z.object({
  email: z.email({
    error: "O e-mail é obrigatório.",
  }),
  password: z.string().min(1, { error: "A senha é obrigatória." }),
});

export async function registerController(request: Request, response: Response) {
  try {
    const { email, password } = createUserSchema.parse(request.body);

    const registerService = makeRegisterService();

    const { user, token } = await registerService.execute(email, password);

    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(401).json({
      error:
        error instanceof Error ? error.message : "Erro ao registrar usuário",
    });
  }
}
