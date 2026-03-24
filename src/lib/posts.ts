import fs from "node:fs";
import path from "node:path";

type FrontmatterValue = string | string[];

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

function parseFrontmatter(source: string): {
  data: Record<string, FrontmatterValue>;
  content: string;
} {
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  if (lines[0] !== "---") {
    return { data: {}, content: source.trim() };
  }

  const data: Record<string, FrontmatterValue> = {};
  let index = 1;

  while (index < lines.length) {
    const line = lines[index];

    if (line === "---") {
      index += 1;
      break;
    }

    if (line.startsWith("  - ")) {
      index += 1;
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      index += 1;
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (rawValue.length > 0) {
      data[key] = rawValue.replace(/^"(.*)"$/, "$1");
      index += 1;
      continue;
    }

    const items: string[] = [];
    index += 1;

    while (index < lines.length && lines[index].startsWith("  - ")) {
      items.push(lines[index].replace("  - ", "").trim());
      index += 1;
    }

    data[key] = items;
  }

  return {
    data,
    content: lines.slice(index).join("\n").trim()
  };
}

function normalizePost(
  slug: string,
  data: Record<string, FrontmatterValue>,
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
      const { data, content } = parseFrontmatter(source);
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
  const { data, content } = parseFrontmatter(source);

  return normalizePost(slug, data, content);
}

export function renderPostContent(content: string): string[] {
  return content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPostsMeta().flatMap((post) => post.tags))
  ).sort((left, right) => left.localeCompare(right));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.tags.includes(tag));
}
