import { PrismaClient } from '@prisma/client';

// Single Prisma client instance. Route handlers import from here.
// In unit tests this module is mocked (per AGENTS.md) — tests never touch the real DB.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
