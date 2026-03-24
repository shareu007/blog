import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function normalizePost(
  slug: string,
  data: Record<string, unknown>,
  content: string
): Post {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    publishedAt:
      typeof data.publishedAt === "string" ? data.publishedAt : "1970-01-01",
    tags: Array.isArray(data.tags) ? data.tags : [],
    content
  };
}

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data, content } = matter(source);
      return normalizePost(slug, data, content);
    })
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .map(({ content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return normalizePost(slug, data, content);
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPostsMeta().flatMap((post) => post.tags))
  ).sort((left, right) => left.localeCompare(right));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.tags.includes(tag));
}
