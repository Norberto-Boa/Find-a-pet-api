import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register.service";

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
      address: "123 Main St",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.password).not.to.equal(expect);
  })
})