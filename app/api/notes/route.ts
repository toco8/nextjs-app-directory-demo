import { zUpsertNote } from "@/app/notes/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * 全てのノートを取得するAPIハンドラー
 * @returns {Promise<NextResponse>} ノートの一覧を含むJSON形式のNextResponse
 */
export async function GET() {
  // データベースから全てのノートを取得
  const notes = await prisma.note.findMany();

  // ノート一覧をJSON形式のNextResponseで返す
  return NextResponse.json(notes);
}

/**
 * 新しいノートを作成するAPIハンドラー
 * @param {NextRequest} req リクエスト
 * @returns {Promise<NextResponse>} 作成されたノートのIDを含むNextResponse
 */
export async function POST(req: NextRequest) {
  // リクエストボディをJSON形式で取得
  const data: unknown = await req.json();

  // リクエストボディの検証
  const parsedData = zUpsertNote.parse(data);

  // ノートをデータベースに保存
  const note = await prisma.note.create({
    data: { title: parsedData.title, body: parsedData.body },
  });

  // 作成されたノートのIDを含むNextResponseを返す
  return new NextResponse(`${note.id}`, { status: 201 });
}
