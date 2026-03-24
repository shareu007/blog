import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag
  }));
}

export async function generateMetadata({
  params
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `Tag: ${tag}`,
    description: `Articles tagged with ${tag}.`
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sand px-6 py-16 text-ink md:px-10 lg:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-pine">
            Tag Archive
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            {tag}
          </h1>
          <p className="text-lg leading-8 text-black/70">
            该标签下当前共有 {posts.length} 篇文章。
          </p>
        </header>

        <section className="grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-pine">
                {post.publishedAt}
              </p>
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
