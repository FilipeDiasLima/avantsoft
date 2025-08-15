import { DeleteClientService } from "../services/delete-client-service";
import { makeClientRepository } from "./make-client-repository";

export function makeDeleteClientService() {
  const clientRepository = makeClientRepository();
  return new DeleteClientService(clientRepository);
}
