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

- 默认按项目站点部署在 `/longevia` 子路径，对外通过自定义域 `https://www.yuxin.run/longevia/` 访问。workflow 自动推导 `NEXT_PUBLIC_BASE_PATH`，`basePath`、`canonical`、`sitemap.xml`、静态资源与图片路径都会带上子路径。
- 需要改变对外站点地址时，在 **Settings → Secrets and variables → Actions → Variables** 设置 `PUBLIC_SITE_URL` 为完整站点根 URL：
  - 项目站点自己的根级自定义域，如 `https://longevia.org`：DNS 添加指向 `<owner>.github.io` 的 `CNAME`，workflow 会生成 `CNAME` 文件并去掉子路径。
  - 用户站点自定义域下的子路径，如 `https://www.yuxin.run/longevia`：保留子路径，不写 `CNAME`。
- 首次部署后请确认 **Settings → Pages → Build and deployment → Source** 为 **GitHub Actions**。

`GITHUB_PAGES=true` 时 `next.config.mjs` 启用 `output: 'export'` 与 `images.unoptimized`；本地构建不受影响。
