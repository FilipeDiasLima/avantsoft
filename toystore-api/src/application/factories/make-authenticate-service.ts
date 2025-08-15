import { BcryptService } from "../../common/cryptography/bcrypt.service";
import { PrismaUserRepository } from "../../infra/database/repositories/prisma-user-repository";
import { AuthenticateService } from "../services/authenticate-service";

export function makeAuthenticateService() {
  const user = new PrismaUserRepository();
  const bcrypt = new BcryptService();

  const authenticateService = new AuthenticateService(user, bcrypt);

  return authenticateService;
}
