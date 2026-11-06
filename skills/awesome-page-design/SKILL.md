---
name: awesome-page-design
description: >-
  从零设计和实现网站、Web App 与多页面系统的前端 UI，或改进已有页面和组件：
  规划任务、模块与导航，建立视觉方向和共享组件，诊断与打磨界面。适用于新系统建设、页面设计、UI 优化和实现审查；
  处理现有项目时保留项目的设计系统。
---

# Awesome Page Design

将本库用作视觉方向参考和 UI 工作流程。围绕用户的产品设计，不要照搬附带的预览页面。

整页设计应建立可落实的产品方向：任务与品牌边界、具体气质及其依据、主要视觉内容和必要的识别细节，再将风格映射到布局、字体、材质与控件。现有页面先根据实际问题决定保留、打磨或重构，在授权范围内推进；完成后对照最初的问题复查。具体方法见[使用原则](references/usage-principles.md)与[工作流程](references/workflow.md)。局部修改无需额外编写方向说明。

先区分任务：从零建设系统走[新系统路径](references/new-system-design.md)，以角色、模块、页面关系和核心流程起步；新增单页按任务与布局设计；改造已有系统从当前实现和问题起步。没有旧界面不影响新建任务，示例页面不能代替多页面系统的规划与实现。

## 决策优先级

发生冲突时，按以下顺序取舍：**用户范围与产品需求 → 易用性、无障碍与语义 → 项目组件与设计 Token → 最接近且兼容的生产模式 → 视觉风格 → 附带示例**。以最小且兼容的改动修复旧实现中的无障碍问题；旧模式不能凌驾于无障碍要求之上。

## 从任务出发

先判断修改规模。仅调整已有区域的文案、颜色、字号、间距、边框或对齐，且不改变交互、组件 API 或共享行为时，使用以下简短路径：

1. 查看目标和相邻区域的最新源码，沿用当前组件与 Token。
2. 在用户指定范围内修改，保留语义、可见标签、键盘焦点和原有操作。
3. 检查 diff、文字适配与相邻布局；在允许范围内查看受影响的界面。分别说明功能检查与视觉检查的结果，缺少证据时标为未验证。
4. 简述改动、检查结果和未验证项；关闭自己启动的临时服务并清理本次临时文件。

该路径无需默认加载其他参考。发现布局依赖、共享组件影响或交互行为变化时，转入下面的对应路径。

其他任务阅读[工作流程](references/workflow.md)，再按下表补充参考。整页实现、新增或修改交互时，还需阅读“实现审查或交互实现”一行；不要加载无关参考：

| 任务 | 最少需要阅读的参考 |
|---|---|
| 从零建设网站、Web App 或多页面系统 | [新系统建设](references/new-system-design.md)；按需补充布局、视觉方向和相关交互契约，先连通核心流程再扩展全部请求模块 |
| 新增单页或明确要求的页面重设计 | [布局指南](references/layout-guidance.md)、[使用原则](references/usage-principles.md)、[风格索引](references/style-index.md)；选定方向后，阅读[设计调节项](references/design-dials.md)，以及选中风格的说明，不读取其他风格说明 |
| 现有项目中的功能或 UI 修改 | [现有项目集成](references/existing-project-integration.md) |
| 存在布局依赖的局部 UI 修补 | [局部 UI 修补](references/local-ui-patch.md)；需要追踪共享组件时，补充阅读集成指南 |
| 组件打磨 | [组件实现](references/component-implementation.md) |
| 视觉审查 | [质量检查清单](references/quality-checklist.md)；发现模板化问题时，用[问题与修正方向](references/anti-generic-ui.md)定位原因，而非机械删除风格特征 |
| 实现审查或交互实现 | [界面实现规范](references/interface-compliance.md)和[UI 基础控件契约](references/ui-primitive-contract.md) |
| 可复用的项目设计指南 | [设计系统输出](references/design-system-output.md) |

新网站或应用还需阅读[新项目基础配置](references/new-project-shell.md)，处理元数据、favicon 和脚手架默认品牌的清理。现有页面和局部修补默认沿用当前方向；除非任务要求重置视觉，不要让它们重新经过风格选择。

## 按条件补充的参考

新增或改变组件状态、交互行为时，阅读[组件实现](references/component-implementation.md)，再只读取对应的专项契约。仅调整外观且不改变行为时，不需要重新加载已有交互的全部规则：

- Select、Dropdown、Combobox：[选择控件契约](references/patterns/select-and-combobox.md)。
- Modal、Drawer、Confirmation：[浮层与确认契约](references/patterns/modal-drawer-and-confirmation.md)。
- Toast、Alert、结果反馈：[反馈契约](references/patterns/toast-alert-and-feedback.md)。
- Table、排序、选择、分页：[数据表格与分页契约](references/patterns/data-table-and-pagination.md)。

新增或改变动效方案时补充[动效指南](references/motion-guidance.md)，新增或改变图标方案时补充[图标指南](references/icon-guidance.md)，用户要求相邻气质或子风格时补充[风格变体指南](references/variant-guidance.md)。不要加载全部风格或组件参考。
