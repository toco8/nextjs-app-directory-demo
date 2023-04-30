"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";

/**
 * NewNoteコンポーネントは、新しいノートを作成するフォームを表示します。
 * フォームの入力内容をもとに、ノートを作成することができます。
 */
const NewNote: React.FC = () => {
  // Next.jsのuseRouterフックを使用して、ルーターオブジェクトを取得します。
  const router = useRouter();

  // useStateフックを使用して、titleおよびbodyという2つの状態変数を定義します。
  // これらの変数は、ユーザーが入力したタイトルと本文の値を保持します。
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // useCallbackフックを使用して、createNote関数を定義します。
  // この関数は、ノートを作成するためのHTTP POSTリクエストを発行します。
  const createNote = useCallback(async () => {
    const res = await fetch(`/api/notes`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // HTTPレスポンスが成功した場合、レスポンスボディからノートのIDを取得して、アラートを表示し、該当するノートページに遷移します。
    if (res.ok) {
      const id = z.number().parse(await res.json());
      alert("Note created");
      router.push(`/notes/${id}`);
      router.refresh();
    }
    // HTTPレスポンスが失敗した場合、エラーアラートを表示します。
    else {
      alert("Note failed to create");
    }
  }, [body, router, title]);

  return (
    // フォームのレイアウトを定義します。
    <div className="flex flex-col bg-gray-100 rounded-lg relative p-5 gap-2.5">
      <div className="sm:col-span-2">
        {/* タイトルの入力欄 */}
        <label
          htmlFor="title"
          className="inline-block text-gray-800 text-sm sm:text-base mb-2"
        >
          Title
        </label>
        <input
          name="title"
          className="w-full bg-gray-50 text-gray-800 border focus:ring ring-pink-300 rounded outline-none transition duration-100 px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        {/* 本文の入力欄 */}
        <label
          htmlFor="body"
          className="inline-block text-gray-800 text-sm sm:text-base mb-2"
        >
          Body
        </label>
        <textarea
          name="body"
          className="w-full h-64 bg-gray-50 text-gray-800 border focus:ring ring-pink-300 rounded outline-none transition duration-100 px-3 py-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2.5">
        <Link
          href={`/notes`}
          className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-pink-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Cancel
        </Link>
        <button
          onClick={createNote}
          className="inline-block bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus-visible:ring ring-pink-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewNote;
