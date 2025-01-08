import { makeFetchSinglePetService } from "@/services/factories/make-fetch-single-pet-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetParams = z.object({
    id: z.string().uuid()
  })

  const { id } = fetchPetParams.parse(request.params);

  const makeFetchPet = makeFetchSinglePetService();
  const { pet } = await makeFetchPet.execute({
    id
  });

  return reply.status(200).send({ pet });
}