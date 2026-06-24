# AGENTS.md — Ray3417.github.io

## 项目概览

个人主页网站，部署在 GitHub Pages（`https://ray3417.github.io`）。  
采用**书本翻页交互**：无滚动条，全部导航通过 3D 翻页完成。

## 核心架构

- **单入口文件**：`index.html`（~1680 行）— 所有内容都在这里
- **CSS 分两部分**：Tailwind 工具类来自 `assets/css/style.css`；组件/页面样式内联在 `<style>` 中
- **翻页系统**：原生 JS `Book` 类（第 1538 行），基于 CSS 3D 变换（`perspective`、`rotateY`、`z-index` 堆叠）
- **4 页**：0=扉页（封面）、1=关于、2=成果（含"论文子页"LRDNet/PGT）、3=寄信（封底）
- **翻页触发**：导航链接、页面右下折角（`page-corner`）、返回标签（`page-back-tab`）、火漆印、Logo
- **子页机制**：论文详情是 Page 2 内部的子视图（`.pub-subpage`），通过 `data-paper` / `data-action="back-to-list"` 切换显示隐藏，不占用独立页码、不参与翻页流程

## 常用命令

| 命令 | 作用 |
|------|------|
| `npm run build:css` | 构建 Tailwind：`src/input.css` → `assets/css/style.css`（压缩） |
| `npm run watch:css` | Tailwind 监听模式 |
| `npm run build` | `build:css` 别名 |
| `npm run build` | `build:css` 别名 |

## 设计系统

CSS 变量定义在 `src/input.css` 中（内联 `<style>` 中通过 `var(--ink)`、`var(--paper)` 等引用）：

- **字体**：`Noto Serif SC`（中文正文）、`EB Garamond`（英文装饰）、`Caveat`（手写）
- **配色**：米白纸 `#FDF8F0`、墨色 `#2B2118`、晴空蓝 `#0060e0`（强调色）、暖棕 `#b8772e`（辅助色）、印泥红 `#B8453A`
- **纹理**：`body::before` 叠加 SVG 分形噪点（纸张颗粒感）
- **风格**：手工装订笔记本/信笺 — 火漆印（`sealing-wax.webp`）、金属装订环（`page-ring`）、角标、邮戳、墨水线

## 依赖（dev）

- `tailwindcss@^3.4.17`

## 注意事项

- **视口锁定**：`html, body { overflow: hidden; height: 100vh }` — 完全不能滚动
- **z-index 动态管理**：`Book` 类的 `init()` 和 `flipTo()` 方法实时调整每页的层叠顺序
- **CSS 变量必须存在**：虽然定义在 `src/input.css`，但被 `index.html` 内联 `<style>` 中大量 `var()` 引用 — 构建后 `assets/css/style.css` 必须包含这些变量才能正确渲染
- **`assets/css/style.css` 纳入版本控制**（未 gitignore）— 修改 `tailwind.config.js` 或 `src/input.css` 后务必 `npm run build:css`
- **`.venv/`** 目录与网站无关，忽略即可
- 所有参考图片均为 9:20 竖屏壁纸（1080×2400）— 全屏拉伸是故意的
