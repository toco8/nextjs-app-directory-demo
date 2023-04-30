import Nl2br from "@/components/Nl2br";
import { prisma } from "@/globals/db";

export const revalidate = 30;

/**
 * FAQページのコンポーネント
 * @returns {Promise<JSX.Element>}
 */
export default async function Page() {
  // データベースからFAQページのデータを取得
  const data = await prisma.metadata.findUniqueOrThrow({
    where: { key: "faq" },
  });

  // FAQページのデータを親コンポーネントに返す
  return (
    <main>
      <h1 className="text-xl my-2">Frequently Asked Questions</h1>
      <p className="text-xs text-gray-400 my-2">以下の文章はサンプルです。</p>
      <Nl2br>{data.value}</Nl2br>
    </main>
  );
}
