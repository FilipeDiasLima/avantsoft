import { User } from "../../generated/prisma";

export abstract class UserRepository {
  abstract create(user: Omit<User, "id">): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, user: User): Promise<User | null>;
  abstract delete(id: string): Promise<boolean>;
}
