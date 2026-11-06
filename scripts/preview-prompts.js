const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile, getAdaptationProfile } = require("./preview-style-profiles");

const promptKinds = [
  {
    key: "system",
    promptEn: "New System",
    promptZh: "新系统",
    labelEn: "New system",
    labelZh: "新系统",
    descriptionEn: "Build a new multi-page product: roles, modules, navigation, shared components, and connected workflows.",
    descriptionZh: "从零建设多页面产品，先规划角色、模块、导航与共享组件，再连通核心流程并扩展。",
    copyEn: "Copy New System",
    copyZh: "复制新系统",
  },
  {
    key: "refine",
    promptEn: "Existing Interface",
    promptZh: "已有界面优化",
    labelEn: "Existing UI",
    labelZh: "已有界面",
    descriptionEn: "Refine an existing screen or component within scope, retaining the product's working layout, tokens, and component library.",
    descriptionZh: "优化已有页面或组件，按问题局部调整，保留有效布局、项目 Token 和组件库。",
    copyEn: "Copy Existing UI",
    copyZh: "复制界面优化提示词",
  },
  {
    key: "full",
    promptEn: "Single Page",
    promptZh: "单页通用",
    labelEn: "Single page",
    labelZh: "单页通用",
    descriptionEn: "For a single page or an unspecified page type; use New System for a multi-page product.",
    descriptionZh: "适合单页或页面类型未确定的任务；多页面产品使用新系统提示词。",
    copyEn: "Copy Single Page Prompt",
    copyZh: "复制单页提示词",
  },
  {
    key: "landing",
    promptEn: "Landing Page",
    promptZh: "落地页",
    labelEn: "Landing",
    labelZh: "落地页",
    descriptionEn: "For public pages, product stories, conversion, proof, and media direction.",
    descriptionZh: "适合官网、产品页、活动页，强调首屏、转化、证明内容和媒体。",
    copyEn: "Copy Landing",
    copyZh: "复制落地页",
  },
  {
    key: "dashboard",
    promptEn: "Dashboard",
    promptZh: "仪表盘",
    labelEn: "Dashboard",
    labelZh: "数据看板",
    descriptionEn: "For metrics, charts, filters, lists, monitoring, and detail panels.",
    descriptionZh: "适合指标、图表、筛选、列表、状态监控和详情面板。",
    copyEn: "Copy Dashboard",
    copyZh: "复制看板",
  },
  {
    key: "admin",
    promptEn: "Admin Panel",
    promptZh: "管理后台",
    labelEn: "Admin",
    labelZh: "管理后台",
    descriptionEn: "For tables, forms, bulk actions, permissions, settings, and recovery flows.",
    descriptionZh: "适合表格、表单、批量操作、权限、设置和异常恢复。",
    copyEn: "Copy Admin",
    copyZh: "复制后台",
  },
  {
    key: "mobile",
    promptEn: "Mobile",
    promptZh: "移动端",
    labelEn: "Mobile",
    labelZh: "移动端",
    descriptionEn: "For mobile-first screens, touch targets, small-screen order, and responsive checks.",
    descriptionZh: "适合移动端优先、触控目标、小屏内容顺序和响应式检查。",
    copyEn: "Copy Mobile",
    copyZh: "复制移动端",
  },
];

