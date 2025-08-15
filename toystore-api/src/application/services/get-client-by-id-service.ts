import { Client } from "@prisma/client";
import { ClientRepository } from "../repositories/client-repository";

export class GetClientByIdService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<Client | null> {
    const all = await this.clientRepository.findAll({});
    return all.find((c) => c.id === id) || null;
  }
}
