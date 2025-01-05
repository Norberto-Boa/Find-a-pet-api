import type { RequirementsRepository } from "@/repositories/requirements-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";


interface CreateRequirementServiceRequest {
  title: string;
  pet_id: string;
}

interface CreateRequirementServiceResponse { }

export class CreateRequirementService {
  constructor(
    private requirementsRepository: RequirementsRepository,
    private usersRepository: UsersRepository
  ) { };
  async execute({ pet_id, title }: CreateRequirementServiceRequest) {
    const doesPetExist = await this.usersRepository.findById(pet_id);

    if (!doesPetExist) {
      throw new ResourceNotFound();
    }

    const requirement = await this.requirementsRepository.create({
      title,
      pet_id
    })

    return { requirement };
  }
}