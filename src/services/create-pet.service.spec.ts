import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetService } from "./create-pet.service";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreatePetService;

describe("Create Pet Service", () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreatePetService(petsRepository, usersRepository);
  })

  it("Should be able to create a pet", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("password123", 6),
      address: "123 Main St",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    })

    const { pet } = await sut.execute({
      name: "Buddy",
      age: "NEWBORN",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      environment: "CLOSED",
      breed: "Buerbull",
      independent: "HIGH",
      user_id: user.id
    })

    expect(pet.id).toEqual(expect.any(String));
  })

  it("Should not be able to create a pet if user is invalid", async () => {
    await expect(async () => {
      await sut.execute({
        name: "Buddy",
        age: "NEWBORN",
        size: "MEDIUM",
        energy_level: "MEDIUM",
        environment: "CLOSED",
        breed: "Buerbull",
        independent: "HIGH",
        user_id: "user.id"
      })
    }).rejects.toBeInstanceOf(ResourceNotFound);
  })


})