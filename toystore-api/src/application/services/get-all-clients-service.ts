import { Client } from "@prisma/client";
import { ClientRepository } from "../repositories/client-repository";

interface GetAllClientsParams {
  name?: string;
  email?: string;
}

export class GetAllClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(params: GetAllClientsParams = {}): Promise<Client[]> {
    return this.clientRepository.findAll(params);
  }
}
