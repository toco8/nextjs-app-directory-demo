import { apiUrl } from "@/constants/api";
import "server-only";
import { zNote } from "../type";

/**
 * 指定されたidのノートデータを取得する
 * @param id 取得するノートのid
 * @returns 取得したノートデータ
 */
export const getNote = async (id: string) => {
  // APIからノートデータを取得する
  const res = await fetch(`${apiUrl}/notes/${id}`, { cache: "no-store" });
  // JSON形式のレスポンスをパースする
  const data: unknown = await res.json();
  // パースされたデータを型zNoteで定義された形式に変換する
  const note = zNote.parse(data);
  // 変換されたノートデータを返す
  return note;
};
