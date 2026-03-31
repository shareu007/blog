# 部署说明

## 推荐方式

当前项目最适合两种部署方式：

1. Vercel
2. Docker + 云服务器

对于当前阶段，推荐先使用 Vercel 快速上线；如果后面要加入数据库、缓存、评论和后台，再迁移到 Docker 或 Kubernetes。

## 方式一：Vercel

### 适用场景

- 想尽快上线
- 主要内容是静态页面和少量服务端逻辑
- 需要较好的全球 CDN 和较低运维成本

### 配置步骤

1. 将仓库连接到 Vercel
2. 设置框架为 Next.js
3. 配置环境变量
4. 将生产域名绑定到站点

### 建议环境变量

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

如果后面接入数据库和 Redis，还需要：

- `DATABASE_URL`
- `REDIS_URL`

## 方式二：Docker

### 适用场景

- 希望完全掌控部署环境
- 后续要接入 PostgreSQL、Redis、对象存储
- 需要更灵活的扩缩容和反向代理配置

### 基本流程

1. 在构建机执行 `npm install`
2. 执行 `npm run build`
3. 用生产模式启动 `npm run start`
4. 通过 Nginx 或云负载均衡暴露服务

### 推荐生产拓扑

- Nginx
- Next.js 应用实例
- PostgreSQL
- Redis
- CDN

## GitHub Actions 自动化

仓库已提供 CI 工作流：

- 对 `push` 和 `pull_request` 自动执行类型检查与构建
- 当推送到 `main` 且配置好 Vercel secrets 时，自动执行生产部署

## Vercel Secrets

如果要启用自动部署，需要在 GitHub 仓库 Secrets 中配置：

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 发布前检查清单

- 已设置正确的 `NEXT_PUBLIC_SITE_URL`
- `npm run typecheck` 通过
- `npm run build` 通过
- GitHub Actions CI 通过
- 域名和 HTTPS 已配置完成

