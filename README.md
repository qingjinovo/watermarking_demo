# 数字水印公信平台 — 前端静态站点

这是一个纯静态前端演示站（单页应用，hash 路由）。将此仓库上传到静态托管服务（例如 Cloudflare Pages）即可直接部署，无需构建步骤。

快速预览（本地）

```bash
# 在仓库根目录运行一个静态服务器并打开 http://localhost:8080
python -m http.server 8080
# 或使用 node http-server
npx http-server .
```

部署到 Cloudflare Pages（建议）

1. 将仓库推送到 GitHub/GitLab。
2. 登录 Cloudflare Pages，选择 "Create a project" 并连接你的仓库。
3. 在设置中选择：
   - Framework preset: `None`（或留空）
   - Build command: 留空（无构建）
   - Build output directory: `/` 或 留空（确保 `index.html` 位于仓库根目录）
4. 保存并部署。

备注：本项目使用 hash 路由（如 `#home`），因此浏览器直接加载 `index.html` 即可正确路由，无需服务端重写规则。

重要文件说明

- `index.html`：单页入口，含顶栏与页面占位（`#home-page`, `#upload-page`, 等）。
- `script.js`：路由、模拟数据（`mockData`）和 UI 行为（`simulateAttestation()`、`renderInfringementMap()`、`animateStats()`）。
- `style.css`：视觉变量与组件样式（颜色变量在 `:root` 中）。
- `context.md`：视觉规范与控件说明（设计参考）。

部署注意事项

- 保持 `index.html` 与静态资源（`script.js`、`style.css`、`images/`）在仓库根或配置的输出目录中；使用相对路径引用资源（项目中已如此）。
- 如接入后端或增加构建步骤，更新 Cloudflare Pages 的 Build command 与输出目录。

如需我把上传区接入后端（示例 fetch/axios 代码）或添加 CI/自动化部署脚本，请说明后端接口细节和分支策略。
