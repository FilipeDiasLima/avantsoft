import { GetAllClientsService } from "../services/get-all-clients-service";
import { makeClientRepository } from "./make-client-repository";

export function makeGetAllClientsService() {
  const clientRepository = makeClientRepository();
  return new GetAllClientsService(clientRepository);
}
