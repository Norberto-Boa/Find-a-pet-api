import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Pet Controller e2e", () => {
  beforeAll(async () => {
    await app.ready();

  })

  afterAll(async () => {
    await app.close();
  })

  it("should be able to create a pet with requirements", async () => {
    const token = await createAndAuthenticateUser(app);

    await request(app.server)
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

    await request(app.server)
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


    const response = await request(app.server)
      .get(`/pets`)
      .query({
        city: "Maputo"
      })
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(2);
  })
})