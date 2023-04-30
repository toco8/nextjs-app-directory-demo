// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from "@prisma/client";
import "server-only";

// PrismaClientをグローバルに保存するためのオブジェクト
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * PrismaClientインスタンスを返す関数
 * グローバル変数 globalForPrisma に保存されたインスタンスがあればそれを返し、
 * なければ新たにPrismaClientインスタンスを作成する。
 *
 * @returns {PrismaClient} PrismaClientインスタンス
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// 開発時のみグローバル変数にPrismaClientインスタンスを保存する
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
