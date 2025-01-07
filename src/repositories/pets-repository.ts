import type { Pet, Prisma, User } from "@prisma/client";

export interface FetchPetParams {
  city: string;
  age?: "NEWBORN" | "YOUNG" | "ADULT" | "OLD";
  size?: "SMALL" | "MEDIUM" | "BIG";
  page: number;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<{ pet: Pet, organization: User } | null>
  fetchMany(params: FetchPetParams): Promise<Pet[]>
}