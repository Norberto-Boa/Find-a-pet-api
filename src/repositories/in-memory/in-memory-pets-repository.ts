import type { Prisma, Pet } from "@prisma/client";
import type { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";


export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID().toString(),
      name: data.name,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      independent: data.independent,
      breed: data.breed,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.items.push(pet);

    return pet;
  }
}