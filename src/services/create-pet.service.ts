import type { PetsRepository } from "@/repositories/pets-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import type { Pet } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface CreatePetServiceRequest {
  name: string;
  age: "NEWBORN" | "YOUNG" | "ADULT" | "OLD";
  size: "SMALL" | "MEDIUM" | "BIG";
  energy_level: "LOW" | "MEDIUM" | "HIGH";
  environment: "OPEN_SPACE" | "CLOSED" | "BOTH";
  independent: "LOW" | "MEDIUM" | "HIGH";
  breed: string;
  user_id: string;
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private usersRepository: UsersRepository
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

    return { pet };
  }
}