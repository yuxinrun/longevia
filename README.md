# longevia

LONGEVIA — 科学抗衰与健康长寿知识平台。Next.js 14 App Router，纯静态站点，所有个人数据默认保存在浏览器本地。

## 本地开发

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

## GitHub Pages 自动部署

推送到 `main` 或手动运行 workflow，会触发 `.github/workflows/deploy-pages.yml`：安装依赖、生成静态导出 `out/`，再通过 `actions/deploy-pages` 发布。

- 默认部署到 `https://<owner>.github.io/<repo>/`。workflow 会自动推导 `NEXT_PUBLIC_SITE_URL` 与 `NEXT_PUBLIC_BASE_PATH`，保证 `basePath`、`canonical`、`sitemap.xml` 与图片路径都指向正确位置。
- 使用自定义域名时，在仓库 **Settings → Secrets and variables → Actions → Variables** 添加 `PUBLIC_SITE_URL`（如 `https://longevia.org`），并在域名 DNS 添加指向 `<owner>.github.io` 的 `CNAME` 记录。workflow 会生成 `CNAME` 文件并改为根路径部署。
- 首次部署后请确认 **Settings → Pages → Build and deployment → Source** 为 **GitHub Actions**。

`GITHUB_PAGES=true` 时 `next.config.mjs` 启用 `output: 'export'` 与 `images.unoptimized`；本地构建不受影响。
