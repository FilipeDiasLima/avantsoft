import { PrismaClient } from "@prisma/client";
import { ClientRepository } from "../../../application/repositories/client-repository";

const prisma = new PrismaClient();

export class PrismaClientRepository implements ClientRepository {
  async create(data) {
    try {
      return await prisma.client.create({ data });
    } catch (error) {
      if (error.code === "P2002") {
        throw new Error("E-mail já cadastrado");
      }
      throw new Error("Erro ao criar cliente");
    }
  }

  async findByEmail(email) {
    return prisma.client.findUnique({ where: { email } });
  }

  async findAll(params) {
    const { name, email } = params;
    return prisma.client.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        email: email ? { contains: email } : undefined,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id, data) {
    try {
      return await prisma.client.update({ where: { id }, data });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Cliente não encontrado");
      }
      throw new Error("Erro ao atualizar cliente");
    }
  }

  async delete(id) {
    try {
      await prisma.client.delete({ where: { id } });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Cliente não encontrado");
      }
      throw new Error("Erro ao remover cliente");
    }
  }
}
