import { Client } from "@prisma/client";
import { ClientRepository } from "../repositories/client-repository";

interface CreateClientInput {
  name: string;
  email: string;
  birthday: Date;
}

export class CreateClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute({ name, email, birthday }: CreateClientInput): Promise<Client> {
    if (!name) throw new Error("O nome é obrigatório.");
    if (!email) throw new Error("O e-mail é obrigatório.");
    if (!birthday) throw new Error("A data de nascimento é obrigatória.");

    const existing = await this.clientRepository.findByEmail(email);
    if (existing) throw new Error("E-mail já cadastrado.");

    return this.clientRepository.create({ name, email, birthday });
  }
}
