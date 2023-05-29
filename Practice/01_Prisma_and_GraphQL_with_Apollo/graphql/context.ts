import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface Context {
  db: PrismaClient;
}

export async function createContext({ req, res }): Promise<Context> {
  return {
    db: prisma,
  };
}
