# MotionSites 借鉴记录 — 2026-11-12

## 来源
用户提供的 `MotionSites.zip`（`~/workspace/user/files/MotionSites.zip`），328 条提示词：
114 条免费 / 214 条付费会员内容；284 hero / 43 landing；React + Vite + Tailwind + Framer Motion 代码级提示词；
设计语言集中在液态玻璃、衬线大标题、渐变、滚动视差、跑马灯；高频字体 Inter、Instrument Serif、Manrope、Barlow、Anton；
高频色：近黑 #000/#1a1a1a/#111/#0a0a0a、深绿 #08150c、亮黄 #ffda00。

## 原则（用户定）
模仿，不是照抄。不贴 MotionSites 的提示词正文，不复现 Nike、Duolingo 等真实品牌页；
吸收的是：设计语言、配色与字体搭配、复现模板的写法。

## 复现模板好在哪（已拆解）
- 结构固定：技术栈 → 字体（角色 + 字重 + CSS 变量）→ 颜色（精确 token，HSL/HEX）→ 布局 → 按区逐节写规格（导航/Hero/页脚，各带精确尺寸、字号、行高、字距）→ 组件效果（CSS 原文，如 .liquid-glass）→ 动效（keyframes + 逐级延迟）→ 响应式规则 → 禁止项。
- 提示词中位约 6900 字，远比我们的风格提示词具体。
- 我们的提示词生成器（`scripts/preview-prompts.js`）其实已经输出精确 token、几何、排版、间距和通用动效章节；
  所以“模板升级”不需要改生成器，关键是把 catalog 字段写得更具体：字体角色写明系统字体栈、
  间距写死数字、动效写明入场方式与延迟、响应式写明断点行为。27 号就是按这个标准写的。

## 新增风格（27–32）
| 号 | 风格 | 场景品牌 | 关键 token |
|----|------|----------|------------|
| 27 | Dark Editorial 暗夜编辑 | 夜航（深夜文化刊物） | #0a0a0a + 衬线大标题 + 香槟金 #c9a96a |
| 28 | Mesh Gradient 流光渐变 | 虹光（渐变实验室） | 彩虹光斑 mesh、柔和色块晕染 |
| 29 | SaaS Dark 深色 SaaS | 数核（数据分析平台） | #0a0a0a + 靛蓝 #6366f1 |
| 30 | Fintech 金融科技 | 青禾（数字银行） | 深绿 #08150c + 亮黄 #ffda00 |
| 31 | Travel Editorial 旅行编辑 | 远行（旅行杂志） | 暖纸 #faf7f2 + 焦橙 #c2410c |
| 32 | Gamified Flat 游戏化扁平 | 跃学（语言学习） | 粗边框 + 大胆扁平色 + #ffda00 |

## 接入方式
- `scripts/preview-pages/redesign/index.js` 的上限已从 26 改到 32；新风格按 catalog + zh 文档 + `styleXX.js/css` + 图片 + `npm run docs` + fixture 再生成 + previews 的流程接上。
- 关键教训：页面数据不要放在模块顶层 `const` 里——生成器只把 `init.toString()` 串进浏览器，顶层变量在浏览器里不存在。
  做法是像 26 号那样，把数据以 `<script type="application/json" data-sXX-data>` 嵌进 HTML，init 里 `JSON.parse` 读出来。27 号最初就是这么翻车的（文章列表空白），已修复。

## 状态
- 27 已完成：catalog + 中文文档 + 页面 + 图片 + docs + fixture + 截图，`npm test` 99/0，`npm run validate` 2095 项全过。
- 28–32 全部完成（2026-11-12）：28 流光渐变 虹光（预设切换 + 色标复制 + CSS 导出）、29 深色 SaaS 数核（看板切换 + 试用表单）、30 金融科技 青禾（账户切换 + 开户表单）、31 旅行编辑 远行（路线收藏 + 行程单表单）、32 游戏化扁平 跃学（可玩的关卡进度 + 排行榜）。各有 catalog + 中文文档 + 页面 + 1 张生成图 + docs + fixture；`npm test` 104/0。29–32 的截图待补：全量 previews 后台任务启动时 29–32 还不存在，待它结束后再跑 `PREVIEW_STYLE=29,30,31,32` 补。
- 批量 23 个全部完成并核验（C1、C2、A、B 四组），全量截图生成中，之后统一跑测试 + validate 再向用户汇报。
