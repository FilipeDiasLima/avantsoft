import { Client } from "@prisma/client";
import { ClientRepository } from "../repositories/client-repository";

interface UpdateClientInput {
  id: string;
  name?: string;
  email?: string;
  birthday?: Date;
}

export class UpdateClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute({ id, ...data }: UpdateClientInput): Promise<Client> {
    if (!id) throw new Error("ID do cliente é obrigatório.");
    return this.clientRepository.update(id, data);
  }
}