function buildScenarioFocus(style, lang, kind) {
  const adaptation = getAdaptationProfile(style);
  const prefix = lang === "zh" ? "场景重点" : "Scenario focus";
  const lines = {
    refine: lang === "zh"
      ? [
          `已有界面优化：先查看目标和相邻实现，确认用户要求的改动及实际问题；仅有审查请求时只给建议。`,
          `保留有效的品牌、布局、组件库、Token、路由与数据约定；此风格只用于兼容的局部表达，不默认整页换肤或照搬示例参数。`,
          `按问题修正相关控件及实际支持的状态，检查共享调用点与相邻回归；局部修补不增加无关模块或系统规划步骤。`,
        ]
      : [
          `Existing interface: inspect the target and neighboring implementation, identify the requested change and actual problems; a review-only request produces recommendations.`,
          `Preserve valid branding, layout, component library, tokens, routes, and data conventions. Apply this style only where compatible; do not automatically reskin the page or copy example values.`,
          `Fix relevant controls and supported states, then check shared callers and adjacent regressions. Local work does not add unrelated modules or system-planning steps.`,
        ],
    system: lang === "zh"
      ? [
          `新系统建设：从用户角色、主要对象和核心任务规划模块、页面、导航与路由；没有旧页面不需要旧截图或问题审计。`,
          `建立共享 App Shell、语义 Token、组件和数据约定；按任务决定登录、角色差异与状态处理，不默认增加无关模块。`,
          `先做通代表性跨页面流程，再完成全部请求范围；创建、查看、编辑和返回应围绕同一对象同步状态，不能交付相互孤立的静态页面。`,
          `采用用户技术栈与有效脚手架，按需连接真实服务，明确模拟与持久化边界；界面隐藏不等于服务端授权。`,
          `系统验收：核对模块覆盖、导航与深层路由、跨页面结果、共享规则及移动端核心流程，在许可范围内检查，不以单个首屏代替系统交付。`,
        ]
      : [
          `New system: derive modules, pages, navigation, and routes from user roles, core objects, and tasks. No existing screen or old-screen audit is required for a new product.`,
          `Establish a shared App Shell, semantic tokens, components, and data conventions; add authentication, role differences, and states only where the task needs them.`,
          `Connect a representative cross-page workflow, then complete the entire requested scope. Create, view, edit, and return must share consistent object state; isolated static pages are insufficient.`,
          `Use the requested stack and valid scaffolding, connect real services as needed, and disclose simulation and persistence boundaries. Hiding UI does not enforce server-side authorization.`,
          `System acceptance: check module coverage, navigation and deep routes, cross-page results, shared conventions, and the mobile core workflow within permission. One polished first screen is not a delivered system.`,
        ],
    full: lang === "zh"
      ? [
          `页面适配：落地页可用 ${adaptation.landing}`,
          `仪表盘适配：${adaptation.dashboard}`,
          `后台适配：${adaptation.admin}`,
          `表单/数据适配：${adaptation.forms}`,
          `移动端适配：${adaptation.mobile}`,
          `不适合：${adaptation.unsuitable}`,
        ]
      : [
          `Landing adaptation: ${adaptation.landing}`,
          `Dashboard adaptation: ${adaptation.dashboard}`,
          `Admin adaptation: ${adaptation.admin}`,
          `Forms/data adaptation: ${adaptation.forms}`,
          `Mobile adaptation: ${adaptation.mobile}`,
          `Avoid for: ${adaptation.unsuitable}`,
        ],
    landing: lang === "zh"
      ? [
          `落地页重点：${adaptation.landing}`,
          `首屏必须明确品牌/产品、核心承诺、主转化动作、证明内容和媒体方向。`,
          `不要把完整页面做成通用 hero + 三张功能卡；根据产品叙事安排证据、流程、客户证明或产品视觉。`,
        ]
      : [
          `Landing page focus: ${adaptation.landing}`,
          `First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.`,
          `Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.`,
        ],
    dashboard: lang === "zh"
      ? [
          `仪表盘重点：${adaptation.dashboard}`,
          `优先呈现筛选、指标、列表/表格、详情面板、状态和下一步操作。`,
          `不要把运营页面改成营销首屏；核心对象、当前状态和主操作必须在首屏可见。`,
        ]
      : [
          `Dashboard focus: ${adaptation.dashboard}`,
          `Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.`,
          `Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.`,
        ],
    admin: lang === "zh"
      ? [
          `管理后台重点：${adaptation.admin}`,
          `强调导航、表格/表单、批量操作、权限、错误、空状态、保存和撤销反馈。`,
          `控制装饰强度，让重复操作、扫描、比较和修复路径更清楚。`,
        ]
      : [
          `Admin panel focus: ${adaptation.admin}`,
          `Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.`,
          `Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.`,
        ],
    mobile: lang === "zh"
      ? [
          `移动端重点：${adaptation.mobile}`,
          `先定义标题、当前状态、主操作、筛选、主体内容、辅助证据和二级操作的顺序。`,
          `触控目标、底部操作、折叠面板、表格替代方案和安全区域必须明确；不要硬挤桌面网格。`,
        ]
      : [
          `Mobile focus: ${adaptation.mobile}`,
          `Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.`,
          `Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.`,
        ],
  };
  return [`${prefix}:`, ...lines[kind] || lines.full];
}

