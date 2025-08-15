import { PlatformIndicatorsService } from "../services/platform-indicators-service";
import { makeSaleRepository } from "./make-sale-repository";

export function makePlatformIndicatorsService() {
  const saleRepository = makeSaleRepository();
  return new PlatformIndicatorsService(saleRepository);
}
