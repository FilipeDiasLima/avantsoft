import jwt from "jsonwebtoken";
import { BcryptService } from "../../common/cryptography/bcrypt.service";
import { UserRepository } from "../repositories/user-repository";

export class RegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await this.bcryptService.hash(password);

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      "segredo_xiu",
      {
        expiresIn: "10d",
      }
    );

    return { user: newUser, token };
  }
}
