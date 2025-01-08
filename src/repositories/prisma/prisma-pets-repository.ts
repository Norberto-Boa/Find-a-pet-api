import type { Prisma, Pet, User } from "@prisma/client";
import type { FetchPetParams, PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    });

    return pet;
  }

  async fetchMany(params: FetchPetParams): Promise<Pet[]> {
    const pet = await prisma.pet.findMany({
      where: {
        user: {
          city: params.city
        },
        age: params.age ? params.age : undefined,
        size: params.size ? params.size : undefined
      },
      skip: (params.page - 1) * 20,
      take: 20
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        user: true
      }
    });

    if (!pet) {
      return null;
    }

    return pet;
  }
}