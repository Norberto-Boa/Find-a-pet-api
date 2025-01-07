import type { Prisma, Requirement } from "@prisma/client";
import type { RequirementsRepository } from "../requirements-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRequirementsRepository implements RequirementsRepository {
  async create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement> {
    const requirement = await prisma.requirement.create({
      data
    });

    return requirement;
  }
}