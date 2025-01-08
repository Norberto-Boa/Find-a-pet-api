import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchSinglePetService } from "../fetch-single-pet.service";

export function makeFetchSinglePetService() {
  const petsRepository = new PrismaPetsRepository();
  const makeFetchSinglePetService = new FetchSinglePetService(petsRepository);

  return makeFetchSinglePetService;
}