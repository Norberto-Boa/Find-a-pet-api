import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchPetService } from '../../../services/factories/make-fetch-pet-service';

export async function searchPet(request: FastifyRequest, reply: FastifyReply) {
  const searchPetParamsSchema = z.object({
    city: z.string({ required_error: "To search for pets you nedd to provide a city" }),
    age: z.string().optional(),
    size: z.string().optional(),
    page: z.coerce.number().default(1)
  })

  const { city, page, age, size } = searchPetParamsSchema.parse(request.query);

  const fetchPetService = makeFetchPetService()
  const { pets } = await fetchPetService.execute({
    city,
    age,
    size,
    page
  });

  return reply.status(200).send(pets);
}