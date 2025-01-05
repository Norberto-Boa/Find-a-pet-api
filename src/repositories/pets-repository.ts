import type { Pet, Prisma } from "@prisma/client";

export interface FetchPetParams {
  city: string;
  age?: string;
  size?: string;
  page: number;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  fetchMany(params: FetchPetParams): Promise<Pet[]>
}