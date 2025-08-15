import { PrismaClientRepository } from "../../infra/database/repositories/prisma-client-repository";
import { ClientRepository } from "../repositories/client-repository";

export function makeClientRepository(): ClientRepository {
  return new PrismaClientRepository();
}
