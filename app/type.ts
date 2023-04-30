import { z } from "zod";

/**
 * zodによって定義されたバージョンを表す正規表現
 */
export const zVersion = z.string().regex(/^\d+\.\d+\.\d+$/);

/**
 * アプリケーションの設定を表すオブジェクトの型定義
 *
 * @property {string} version - アプリケーションのバージョン（zVersionで定義される形式）
 * @property {string} faq - FAQのリンク先URL
 * @property {string} tos - 利用規約のリンク先URL
 */
export const zSettings = z.object({
  version: zVersion,
  faq: z.string(),
  tos: z.string(),
});

/**
 * zSettingsで定義された型の推論型
 */
export type Settings = z.infer<typeof zSettings>;
