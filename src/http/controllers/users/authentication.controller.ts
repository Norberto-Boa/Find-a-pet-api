import { InvalidCredentials } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticationService } from "@/services/factories/make-authentication-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authentication(request: FastifyRequest, reply: FastifyReply) {
  const autheticantionBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })

  const { email, password } = autheticantionBodySchema.parse(request.body);

  try {
    const authenticationService = makeAuthenticationService();

    const { user } = await authenticationService.execute({ email, password });

    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      }
    )

    return reply.status(200).send({
      token
    })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return reply.status(400).send({
        message: err.message
      })
    }

    throw err
  }
}