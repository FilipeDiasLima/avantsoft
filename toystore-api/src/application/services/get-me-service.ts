import { User } from "../../generated/prisma";
import { UserRepository } from "../repositories/user-repository";

export class GetMeService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<Omit<User, "password"> | null> {
    if (!userId) throw new Error("ID do usuário é obrigatório.");

    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("Usuário não encontrado.");

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
