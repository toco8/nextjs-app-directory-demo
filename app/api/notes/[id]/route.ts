import { zUpsertNote } from "@/app/notes/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * 指定されたIDに対応するノートを取得
 * @param _req - HTTPリクエスト
 * @param {Object} params - URLパラメータ
 * @param {string} params.id - ノートのID
 * @returns {Promise<NextResponse>} - 取得結果のレスポンスオブジェクト
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 指定されたIDに対応するノートを取得
  const note = await prisma.note.findUnique({
    where: { id: Number(params.id) },
  });

  // ノートが見つからない場合は404エラーを返す
  if (note === null) {
    return new NextResponse(null, { status: 404 });
  }

  // 取得したノートをJSON形式で返す
  return NextResponse.json(note);
}

/**
 * 指定されたIDに対応するノートを更新
 * @param {NextRequest} req - HTTPリクエスト
 * @param {Object} params - URLパラメータ
 * @param {string} params.id - ノートのID
 * @returns {Promise<NextResponse>} - 更新結果のレスポンスオブジェクト
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // リクエストボディからデータを取得
  const data: unknown = await req.json();

  // 取得したデータをパース
  const parcedData = zUpsertNote.parse(data);

  // 指定されたIDに対応するノートを更新
  const note = await prisma.note.update({
    where: { id: Number(params.id) },
    data: {
      title: parcedData.title,
      body: parcedData.body,
      updatedAt: new Date(),
    },
  });

  // 更新結果を返す
  return new NextResponse(null, { status: 204 });
}

/**
 * 指定されたIDに対応するノートを削除
 * @param {NextRequest} req - HTTPリクエスト
 * @param {Object} params - URLパラメータ
 * @param {string} params.id - ノートのID
 * @returns {Promise<NextResponse>} - 削除結果のレスポンスオブジェクト
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 指定されたIDに対応するノートを削除
  const note = await prisma.note.delete({
    where: { id: Number(params.id) },
  });

  // 削除結果を返す
  return new NextResponse(null, { status: 204 });
}
