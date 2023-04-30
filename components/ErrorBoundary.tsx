"use client";
import React, { ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };

/**
 * Reactのエラーバウンダリコンポーネント
 * @param {ReactNode} fallback - エラー発生時の代替コンポーネント
 * @param {ReactNode} children - レンダリングする子コンポーネント
 */
class ErrorBoundary extends React.Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  /**
   * ErrorBoundaryコンストラクタ
   * @param {Props} props - Propsオブジェクト
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  /**
   * エラー発生時に呼び出される静的メソッド
   * @returns {hasError: boolean} - エラー発生状態を表すオブジェクト
   */
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  /**
   * コンポーネントを描画するメソッド
   * @returns {ReactNode} - 子コンポーネントもしくは代替コンポーネント
   */
  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
