import { makeAuthenticationService } from "@/services/factories/make-authentication-service";
import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    age: z.enum(["NEWBORN", "YOUNG", "ADULT", "OLD"]),
    size: z.enum(["SMALL", "MEDIUM", "BIG"]),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    environment: z.enum(["OPEN_SPACE", "CLOSED", "BOTH"]),
    independent: z.enum(["LOW", "MEDIUM", "HIGH"]),
    breed: z.string(),
    requirementsToCreate: z.array(z.string()).optional()
  })

  const { name, age, size, energy_level, environment, independent, breed, requirementsToCreate } = createPetSchema.parse(request.body);

  const createPetService = makeCreatePetService();
  const { pet, requirements } = await createPetService.execute({
    user_id: request.user.sub,
    name,
    age,
    size,
    energy_level,
    environment,
    independent,
    breed,
    requirements: requirementsToCreate
  });

  return reply.status(200).send({
    pet, requirements: requirements ? requirements : []
  });
}