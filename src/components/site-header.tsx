import Link from "next/link";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-sand/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="text-sm uppercase tracking-[0.3em] text-pine">
          Shareu Blog
        </Link>

        <nav className="flex items-center gap-5 text-sm text-black/70">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-opacity duration-200 hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
