import type { PetsRepository } from "@/repositories/pets-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import type { Pet, Requirement } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import type { RequirementsRepository } from "@/repositories/requirements-repository";

interface CreatePetServiceRequest {
  name: string;
  age: "NEWBORN" | "YOUNG" | "ADULT" | "OLD";
  size: "SMALL" | "MEDIUM" | "BIG";
  energy_level: "LOW" | "MEDIUM" | "HIGH";
  environment: "OPEN_SPACE" | "CLOSED" | "BOTH";
  independent: "LOW" | "MEDIUM" | "HIGH";
  breed: string;
  user_id: string;
  requirements?: string[];
}

interface CreatePetServiceResponse {
  pet: Pet,
  requirements?: string[];
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private usersRepository: UsersRepository,
    private requirementsRepository: RequirementsRepository
  ) { };

  async execute({
    name,
    age,
    size,
    energy_level,
    environment,
    breed,
    independent,
    user_id,
    requirements
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const doesUserExist = await this.usersRepository.findById(user_id);

    if (!doesUserExist) {
      throw new ResourceNotFound();
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      size,
      energy_level,
      environment,
      independent,
      breed,
      user_id,
    });

    let createdRequirements: string[] = [];

    if (requirements) {
      // createdRequirements = requirements.map(async (item) => await this.requirementsRepository.create({
      //   title: item,
      //   pet_id: pet.id
      // }))

      requirements.forEach((item) => {
        this.requirementsRepository.create({
          title: item,
          pet_id: pet.id
        })

        createdRequirements.push(item);
      })
    }

    if (createdRequirements) {
      return { pet, requirements: createdRequirements };
    }

    return { pet };
  }
}