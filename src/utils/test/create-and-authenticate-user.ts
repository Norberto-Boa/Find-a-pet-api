import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("password123", 6),
      city: "Maputo",
      neighborhood: "Sikwama",
      province: "Matola",
      latitude: 40.7128,
      longitude: -74.0060,
      role: "ADMIN",
      phone: "123-456-7890"
    }
  })

  const authResponse = await request(app.server).post("/auth").send({
    email: "john.doe@example.com",
    password: "password123"
  })

  const { token } = authResponse.body;

  return token;
}