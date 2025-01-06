import type { PetsRepository } from "@/repositories/pets-repository";
import type { Pet } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface fetchSinglePetServiceRequest {
  id: string;
}

interface fetchSinglePetServiceResponse {
  pet: Pet;
}

export class FetchSinglePetService {
  constructor(private petsRepostory: PetsRepository) { };

  async execute({ id }: fetchSinglePetServiceRequest) {
    const pet = await this.petsRepostory.findById(id);

    if (!pet) {
      throw new ResourceNotFound();
    }

    return { pet: pet.pet, organizatio: pet.organization };
  }
}