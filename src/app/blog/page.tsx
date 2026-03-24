import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Article archive for Shareu Blog."
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-screen bg-sand px-6 py-16 text-ink md:px-10 lg:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-pine">
            Blog Archive
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            文章列表
          </h1>
          <p className="text-lg leading-8 text-black/70">
            当前内容基于本地 MDX 文件生成，后续可继续扩展标签页、归档页和搜索。
          </p>
        </header>

        <section className="grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-pine">
                <span>{post.publishedAt}</span>
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-black/72">
                {post.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
