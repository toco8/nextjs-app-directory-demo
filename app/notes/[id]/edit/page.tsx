import Link from "next/link";
import { Metadata } from "next/types";
import { getNote } from "../getNote";
import EditNote from "./EditNote";

export const revalidate = 0;

/**
 * ページのmetadataを生成
 *
 * @param params - ページ生成に必要なパラメータ
 * @param params.id - 編集するノートのID
 * @returns ページのmetadataを表すオブジェクト
 */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const note = await getNote(params.id);

  return { title: note.title };
}

/**
 * ノートを編集するページを表すコンポーネント
 *
 * @param params - ページ生成に必要なパラメータ
 * @param params.id - 編集するノートのID
 * @returns ページのReact要素
 */
export default async function Page({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  return (
    <main className="mx-2 sm:mx-4">
      {/* 前のページに戻るリンク */}
      <Link
        href={`/notes/${params.id}`}
        className="inline-block focus-visible:ring ring-pink-300 text-gray-500 hover:text-pink-500 active:text-pink-600 text-s md:text-base font-semibold rounded-lg outline-none transition duration-100"
      >
        ← back
      </Link>
      {/* ページのタイトル */}
      <h2 className="my-4 text-gray-400 text-xs">Edit Note</h2>
      {/* ノートの編集フォーム */}
      <EditNote item={note} />
    </main>
  );
}
