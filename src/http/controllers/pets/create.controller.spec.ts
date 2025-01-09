import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { makePet } from "test/factories/make-pet";

describe("Create Pet Controller e2e", () => {
  beforeAll(async () => {
    await app.ready();

  })

  afterAll(async () => {
    await app.close();
  })

  it("should be able to create a pet", async () => {
    const token = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet())

    expect(response.statusCode).toEqual(201);
  })

  it("should be able to create a pet with requirements", async () => {
    const token = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Buddy",
        age: "NEWBORN",
        size: "MEDIUM",
        energy_level: "MEDIUM",
        environment: "CLOSED",
        breed: "Buerbull",
        independent: "HIGH",
        requirementsToCreate: [
          "Be rich", "Be super Rich"
        ]
      })

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        requirements: [
          "Be rich", "Be super Rich"
        ]
      })
    )
  })
})