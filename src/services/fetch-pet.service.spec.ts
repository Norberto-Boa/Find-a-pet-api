import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { FetchPetService } from "./fetch-pet.service";
import { CityNotProvided } from "./errors/city-not-provided-error";

let usersRepository: InMemoryUsersRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetService;

describe("Fetch Pet Service", () => {

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    petsRepository = new InMemoryPetsRepository(usersRepository);
    sut = new FetchPetService(petsRepository);

    // Creating user owner of pet
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

    // Creating In town pet
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
  })

  it("Should be fecth a pet", async () => {

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

    expect(pets.length).toEqual(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "In Town Pet"
      }),
    ])
  })

  it("should not fetch a pet when city is empty", async () => {
    await expect(async () => {
      await sut.execute({ city: "", page: 1 });
    }).rejects.toBeInstanceOf(CityNotProvided);
  });
})