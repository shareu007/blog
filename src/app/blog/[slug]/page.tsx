import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostsMeta, getPostBySlug, renderPostContent } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: post.title,
    description: post.description
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = renderPostContent(post.content);

  return (
    <main className="min-h-screen bg-sand px-6 py-16 text-ink md:px-10 lg:py-24">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-[2rem] border border-black/10 bg-white px-6 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:px-10">
        <header className="space-y-4 border-b border-black/10 pb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-pine">
            {post.publishedAt}
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="text-lg leading-8 text-black/70">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}` as Route}
                className="rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-[0.18em] text-pine"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        <section className="space-y-6 text-lg leading-9 text-black/80">
          {blocks.map((block) =>
            block.startsWith("# ") ? (
              <h2 key={block} className="text-3xl font-semibold leading-tight">
                {block.replace(/^# /, "")}
              </h2>
            ) : (
              <p key={block}>{block}</p>
            )
          )}
        </section>
      </article>
    </main>
  );
}
