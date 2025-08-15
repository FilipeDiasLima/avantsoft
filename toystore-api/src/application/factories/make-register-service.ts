import { BcryptService } from "../../common/cryptography/bcrypt.service";
import { PrismaUserRepository } from "../../infra/database/repositories/prisma-user-repository";
import { RegisterService } from "../services/register-service";

export function makeRegisterService() {
  const user = new PrismaUserRepository();
  const bcrypt = new BcryptService();

  const registerService = new RegisterService(user, bcrypt);

  return registerService;
}
