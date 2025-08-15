import { ClientRepository } from "../repositories/client-repository";

export class DeleteClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new Error("ID do cliente é obrigatório.");
    await this.clientRepository.delete(id);
  }
}
