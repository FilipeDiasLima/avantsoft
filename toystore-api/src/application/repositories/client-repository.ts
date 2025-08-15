import { Client } from "@prisma/client";

export interface ClientRepository {
  create(
    data: Omit<Client, "id" | "createdAt" | "updatedAt" | "deletedAt" | "Sale">
  ): Promise<Client>;
  findByEmail(email: string): Promise<Client | null>;

  findAll(params: { name?: string; email?: string }): Promise<Client[]>;
  update(
    id: string,
    data: Partial<
      Omit<Client, "id" | "createdAt" | "updatedAt" | "deletedAt" | "Sale">
    >
  ): Promise<Client>;
  delete(id: string): Promise<void>;
}
