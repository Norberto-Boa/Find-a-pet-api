import type { Prisma, Requirement } from "@prisma/client";
import type { RequirementsRepository } from "../requirements-repository";
import { randomUUID } from "crypto";
import type { title } from "process";

export class InMemoryRequirementsRepository implements RequirementsRepository {
  private items: Requirement[] = [];

  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const requirement = {
      id: randomUUID().toString(),
      title: data.title,
      pet_id: data.pet_id
    }

    this.items.push(requirement);

    return requirement;
  }
}