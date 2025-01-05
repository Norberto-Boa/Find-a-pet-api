import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register.service";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  })

  it("Should be able to register a user", async () => {
    const { user } = await sut.execute({
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

    expect(user.id).toEqual(expect.any(String));
    expect(user.password).not.to.equal(expect);
  })

  it("Should throw an error when user email is duplicate", async () => {
    await sut.execute({
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

    await expect(async () => {
      await sut.execute({
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
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  })

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare("password123", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);

  })
})