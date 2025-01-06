import type { PetsRepository } from "@/repositories/pets-repository";
import type { Pet } from "@prisma/client";
import { CityNotProvided } from "./errors/city-not-provided-error";


interface FetchPetServiceRequest {
  city: string;
  age?: string;
  size?: string;
  page: number;
}

interface FetchPetServiceResponse {
  pets: Pet[];
}

export class FetchPetService {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ city, age, size, page }: FetchPetServiceRequest) {
    if (!city || city === "") {
      throw new CityNotProvided();
    }

    const pets = await this.petsRepository.fetchMany({ city, age, size, page });

    return { pets };
  }
}