/**
 * 改行をbr要素に変換するコンポーネント
 * @param children - 改行を含む文字列
 * @returns br要素に変換された文字列
 */
const Nl2br = ({ children }: { children: string }) => (
  <>
    {children
      .split(/(\n)/g)
      .map((t, index) => (t === "\n" ? <br key={index} /> : t))}
  </>
);

export default Nl2br;
