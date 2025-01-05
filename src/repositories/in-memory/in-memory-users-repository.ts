import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";


export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      longitude: new Decimal(data.longitude.toString()),
      latitude: new Decimal(data.latitude.toString()),
      role: data.role,
      phone: data.phone,
      address: data.address,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.items.push(user);

    return user
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}