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

  it("should be able to fetch pets", async () => {
    const token = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet())

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet())


    const response = await request(app.server)
      .get(`/pets`)
      .query({
        city: "Maputo"
      })
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(2);
  })

  it("Should not be able to fetch pets without city", async () => {
    const response = await request(app.server).get(`/pets`)
    expect(response.status).toBe(400);
  })

  it("Should be able to search pets by city and age", async () => {
    const token = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet({ age: "YOUNG" }));

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet({ age: "OLD" }));

    const response = await request(app.server)
      .get("/pets")
      .query({
        city: "Maputo",
        age: "YOUNG"
      });


    expect(response.status).toBe(200);
    expect(response.body).toEqual([expect.objectContaining({
      age: "YOUNG"
    })]);
  })

  it("Should be able to search pets by city and size", async () => {
    const token = createAndAuthenticateUser(app);

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet({ size: "BIG" }));

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet({ size: "SMALL" }));

    await request(app.server)
      .post("/pet/create")
      .set("Authorization", "Bearer " + token)
      .send(makePet({ size: "MEDIUM" }));

    const response = await request(app.server)
      .get("/pets")
      .query({
        city: "Maputo",
        size: "BIG"
      });

    expect(response.status).toBe(200);

  })
})