import { makeRegisterService } from "@/services/factories/make-register-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string({ required_error: "Name is required!" }).min(3, { message: "Name must be greater than 3 letters." }).trim(),
    email: z.string({ required_error: "Email is required!" }).email({ message: "Email format is incorrect" }).trim(),
    password: z.string({ required_error: "Password is required!" }).min(8, { message: "Password must be at least 8 characters" }),
    city: z.string({ required_error: "City is required" }),
    neighborhood: z.string({ required_error: "Neigborhood is required" }),
    province: z.string({ required_error: "Province is required" }),
    latitude: z.coerce.number({ required_error: "Latitude is required" }),
    longitude: z.coerce.number({ required_error: "Longitude is required" }),
    phone: z.string({ required_error: "Phone number is required" }).regex(new RegExp("^\\d+$"), { message: "Phone number should only contain numbers" })
  });

  const {
    name,
    email,
    password,
    city,
    neighborhood,
    province,
    latitude,
    longitude,
    phone
  }
    = registerBodySchema.parse(request.body);


  const registerService = makeRegisterService();
  const user = registerService.execute({
    name,
    email,
    password,
    city,
    province,
    neighborhood,
    latitude,
    longitude,
    role: "ORGANIZATION",
    phone
  });

  return reply.status(201).send({
    user
  });
}