import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreatePetService } from "../create-pet.service";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";

export function makeCreatePetService() {
  const usersRepository = new PrismaUsersRepository();
  const petsRepository = new PrismaPetsRepository();
  const requirementsRepository = new PrismaRequirementsRepository();
  const createPetService = new CreatePetService(petsRepository, usersRepository, requirementsRepository);

  return createPetService;
}