import { z } from "zod";

/**
 * Zodのスキーマを用いて、1つのノートオブジェクトを表現するオブジェクトを定義
 * @typedef {Object} zNote
 * @property {number} id - ノートのID（整数）
 * @property {string} title - ノートのタイトル
 * @property {string} body - ノートの内容
 * @property {Date} createdAt - ノートの作成日時
 * @property {Date} updatedAt - ノートの更新日時
 */
export const zNote = z.object({
  id: z.number().int(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * Zodのスキーマを用いて、複数のノートオブジェクトを表現する配列を定義
 * @typedef {Array} zNotes
 * @property {zNote} 0 - 1つ目のノートオブジェクト
 * @property {zNote} 1 - 2つ目のノートオブジェクト
 * ...
 */
export const zNotes = z.array(zNote);

/**
 * Zodのスキーマを用いて、新しいノートを作成または更新するためのオブジェクトを定義
 * @typedef {Object} zUpsertNote
 * @property {string} title - ノートのタイトル
 * @property {string} body - ノートの内容
 */
export const zUpsertNote = z.object({
  title: z.string(),
  body: z.string(),
});

/**
 * Zodのスキーマを用いて、ノートオブジェクトの型を定義
 * @typedef {Object} Note
 * @property {number} id - ノートのID（整数）
 * @property {string} title - ノートのタイトル
 * @property {string} body - ノートの内容
 * @property {Date} createdAt - ノートの作成日時
 * @property {Date} updatedAt - ノートの更新日時
 */
export type Note = z.infer<typeof zNote>;

/**
 * Zodのスキーマを用いて、複数のノートオブジェクトの型を定義
 * @typedef {Array} Notes
 * @property {Note} 0 - 1つ目のノートオブジェクト
 * @property {Note} 1 - 2つ目のノートオブジェクト
 * ...
 */
export type Notes = z.infer<typeof zNotes>;
