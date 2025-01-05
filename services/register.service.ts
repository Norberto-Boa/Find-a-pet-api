import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
  longitude: number;
  latitude: number;
  role: "ADMIN" | "ORGANIZATION";
  phone: string;
  address: string;
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRespository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
    address,
    latitude,
    longitude,
    role,
    phone
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const passwordHash = await bcrypt.hash(password, 6);

    const userWithSameEmail = await this.usersRespository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("Email already exists");
    }

    const user = await this.usersRespository.create({
      name,
      email,
      password: passwordHash,
      address,
      latitude,
      longitude,
      phone,
      role
    })

    return { user };
  }
}