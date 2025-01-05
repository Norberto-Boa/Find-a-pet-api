import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory-requirements-repository";
import { CreateRequirementService } from "./create-requirement.service";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { FetchPetService } from "./fecth-pet.service";

let usersRepository: InMemoryUsersRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetService;

describe("Fetch Pet Service", () => {

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    petsRepository = new InMemoryPetsRepository(usersRepository);
    sut = new FetchPetService(petsRepository);
  })

  it("Should be fecth a pet", async () => {

    await usersRepository.create({
      id: "user",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      city: "Maputo",
      neighborhood: "Sikwama",
      province: "Matola",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    });

    await usersRepository.create({
      id: "user-3",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      city: "Maputo",
      neighborhood: "Sikwama",
      province: "Matola",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    });

    await usersRepository.create({
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      city: "Matola",
      neighborhood: "Sikwama",
      province: "Matola",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    });

    await petsRepository.create({
      name: "In Town Pet",
      age: "NEWBORN",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      environment: "CLOSED",
      breed: "Buerbull",
      independent: "HIGH",
      user_id: "user"
    });

    await petsRepository.create({
      name: "In Town Pet",
      age: "NEWBORN",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      environment: "CLOSED",
      breed: "Buerbull",
      independent: "HIGH",
      user_id: "user-3"
    });

    await petsRepository.create({
      name: "Off Town Pet",
      age: "NEWBORN",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      environment: "CLOSED",
      breed: "Buerbull",
      independent: "HIGH",
      user_id: "user-1"
    });

    const { pets } = await sut.execute({ city: "Maputo", page: 1 });

    expect(pets.length).toEqual(2);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "In Town Pet"
      }),
      expect.objectContaining({
        name: "In Town Pet"
      })
    ])
  })

})