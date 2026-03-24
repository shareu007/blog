import Link from "next/link";

const featuredPosts = [
  {
    title: "博客系统架构思路",
    description: "从静态优先、缓存优先到服务拆分，规划一个可平滑扩展的个人博客。",
    tag: "Architecture"
  },
  {
    title: "高并发下的页面渲染策略",
    description: "哪些页面该静态化，哪些接口需要异步化，如何避免把数据库暴露在流量正前方。",
    tag: "Performance"
  },
  {
    title: "写作工作流与内容组织",
    description: "用 MDX 和 Git 管理文章，兼顾写作效率、版本控制和发布质量。",
    tag: "Content"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-sand text-ink">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-pine">
              Independent Writing System
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              为高性能个人博客准备的第一版项目骨架
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-black/72">
              这是一套面向内容发布、SEO 和高并发访问的博客起点。页面优先静态化，
              动态能力按需补充，方便后续继续接入搜索、评论、订阅和后台。
            </p>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-ember">
              Roadmap
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-black/75">
              <li>Phase 1: 完成首页、文章页、标签页与内容读取链路</li>
              <li>Phase 2: 接入 PostgreSQL、Redis、RSS、Sitemap</li>
              <li>Phase 3: 增加搜索、评论、统计和容器部署</li>
            </ul>
          </div>
        </div>

        <section className="grid gap-5 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.title}
              className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-pine">
                {post.tag}
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-black/72">
                {post.description}
              </p>
            </article>
          ))}
        </section>

        <div>
          <Link
            href="/blog"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-sand transition-opacity duration-200 hover:opacity-85"
          >
            进入文章列表
          </Link>
        </div>
      </section>
    </main>
  );
}
