"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Note } from "../type";

type Props = {
  item: Note;
};

/**
 * ノートの表示と削除を行うReactコンポーネント
 * @param {Object} props - ノートの情報を含むprops
 * @param {Note} props.item - ノートの情報
 */
const Note: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  /**
   * ノートを削除する関数
   * 削除に成功したら、アラートを表示してノート一覧ページに遷移
   * 削除に失敗したら、アラートを表示
   */
  const deleteNote = useCallback(async () => {
    const res = await fetch(`/api/notes/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Note deleted");
      router.push(`/notes`);
      router.refresh();
    } else {
      alert("Note failed to delete");
    }
  }, [item.id, router]);

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg relative p-5 gap-2.5">
      <h3 className="text-pink-500 text-lg md:text-xl font-semibold break-all">
        {item.title}
      </h3>
      <p className="text-gray-500 break-all">{item.body}</p>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2.5">
        {/* ノート編集ページへのリンク */}
        <Link
          href={`/notes/${item.id}/edit`}
          className="inline-block bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus-visible:ring ring-pink-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Edit
        </Link>
        {/* ノート削除ボタン */}
        <button
          onClick={deleteNote}
          className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-pink-300 text-red-500 active:text-red-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
