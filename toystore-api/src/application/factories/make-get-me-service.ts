import { PrismaUserRepository } from "../../infra/database/repositories/prisma-user-repository";
import { GetMeService } from "../services/get-me-service";

export function makeGetMeService() {
  const userRepository = new PrismaUserRepository();
  return new GetMeService(userRepository);
}
