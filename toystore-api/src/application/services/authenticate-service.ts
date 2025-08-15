import jwt from "jsonwebtoken";
import { BcryptService } from "../../common/cryptography/bcrypt.service";
import { UserRepository } from "../repositories/user-repository";

export class AuthenticateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isMatchPassword = await this.bcryptService.compare(
      password,
      user.password
    );

    if (!isMatchPassword) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      "segredo_xiu",
      {
        expiresIn: "10d",
      }
    );

    return { user, token };
  }
}
