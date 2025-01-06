import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { FetchSinglePetService } from "./fetch-single-pet.service";
import { ResourceNotFound } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchSinglePetService;

describe("Fetch Pet Service", () => {

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    petsRepository = new InMemoryPetsRepository(usersRepository);
    sut = new FetchSinglePetService(petsRepository);

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


  })

  it("Should be able to fecth a single pet", async () => {
    // Creating In town pet
    const newPet = await petsRepository.create({
      name: "In Town Pet",
      age: "NEWBORN",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      environment: "CLOSED",
      breed: "Buerbull",
      independent: "HIGH",
      user_id: "user"
    });

    const { pet, organizatio } = await sut.execute({ id: newPet.id });

    expect(pet.id).toEqual(newPet.id);
    expect(pet.name).toEqual("In Town Pet");
  })

  it("should not throw an error if id is invalid", async () => {
    await expect(async () => {
      await sut.execute({ id: "1234" });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
})