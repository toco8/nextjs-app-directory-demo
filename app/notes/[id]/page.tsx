import Link from "next/link";
import { Metadata } from "next/types";
import Note from "./Note";
import { getNote } from "./getNote";

export const revalidate = 0;

/**
 * メタデータを生成する関数
 * @param {Object} params - パラメーターのオブジェクト
 * @param {string} params.id - ノートのID
 * @returns {Promise<Metadata>} メタデータのPromise
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
 * ページコンポーネント
 * @param {Object} params - パラメーターのオブジェクト
 * @param {string} params.id - ノートのID
 * @returns {JSX.Element} JSX要素
 */
export default async function Page({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const note = await getNote(params.id);

  return (
    <main className="mx-2 sm:mx-4">
      <Link
        href="/notes"
        className="inline-block focus-visible:ring ring-pink-300 text-gray-500 hover:text-pink-500 active:text-pink-600 text-s md:text-base font-semibold rounded-lg outline-none transition duration-100"
      >
        ← back
      </Link>
      <h2 className="my-4 text-gray-400 text-xs">View Note</h2>
      <Note item={note} />
    </main>
  );
}
