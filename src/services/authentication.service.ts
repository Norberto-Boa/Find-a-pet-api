import type { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentials } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface authenticationServiceRequest {
  email: string;
  password: string;
}

interface authenticationServiceResponse {

}

export class AuthenticationService {
  constructor(private userRepository: UsersRepository) { };

  async execute({ email, password }: authenticationServiceRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentials();
    }

    return {
      user
    }

  }
}