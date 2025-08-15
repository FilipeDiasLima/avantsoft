import { UserRepository } from "../../../application/repositories/user-repository";
import { User } from "../../../generated/prisma";
import { prisma } from "../prisma";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, user: User): Promise<User | null> {
    return await prisma.user.update({ where: { id }, data: user });
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await prisma.user.delete({ where: { id } });
    return !!deleted;
  }
}
