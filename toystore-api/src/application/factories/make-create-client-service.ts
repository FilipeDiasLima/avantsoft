import { CreateClientService } from "../services/create-client-service";
import { makeClientRepository } from "./make-client-repository";

export function makeCreateClientService() {
  const clientRepository = makeClientRepository();
  return new CreateClientService(clientRepository);
}
