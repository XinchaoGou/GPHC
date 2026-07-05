import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "German Pharmacy Health Companion",
  description: "面向中文用户的德国药房式健康知识与补剂决策辅助平台。"
};

const navItems = [
  { href: "/topics", label: "健康主题" },
  { href: "/ingredients", label: "成分" },
  { href: "/products", label: "产品" },
  { href: "/brands", label: "品牌" }
];

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="site-header">
          <nav className="nav" aria-label="主导航">
            <Link className="brand-mark" href="/">
              German Pharmacy Health Companion
            </Link>
            <div className="nav-links">
              {navItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
        <footer className="footer">
          本平台提供健康教育与决策辅助信息，不提供医疗诊断，不替代医生、药师或营养师建议。
        </footer>
      </body>
    </html>
  );
}
