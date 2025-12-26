# Copilot 使用说明（项目专用）

短述：这是一个纯静态的前端演示站点（单页应用，hash 路由），核心文件位于仓库根目录：`index.html`、`script.js`、`style.css`，视觉规范在 `context.md`。

关键点（马上可用）
- **运行方式**：无需构建，直接在浏览器打开 `index.html` 或使用静态服务器（例如 `python -m http.server 8080` 或 `npx http-server .`）。
- **页面路由约定**：导航使用 hash（如 `#home`）。对应的节 ID 为 `{hash}-page`（例如 `#home` 对应 `id="home-page"`）。修改页面时请保持该命名规则，路由逻辑在 `script.js` 的 `handleRouting()` 中。
- **DOM 与 ID 约定**：若添加功能请参考已有 ID：`upload-zone`（上传区）、`modal-container`（模态容器）、`infringement-map`（侵权地图）、`.stat-number`（数据卡数字）。`script.js` 使用这些 ID/类选择器来绑定行为。
- **数据与模拟**：项目使用 `mockData`（`script.js` 顶部）作为演示数据。真实集成时需替换或移除模拟流程，注意相关函数：`simulateAttestation()`、`renderInfringementMap()`、`animateStats()`。
- **样式与主题**：颜色变量在 `style.css` 的 `:root` 中定义（`--primary-blue`, `--accent-gold`, `--success-green`）。视觉细节见 `context.md`，修改变量即可快速调整配色。
- **无后端假设**：当前代码没有网络请求或后端依赖；若要接入后端，请在 `script.js` 中替换模拟步骤并添加 fetch/axios 请求，保持 UI 回退（loading / error）一致。

常见修改点与示例
- 增加新页面：创建新的 `<section id="<name>-page" class="page">` 节点，并在导航中使用 `href="#<name>"`。路由会自动按规则切换。
- 上传区接入后端：`setupUploadPage()` 目前通过 `simulateFileUpload()` 模拟，实际接入请在该函数内上传文件并调用后端接口，完成后触发 `simulateAttestation()` 的成功流程或替换为真实处理函数。
- 更新统计数字：在 DOM 中为数字元素保留 `class="stat-number"`，后端数据到位后将其 `textContent` 设置为整数，页面会调用 `animateCounter()` 做动画效果。

调试建议
- 控制台优先级：hash 路由与 DOM 查找错误常见于未对应的 ID/链接；检查控制台报错并确认 `handleRouting()` 计算出的 `pageId`（`hash.substring(1) + '-page'`）在 DOM 中存在。
- 动画/延时问题：许多演示流程依赖 `setTimeout` 和 `requestAnimationFrame`，在调试时可临时注释时间延迟以加速测试。
- 地图点位坐标：侵权点使用内联百分比（`x`, `y` 字段），新增点请按 `mockData.infringements` 格式添加。

项目约定与限制（重要）
- 单页、客户端渲染：避免在服务端寻找路由或模板。所有视图切换由 `script.js` 管理。
- 命名与最小 DOM 约定：修改脚本时不要随意改动核心 ID 与类，除非同时更新相应绑定代码。
- 交互可访问性：项目当前为演示，若做生产升级请补充键盘导航与 ARIA 标签。

提交与复审
- 提交前在本地用静态服务器运行并在浏览器检验：

```bash
python -m http.server 8080
# 或
npx http-server .
```

- 变更说明需在 PR 描述中包含：修改的页面（例如 `upload-page`）、所改函数（例如 `simulateAttestation` → `realAttestation`）以及是否移除 `mockData`。

如果需要我将 `.github/copilot-instructions.md` 中的某一部分扩展为代码示例（比如“如何把上传区接入后端”），请告诉我需要的具体接口形态或后端约定。
