import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetService } from "../fetch-pet.service";

export function makeFetchPetService() {
  const petsRepository = new PrismaPetsRepository();
  const makeFetchPetService = new FetchPetService(petsRepository);

  return makeFetchPetService;
}