import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../register.service";

export function makeRegisterService() {
  const userRepository = new PrismaUsersRepository();
  const registerSerivce = new RegisterService(userRepository);

  return registerSerivce;
}