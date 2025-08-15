import { GetClientByIdService } from "../services/get-client-by-id-service";
import { makeClientRepository } from "./make-client-repository";

export function makeGetClientByIdService() {
  const clientRepository = makeClientRepository();
  return new GetClientByIdService(clientRepository);
}
