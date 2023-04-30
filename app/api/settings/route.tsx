import { zSettings } from "@/app/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUTリクエストを処理し、サーバーの設定を更新します。
 * @param req - HTTPリクエストオブジェクト
 * @returns HTTPレスポンスオブジェクト
 */
export async function PUT(req: NextRequest) {
  const data: unknown = await req.json();
  const parsedData = zSettings.parse(data);
  // データベーストランザクションを開始して複数のクエリを一括で実行
  await prisma.$transaction([
    prisma.metadata.update({
      where: { key: "version" },
      data: { value: parsedData.version },
    }),
    prisma.metadata.update({
      where: { key: "faq" },
      data: { value: parsedData.faq },
    }),
    prisma.metadata.update({
      where: { key: "tos" },
      data: { value: parsedData.tos },
    }),
  ]);
  // HTTPステータスコード204（No Content）を返す
  return new NextResponse(null, { status: 204 });
}
