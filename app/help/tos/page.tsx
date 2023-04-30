import Nl2br from "@/components/Nl2br";
import { prisma } from "@/globals/db";

export const revalidate = 0;

/**
 * 利用規約ページを表示するコンポーネント
 * @returns {Promise<JSX.Element>}
 */
export default async function Page() {
  // データベースから利用規約ページのデータを取得
  const data = await prisma.metadata.findUniqueOrThrow({
    where: { key: "tos" },
  });

  // 利用規約ページのデータを親コンポーネントに返す
  return (
    <main>
      <h1 className="text-xl my-2">利用規約</h1>
      <p className="text-xs text-gray-400 my-2">以下の文章はサンプルです。</p>
      <Nl2br>{data.value}</Nl2br>
    </main>
  );
}
