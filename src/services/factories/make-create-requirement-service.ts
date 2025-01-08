import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";
import { CreateRequirementService } from "../create-requirement.service";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreateRequirementService() {
  const requirementsRepository = new PrismaRequirementsRepository();
  const petsRepository = new PrismaPetsRepository();
  const makeCreateRequirementService = new CreateRequirementService(requirementsRepository, petsRepository);

  return makeCreateRequirementService;
}