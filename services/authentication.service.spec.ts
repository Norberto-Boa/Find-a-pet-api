import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { compare, hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { AuthenticationService } from "./authentication.service";
import { InvalidCredentials } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticationService;

describe("Authentication Service", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticationService(usersRepository);
  })

  it("Should be able to register a user", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("password123", 6),
      address: "123 Main St",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    });

    const { user } = await sut.execute({
      email: "john.doe@example.com",
      password: "password123"
    });


    expect(user.email).toEqual("john.doe@example.com");
  })

  it("should throw an error when password is invalid", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("password123", 6),
      address: "123 Main St",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    });

    await expect(async () => {
      await sut.execute({
        email: "john.doe@example.com",
        password: "12345"
      })
    }).rejects.toBeInstanceOf(InvalidCredentials);

  })
})