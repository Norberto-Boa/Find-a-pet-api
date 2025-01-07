import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authentication Controller e2e", () => {
  beforeAll(async () => {
    await app.ready();

  })

  afterAll(async () => {
    await app.close();
  })

  it("should be able to register", async () => {

    const user = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      city: "Maputo",
      neighborhood: "Sikwama",
      province: "Matola",
      latitude: 40.7128,
      longitude: -74.0060,
      phone: "1234567890"
    });

    const response = await request(app.server).post("/auth").send({
      email: "john.doe@example.com",
      password: "password123",
    })


    expect(response.statusCode).toEqual(200);
  })

})