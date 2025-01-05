import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory-requirements-repository";
import { CreateRequirementService } from "./create-requirement.service";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let requirementsRepository: InMemoryRequirementsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreateRequirementService;

describe("Create Pet Service", () => {

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreateRequirementService(requirementsRepository, petsRepository);
  })

  it("Should be able to create a requirement", async () => {

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

    const pet = await petsRepository.create({
      name: "Buddy",
      age: "NEWBORN",
      size: "MEDIUM",
      energy_level: "MEDIUM",
      environment: "CLOSED",
      breed: "Buerbull",
      independent: "HIGH",
      user_id: "user"
    });

    const { requirement } = await sut.execute({
      title: "Have an open Space",
      pet_id: pet.id
    });

    expect(requirement.id).toEqual(expect.any(String));
  })

  it("Should not be able to create a requirement if pet is invalid", async () => {


    await expect(async () => await sut.execute({
      title: "Have an open Space",
      pet_id: "pet.id"
    })).rejects.toBeInstanceOf(ResourceNotFound);
  })
})