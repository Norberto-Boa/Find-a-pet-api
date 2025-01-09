import type { Prisma, Pet } from "@prisma/client";
import type { FetchPetParams, PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import type { InMemoryUsersRepository } from "./in-memory-users-repository";


export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = [];

  constructor(private usersRepository: InMemoryUsersRepository) { };

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

  async findById(id: string) {
    const pet = await this.items.find((item) => item.id === id);

    if (!pet) {
      return null
    }

    const organization = await this.usersRepository.findById(pet.user_id);

    if (!organization) {
      return null
    }

    return { ...pet, user: organization };
  }

  async fetchMany({ city, size, age, page }: FetchPetParams) {
    const usersInTheCity = this.usersRepository.items.filter((org) => org.city === city);
    const userIdsInCity = new Set(usersInTheCity.map(user => user.id));

    const pets = this.items
      .filter(item => userIdsInCity.has(item.user_id))
      .filter(item => size ? item.size === size : true)
      .filter(item => age ? item.age === age : true)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }
}