function buildStylePrompt(style, lang = "en", kind = "full") {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const implementation = getImplementationProfile(style);
  const scenarioFocus = buildScenarioFocus(style, lang, kind);

  if (lang === "zh") {
    return [
      `使用 awesome-page-design ${label} - ${style.name}（${style.zhName}）作为界面设计方向。`,
      `提示词类型：${promptKinds.find((item) => item.key === kind)?.promptZh || "完整提示词"}。`,
      `风格适用场景参考：${style.zhBestFor}。`,
      `目标气质：${style.zhBrief}`,
      `任务边界：现有页面先依据实际画面判断哪些保留、哪些打磨、哪些需要重构；记录问题位置、影响、修正与复查依据。用户授权限定改动范围；仅请求审查时不直接修改，已有明确实现授权时不重复确认。`,
      `产品方向：结合真实任务与品牌限制，用几句话确定具体气质及材质依据、主要视觉内容和必要的识别细节，再落实到字体、配色、间距与控件。已选风格在其内部适配，不为套用示例更换产品或虚构功能。`,
      `视觉主次：围绕核心内容和主要操作分配对比、尺度、色彩与细节；辅助区域减少竞争。保留该风格有依据的渐变、粗字、彩色表面或材质，不统一改成中性极简。`,
      ...scenarioFocus,
      `示例布局参考：${playbook.zhName}。`,
      `示例结构参考：${playbook.zhStructure}`,
      `布局适配：先根据用户真实任务定义主要内容对象、顶层区域、主操作模型、信息密度和响应式折叠，再应用该风格。示例布局用于理解视觉语言，不能覆盖真实产品的结构。`,
      `视觉参数参考（已有项目优先现有 Token，仅在授权范围内适配）：背景 ${style.bg}；表面 ${style.surface}；正文 ${style.text}；弱化文本 ${style.muted}；主色 ${style.primary}；强调色 ${style.accent}；边框 ${style.border}；圆角 ${style.radius}；阴影/材质 ${style.shadow}。`,
      `几何参考（按项目组件与真实内容调整）：面板圆角 ${geometry.panel}；控件圆角 ${geometry.control}；标签/状态圆角 ${geometry.chip}；媒体容器圆角 ${geometry.media}。避免把所有按钮和卡片做成同一种大圆角或胶囊形。`,
      `排版规则：${playbook.zhTypography}`,
      `组件规则：${playbook.zhComponents}`,
      `按钮规则：${playbook.zhButtons}`,
      `按钮细节：${implementation.zhButtons}`,
      `提示与反馈：${implementation.zhFeedback}`,
      `间距系统：${implementation.zhSpacing}`,
      `响应式策略：${implementation.zhResponsive}`,
      `图标与媒体：${playbook.zhMedia}`,
      `视觉素材：先说明画面帮助用户理解什么，再选真实产品内容、用户资产、可编码结果或适合的生成素材。仅在有明确作用时新增图片；不默认生成、连接服务或留空占位，也不把静态演示说成已实现业务功能。`,
      `状态规则：${playbook.zhStates}`,
      `组件状态：只完善实际涉及且支持的交互、焦点、禁用、加载、空、错和成功状态；反馈与页面风格一致，不为清单新增无关状态。`,
      `动效规则：动效必须表达进入、离开、展开、加载、对象连续性、列表重排或进度变化；避免 transition: all，并提供 reduced-motion 降级。`,
      `实现验收：使用语义控件；图标按钮要有可访问名称；所有可交互元素要有 focus-visible；媒体要有稳定尺寸或 aspect-ratio；长文本要有换行、截断或 clamp；空/错/加载状态要说明下一步。`,
      `示例内容方向：可参考“${scenario.brand} / ${scenario.eyebrow}”这类具体工作流，但必须替换成用户真实产品、真实信息架构和真实文案。`,
      `设计 dials：根据用户产品设置布局变化度、动效强度和信息密度；不要默认套用示例页结构。`,
      `打磨顺序：先确定内容与结构，按问题统一处理间距、颜色、图标、文案和字体，再细调构图与组件；媒体和动效服务于已成立的页面。文案长度变化后复查排版，只执行需要的调整。`,
      `禁止事项：${playbook.zhAvoid} 不要复制示例 HTML、示例品牌、示例文案或示例布局；不要只换颜色；不要生成通用 AI 味的 hero + 三卡片页面。`,
      `交付前复查：新建任务对照请求范围、核心任务与流程验收；已有界面回看原问题、修正效果及相邻区域；检查必要控件的完整状态和相关尺寸。若仅更换产品名页面仍可通用，改善产品内容与表达。区分功能证据与视觉证据，在用户允许范围内做适量检查，缺少截图或交互证据时明确未验证，不自动全站遍历。`,
    ].join("\n");
  }

  return [
    `Use awesome-page-design ${label} - ${style.name} as the interface design direction.`,
    `Prompt type: ${promptKinds.find((item) => item.key === kind)?.promptEn || "Full Prompt"}.`,
    `Suggested applications (adapt to your product): ${style.bestFor}.`,
    `Visual mood: ${style.brief}`,
    `Scope and diagnosis: for existing pages, inspect the actual screen to decide what to preserve, polish, or restructure; connect each issue to its location, impact, correction, and review evidence. Stay within authorization; a review alone does not authorize edits, and explicit implementation approval needs no repeated confirmation.`,
    `Product direction: derive concrete character, material rationale, primary visual content, and a useful identifying detail from the real task and brand constraints; translate these decisions into type, color, spacing, and controls. Adapt within the chosen style without changing the product or inventing features.`,
    `Visual hierarchy: allocate contrast, scale, color, and detail around core content and primary actions; reduce competition from supporting areas. Preserve justified gradients, bold type, colored surfaces, and materials in this style instead of flattening every result into neutral minimalism.`,
    ...scenarioFocus,
    `Example layout: ${playbook.name}.`,
    `Example structure: ${playbook.structure}`,
    `Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling. The sample layout explains visual language and must not override the real product structure.`,
    `Visual parameter starting points (existing project tokens take priority; adapt only within scope): background ${style.bg}; surface ${style.surface}; text ${style.text}; muted ${style.muted}; primary ${style.primary}; accent ${style.accent}; border ${style.border}; radius ${style.radius}; shadow/material ${style.shadow}.`,
    `Geometry starting points (adapt to project components and real content): panel radius ${geometry.panel}; control radius ${geometry.control}; chip/state radius ${geometry.chip}; media radius ${geometry.media}. Avoid making every button and card the same large rounded rectangle or pill.`,
    `Typography: ${playbook.typography}`,
    `Components: ${playbook.components}`,
    `Buttons: ${playbook.buttons}`,
    `Button details: ${implementation.buttons}`,
    `Feedback and alerts: ${implementation.feedback}`,
    `Spacing system: ${implementation.spacing}`,
    `Responsive behavior: ${implementation.responsive}`,
    `Icons and media: ${playbook.media}`,
    `Visual assets: first identify what the visual helps users understand, then choose real product content, supplied assets, coded results, or suitable generated media. Add no image without a purpose; do not automatically generate, connect services, or ship empty slots, and do not present a static preview as functioning business logic.`,
    `States: ${playbook.states}`,
    `Component states: complete only relevant, supported interaction, focus, disabled, loading, empty, error, and success states with consistent feedback; do not invent unrelated states to satisfy a checklist.`,
    `Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.`,
    `Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.`,
    `Example content direction: you may use the specificity of "${scenario.brand} / ${scenario.eyebrow}" as inspiration, but replace it with the user's real product, real information architecture, and real copy.`,
    `Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.`,
    `Refinement order: establish content and structure, then address affected spacing, color, icons, copy, and type across the region before refining composition and components. Media and motion serve a working page. Recheck typography after copy changes and run only the necessary passes.`,
    `Do not: ${playbook.avoid} Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.`,
    `Final review: for new work, verify requested scope, core tasks, and workflows; for existing screens, revisit original issues and adjacent regressions. Check relevant control states and affected sizes. If changing only the product name makes the page fit any product, improve its specific content and expression. Separate functional from visual evidence, check proportionately within permission, disclose missing screenshot or interaction evidence, and do not automatically traverse the whole site.`,
  ].join("\n");
}

module.exports = { promptKinds, buildStylePrompt };
