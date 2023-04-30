"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 共通レイアウトコンポーネント
 * @param children - 子要素
 * @returns {JSX.Element}
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  // 現在のパス名を取得
  const pathname = usePathname();

  return (
    <section className="mx-2 sm:mx-4">
      {/* 共通のUI（例：ヘッダーやサイドバー）をここに含める */}
      <nav className="flex gap-12 mb-4">
        {/* FAQページへのリンク */}
        <Link
          href="/help/faq"
          className={`${
            pathname === "/help/faq"
              ? "text-pink-500 font-semibold"
              : "text-gray-600 font-normal"
          } hover:text-pink-500 active:text-pink-700 text-lg transition duration-100`}
        >
          FAQ
        </Link>
        {/* 利用規約ページへのリンク */}
        <Link
          href="/help/tos"
          className={`${
            pathname === "/help/tos"
              ? "text-pink-500 font-semibold"
              : "text-gray-600 font-normal"
          } hover:text-pink-500 active:text-pink-700 text-lg transition duration-100`}
        >
          Terms
        </Link>
      </nav>
      {children}
    </section>
  );
}
