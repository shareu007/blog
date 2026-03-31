# Shareu Blog

一个基于 Next.js 15、TypeScript 和 MDX 的个人博客项目，当前采用本地 MDX 文件作为文章内容源，重点关注性能、可维护性和后续扩展能力。

## 当前能力

- 首页、文章列表页、文章详情页
- 标签归档页
- 基于 MDX 的文章渲染
- `robots.txt`、`sitemap.xml`、`rss.xml`
- 适合作为个人博客的静态优先架构

## 技术栈

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- MDX

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量样例：

```bash
cp .env.example .env.local
```

### 3. 启动开发环境

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## 内容管理

文章目前存储在 [src/content/posts](/Users/shareu/Workspace/project-two/src/content/posts)。

每篇文章都是一个 `.mdx` 文件，包含：

- frontmatter：标题、描述、发布时间、标签
- 正文：MDX 内容

示例文章：

- [hello-world.mdx](/Users/shareu/Workspace/project-two/src/content/posts/hello-world.mdx)
- [rendering-with-mdx.mdx](/Users/shareu/Workspace/project-two/src/content/posts/rendering-with-mdx.mdx)

## 环境变量

见 [.env.example](/Users/shareu/Workspace/project-two/.env.example)。

## 部署

部署说明见：

- [docs/deployment.md](/Users/shareu/Workspace/project-two/docs/deployment.md)

## GitHub Actions

仓库已提供基础工作流：

- Push / PR 自动执行 `typecheck` 和 `build`
- 当 `main` 分支推送且配置好 Vercel secrets 时，可自动部署

工作流文件：

- [.github/workflows/ci.yml](/Users/shareu/Workspace/project-two/.github/workflows/ci.yml)

