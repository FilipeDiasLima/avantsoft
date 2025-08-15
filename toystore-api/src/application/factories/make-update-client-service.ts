import { UpdateClientService } from "../services/update-client-service";
import { makeClientRepository } from "./make-client-repository";

export function makeUpdateClientService() {
  const clientRepository = makeClientRepository();
  return new UpdateClientService(clientRepository);
}
