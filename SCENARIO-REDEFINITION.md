# Scenario redefinition — all 26 styles

Decision 2026-11-12: redefine all 26 scenarios + copy together. Style IDs, names, visual tokens and `bestFor` stay the same. Only the example product, user, task and copy change.

Principles used for every style below:
- Same `scene`, same interaction shape, same counts (nav 3, metrics 3, features 3, queue 3) — so the existing page JS can be rewritten 1:1 without changing the layout or the Skill's prompts structure.
- A believable product with a real user, a real task and stakes — no cute tiny-shop pun names, no “本地模拟” as the headline idea.
- Fictional brands only; no real institutions, no real people, no claimed real metrics. Demo data is labelled as demo inside the page, not in the headline.
- Where Jams's background fits (enterprise backend, RAG/AI Agent, MES/manufacturing, e-commerce, logistics), the scenario leans that way. Where it doesn't (cinema, tea, ceramics…), the scenario is upgraded to a credible cultural/commercial product instead of forcing enterprise onto it.

Status: **Applied 2026-11-12** — all 26 scenarios are now in `catalog/styles.json` (only `scenario` changed per style, verified) and `catalog/style-docs.zh.json`. `npm run docs` resynced README + 26 style manuals + index. Prompt-hash fixture `scripts/fixtures/preview-output-sha256.json` was regenerated (prompts embed scenario, so hashes change by design) and `npm test` passes 98/98. `npm run validate` still fails 365 checks — expected: on-disk preview HTML/PNG/manifest still embed the old prompts and old pages. That clears only after the page JS/CSS rewrite + full `npm run previews`.

---

## 01 Card Grid — 衡工设备台账
- Old: 栖物仓，共享物资工作台，16 件物资
- New brand: **衡工设备台账** | User: 工厂设备工程师 | Task: 管 1,284 台设备，借用、检修、报修
- Eyebrow: Plant equipment operations | Headline: 设备台账
- Lede: 一家制造企业的设备台账。工程师在这里登记设备、查库位与保管人、跟进借用与检修，表格就是工作本身。
- Nav: 设备台账 / 借用跟进 / 检修计划 | Primary: 登记设备 | Secondary: 查看流转记录
- Metrics: 1,284 在册设备 / 96 借用中 / 12 逾期检修
- Queue: 数控加工中心-03：借用中 / 无线投屏器：归还跟进 / 桌面支架组：待检修
- Features: 侧栏管视图，主面板管设备；检索、筛选、行内处理围绕同一份台账；双列表单登记，窄屏收为单列
- Page change: table rows become equipment (name, spec, workshop, keeper, status, last check); keep 8 rows/page, filters, pagination, dialog.

## 02 Block Brutalism — 边界设计周
- Old: 越界创意市集，2026.11.14–15
- New brand: **边界设计周** | User: 独立设计师 / 观众 | Task: 两天设计节，选场次、领免费票
- Eyebrow: Independent design week · 2026.11.14–15 | Headline: Bring good ideas / out onto the street.
- Lede: 两天的独立设计节：插画出版、手作、现场音乐。海报就是门票，先选场次，再领票。
- Nav: Explore / Two-day program / Free tickets | Primary: Reserve a free ticket | Secondary: Browse the program
- Metrics: 14–15 November 2026 / 02 days / FREE digital ticket
- Queue: 插画与出版：Browse / 独立手作：Discover / 现场音乐：Listen
- Features: 黄色海报 + 黑框 + 硬阴影是视觉；场次、票种、场地信息一次说清；领票流程不绕
- Page change: poster art becomes a real festival poster (SVG illustration, not CSS blocks); keep stall/program grid.

## 03 Aurora Gradient — 北冕天文台
- Old: 夜航天象台，本地模拟秋夜星空
- New brand: **北冕天文台** | User: 天文台开放夜的访客 | Task: 选 5 个观测目标，调时间，做个人观测单
- Eyebrow: Observatory open night | Headline: Tonight, set out for the stars.
- Lede: 天文台开放夜的观测规划。选目标、调时段、看高度角，做一张今晚的观测单；星图为演示星历，非实时数据。
- Nav: Sky atlas / Observation list / Export list | Primary: Add to tonight's list | Secondary: Export observation list
- Metrics: 05 celestial objects / 20–00 simulated hours / 31° N sample latitude
- Queue: Select an object：Explore / Choose a time：Adjust / Export your list：Download
- Features: 点一颗星，读方向、高度角与星等；调时间，看星空变化；本地保存观测单，可下载
- Page change: keep SVG star atlas + hour slider; add a real aurora/star-field visual layer, not dots on gradient.

## 04 Retro Y2K — 瞬时照相馆
- Old: 闪拍照相亭，糖果粉 Y2K
- New brand: **瞬时照相馆** | User: 毕业生 / 生日派对客人 | Task: 拍四格照片条，选框、贴纸，导出打印
- Eyebrow: Instant photo studio | Headline: Today, step into the spotlight.
- Lede: 一家即时照相馆的线上拍照亭。选四格、调边框、贴贴纸，导出可打印的照片条。
- Nav: Photo strip / Frames / Export | Primary: Export my photo strip | Secondary: Change frame
- Metrics: 04 photo frames / 03 frame colors / SVG embedded export
- Queue: Local photos：Choose / Frame and sticker：Customize / Embedded SVG：Download
- Features: 四格照片条是中心；边框与贴纸实时可见；导出为可打印的 SVG
- Page change: keep 4-frame strip + stickers; add real photo placeholders with gloss/texture, not pastel boxes.

## 05 Swiss Editorial — 城市印刷档案馆
- Old: 街字档案，街头招牌
- New brand: **城市印刷档案馆** | User: 设计研究者 / 策展人 | Task: 按年代、材质检索 008 件藏品，建个人选集
- Eyebrow: A city archive of printed letters | Headline: Letters on the street, time within them.
- Lede: 一座城市印刷档案馆的数字藏品库。按年代与材质检索招牌、票据与海报，建一份个人选集并导出。
- Nav: Object index / My collection / Export collection | Primary: Collect this sign | Secondary: Filter by material
- Metrics: 008 archive objects / 1978–2012 sample years / 04 materials
- Queue: Street sign objects：Browse / Materials and decades：Filter / Personal selection：Export
- Features: 编目号 + 细线 + 红黑层级是全部秩序；不对称图片索引；选集可导出
- Page change: keep accession grid; add real archival image plates (SVG plates with type specimens).

## 06 Terminal Hacker — 生产链路巡检台
- Old: 链路巡检台，12 条预设路径，本地模拟
- New brand: **巡检台** | User: 值班工程师 | Task: 发版前检查 48 个服务的链路健康，定位坏链
- Eyebrow: Production link health, before you ship | Headline: Do not send users down a broken link.
- Lede: 发版前的链路巡检。跑 12 条预设路径，按响应分类定位问题，生成一份可复制的巡检报告；演示不联网。
- Nav: Console / Response ledger / Download report | Primary: Run inspection | Secondary: Download report
- Metrics: 12 preset paths / 03 response categories / OFF network access
- Queue: Preset response run：Start / stop / Problematic paths：Inspect / Simulation report：Copy / download
- Features: 等宽字体 + 严重程度色；可操作的响应行；可停止的本地运行
- Page change: keep terminal console + ledger; densify log, make severity scannable.

## 07 Cute-alism — 绿洲养护
- Old: 芽芽阳台，3 株绿植
- New brand: **绿洲养护** | User: 办公室行政 / 居家养护者 | Task: 管 3 个区域的绿植，浇水、记录、提醒
- Eyebrow: Office plant care, kept simple | Headline: A little care, a little more green.
- Lede: 一家办公室绿植养护服务的养护板。三个区域、浇水提醒与养护笔记，让绿植别死在角落里。
- Nav: My plants / Care notes / Add a plant | Primary: Add a plant | Secondary: View care notes
- Metrics: 3 green roommates / 2 plants to check / 0 / 3 cared for today
- Queue: 龟背竹：Check today / 琴叶榕：Check today / 薄荷：Growing quietly
- Features: 圆角 + 柔和色 + 大按钮；养护状态一眼可见；加一株植物不超过两步
- Page change: keep plant cards + check-ins; add a small illustration system, not emoji-like shapes.

## 08 Resonant Stark — 光隙摄影展
- Old: 留白，建筑影像研究
- New brand: **光隙摄影展** | User: 摄影师 / 画廊访客 | Task: 看 4 组摄影习作，问价、预约看展
- Eyebrow: A solo photography exhibition | Headline: Where light passes through.
- Lede: 一位摄影师的个展。4 组习作、极简排版，选一张问价或预约看展。
- Nav: Selected studies / Contact sheet / Print enquiry | Primary: Prepare a print enquiry | Secondary: View contact sheet
- Metrics: 04 studies / 2025–26 archive / 4:3 frame ratio
- Queue: 潮汐走廊：Selected / 午后阴影：Study 02 / 空庭：Study 04
- Features: 近黑画布 + 细字 + 极大留白；一张图就是全部；问价流程克制
- Page change: keep stark layout; add one strong photographic hero (SVG plate with light/shadow study).

## 09 Tech Minimal — 印刻工坊
- Old: 一张印务，独立展览海报
- New brand: **印刻工坊** | User: 独立出版人 | Task: 为一本诗集印 100 册，定尺寸、纸张、专色，算价
- Eyebrow: Print for independent publishers | Headline: Start with one sheet.
- Lede: 一家服务独立出版的印务工坊。定尺寸、纸张与专色，实时算价，生成一份可下载的需求单；不下单、不支付。
- Nav: Print specification / Paper proof / Job summary | Primary: Review print specification | Secondary: Inspect bleed proof
- Metrics: 100 sheets / 2 spot inks / 3–5 reference working days
- Queue: Paper and size：Configured / Bleed proof：Available / Job request：Pending review
- Features: 一张纸样预览随选择实时变化；单价、制版费一次算清；确认前可复核
- Page change: keep configurator logic (best interaction in the set); replace CSS-bar poster with a real print specimen plate.

## 10 Dark Theme — 潮汐影院
- Old: 晚场放映室，独立晚间放映
- New brand: **潮汐影院** | User: 影迷 | Task: 今晚两场，选座、确认、拿模拟影票
- Eyebrow: A repertory cinema by the sea | Headline: Before the tide returns.
- Lede: 一家海边 repertory 影院。今晚两场、40 席，选座后生成一张本地模拟影票。
- Nav: Tonight / Screenings / Seats | Primary: Confirm seats | Secondary: Switch screening
- Metrics: 19:30 first screening / 40 auditorium seats / 4 maximum seats per booking
- Queue: 潮声抵达之前：19:30 / 夜路慢行：21:45 / 一号厅：Select seats
- Features: 全景影片画幅定气氛；场次切换联动余座与单价；出票只在本地
- Page change: keep seat map + screening switch; add a real film-still plate, not a dark gradient.

## 11 Structured Lines — 途迹物流
- Old: 沿途，个人包裹
- New brand: **途迹物流** | User: 电商商家客服 | Task: 查两单货，4 个节点，异常件优先处理
- Eyebrow: A 3PL parcel ledger, stop by stop | Headline: Good things are on their way to you.
- Lede: 一家第三方物流的商家端查询。两单货、四站路，异常节点优先标出，预计 18:00 送达。
- Nav: Track / Route / History | Primary: Track parcel | Secondary: View route
- Metrics: 04 route stops / 02 sample waybills / 18:00 estimated arrival
- Queue: 景德镇揽收：Completed / 杭州中转：Completed / 拱墅末端：Out for delivery
- Features: 细线框 + 结构化节奏；时间线是主角；异常状态不靠颜色 alone，要有文字
- Page change: keep timeline; add a route map strip.

## 12 Layered Material — 书屿
- Old: 书间，个人阅读角
- New brand: **书屿** | User: 读书会成员 | Task: 跟读 3 本书，记页码、定 30 分钟阅读时段
- Eyebrow: A reading club, one book at a time | Headline: Open a book, and a little time for yourself.
- Lede: 一个读书会的阅读记录。3 本书、当前页码、30 分钟时段，读完一本再换下一本。
- Nav: Reading / Bookshelf / Reading time | Primary: Record current page | Secondary: View bookshelf
- Metrics: 126 pages read / 288 book pages / 30 min reading slot
- Queue: 《慢慢读》：Page 126 / 《树间来信》：Page 42 / 《海边周末》：Page 18
- Features: 大圆角卡片 + 色调分层；触摸友好；进度即内容
- Page change: keep layered cards; add book-cover plates.

## 13 Bento Layout — 午食盒
- Old: 午后厨房，午餐盒定制
- New brand: **午食盒** | User: 办公室员工 | Task: 订一份工作午餐，选主菜、配菜、取餐时段
- Eyebrow: Workplace lunch, made your way | Headline: Put the things you love into one lunch box.
- Lede: 一家面向办公室的午餐订阅。3 道主菜、3 样配菜，12:20 取餐，生成一张取餐票。
- Nav: Mains / Sides / Pickup | Primary: Generate pickup ticket | Secondary: Change pickup slot
- Metrics: 03 main dishes / 03 optional sides / 12:20 pickup slot
- Queue: 照烧鸡：26 yuan / 溏心蛋：Selected / 13:00 pickup：Full
- Features: 便当格是模块；主菜、配菜、取餐分块清晰；价格与时段一次确认
- Page change: keep bento grid; add food illustration plates, not coloured boxes.

## 14 Neumorphism — 静庭
- Old: 慢拍，本地声音房 + 专注计时
- New brand: **静庭** | User: 需要深度工作的知识工作者 | Task: 选一个声音场景，专注 25 分钟
- Eyebrow: Focus timer and soundscapes | Headline: Leave a little time to hear yourself slow down.
- Lede: 一个专注工具。3 个本地声音场景、25 分钟计时、音量可调；不联网、不登录。
- Nav: Sound room / Scenes / Focus | Primary: Play or pause sound | Secondary: Set focus duration
- Metrics: 03 local audio scenes / 25 min focus duration / 35% initial volume
- Queue: 雨夜书房：Ready / Focus timer：25 minutes / Output volume：35 percent
- Features: 柔和阴影 + 内嵌深度；控制要大、要稳；计时状态始终可见
- Page change: keep sound + timer; restrain shadows (the most dated style in the set — soften, don't add more depth).

## 15 Liquid Glass — 夜行地图
- Old: 夜航，夜晚散步
- New brand: **夜行地图** | User: 夜晚来访的游客 | Task: 选一条 30 分钟夜行路线，5 个点，导出行程
- Eyebrow: Night walks for visitors | Headline: Find a little more city after the lights come on.
- Lede: 一份给游客的夜行地图。5 个点、2 条路线、30 分钟，导出一份可离线查看的行程。
- Nav: Routes / Places / Itinerary | Primary: Export walking route | Secondary: View places
- Metrics: 05 places / 02 routes / 30 walking minutes
- Queue: 老码头：On route / 不眠书店：Selected / 月桥：On route
- Features: 磨砂玻璃层叠在地图之上；路线是主角，玻璃是材质；夜间可读性优先
- Page change: keep glass panels; add a real map layer underneath — currently blur over nothing.

## 16 Retro Computing — 回声唱片
- Old: 磁盘周刊，离线阅读
- New brand: **回声唱片** | User: 黑胶 / 磁带爱好者 | Task: 每周看 3 篇乐评，开一篇，收藏
- Eyebrow: An independent record store weekly | Headline: Good reading does not need to stay online.
- Lede: 一家独立唱片店的周刊。3 篇文章、3 期杂志，打开一篇慢慢读，离线也可看。
- Nav: Issues / Bookmarks / Reader | Primary: Open an issue | Secondary: View bookmarks
- Metrics: 03 issues / 03 articles / 01 reading window
- Queue: 周末笔记：Available / 纸上消息：Reading / 旧电台：Available
- Features: 像素风 + 老系统窗口；内容是主角，装饰是窗口；阅读窗口一次一篇
- Page change: keep OS-window chrome; add record-cover / zine plates.

## 17 Neo-Brutalism — 硬核发布
- Old: 放大字，海报工作室
- New brand: **硬核发布** | User: 开源工具作者 | Task: 为一次 CLI 发布做海报，选配色、改标题，导出 SVG
- Eyebrow: A launch poster for a developer tool | Headline: Give your next event a louder first impression.
- Lede: 一次开发者工具发布的海报。改标题、换 3 套撞色，导出 SVG 直接用在发布页。
- Nav: Canvas / Editor / Compositions | Primary: Download my poster | Secondary: Change palette
- Metrics: 03 palettes / 03 compositions / SVG export
- Queue: Event title：Editable / Color clash：Three palettes / SVG poster：Ready to export
- Features: 粗线 + 强撞色 + 巨型字；混乱受控；导出是终点
- Page change: keep poster editor; add a real display type pairing, tighten clash control.

## 18 Precision Futurism — 衡算 Agent 运维台
- Old: 帧序，渲染管线（3 个任务、5 个节点、240 帧）
- New brand: **衡算 Agent 运维台** | User: AI 应用运维工程师 | Task: 查 3 次 Agent 运行，5 个节点，定位失败的检索节点并重试
- Eyebrow: AI Agent operations console | Headline: 让每一次 Agent 运行，都有据可查。
- Lede: 一个 AI Agent 运行控制台。3 次运行、5 个节点：检索、重排、规划、工具调用、校验。失败节点可重试，日志可导出；演示数据在本地，不连真实服务。
- Nav: Queue / Pipeline / Events | Primary: Repair and retry | Secondary: Export current log
- Metrics: 03 runs / 05 nodes / 240 steps
- Queue: 客服问答运行：Needs recovery / 文档问答运行：Paused / 订单异常处理：Complete
- Features: 管线图是中心，节点检查器在右；重试从已完成步骤继续；状态用颜色 + 文字 + 单调数值三重表达
- Page change: **flagship redefinition** — nodes become Retrieval / Rerank / Planning / Tool call / Verification; jobs become Agent runs; log lines become run events. This is the style closest to Jams's target role (senior AI application / AI Agent developer).
- Note: demo scenario only — do not present it as Jams's shipped project.

## 19 Gradient Pop — 夜跑团
- Old: 夜跑电台，After Hours Run Club
- New brand: **夜跑团** | User: 城市跑者 | Task: 选 5 公里江边路线，选配速组，报名占位
- Eyebrow: A city run club, after hours | Headline: Make the city at night your own running ground.
- Lede: 一个城市夜跑团。5 公里江边路线、配速组、19:30 出发，报名只在本地演示。
- Nav: Route choices / Your pace / Local registration | Primary: Reserve a starting place | Secondary: View route map
- Metrics: 5.0 kilometres / 35 estimated minutes / 19:30 departure
- Queue: Riverside route：5 km / Pace group：Easy / Registration：Local demo
- Features: 大色块 + 轨道渐变是视觉；路线图要可读；报名信息一次说清
- Page change: keep route + pace + registration; add a real route map + runner silhouette plate.

## 20 Soft Pop — 慢拍音乐教室
- Old: 慢拍子，节拍练习
- New brand: **慢拍音乐教室** | User: 成人钢琴初学者 | Task: 选一课，80 BPM 跟练 8 拍，记一轮完成
- Eyebrow: Piano practice for adult beginners | Headline: Find your rhythm, one gentle beat at a time.
- Lede: 一家成人钢琴教室的跟练工具。选课、定 80 BPM、练 8 拍，完成一轮记一次。
- Nav: Choose a lesson / Keep a steady beat / A little progress | Primary: Start a practice round | Secondary: Choose a lesson
- Metrics: 80 BPM / 8 distinct taps / 0 completed rounds
- Queue: 四分音符练习：Ready / Sound：User initiated / Record：This page only
- Features: 友好插画开场；中央练习谱是主角；节拍器滑杆要稳
- Page change: keep lesson rail + practice sheet + tempo slider; add notation visual.

## 21 Acid Design — 失真唱片
- Old: 失真档案，实验作品集
- New brand: **失真唱片** | User: 电子音乐爱好者 | Task: 听 4 首 48 秒试听，排一个个人播放顺序
- Eyebrow: An independent electronic label | Headline: Distortion can have its own order.
- Lede: 一家独立电子厂牌的新专试听。4 首、每首 48 秒，排一个自己的顺序，底部播放器常驻。
- Nav: Sound cuts / Playback control / Personal sequence | Primary: Play an original sound study | Secondary: Reorder my sequence
- Metrics: 04 sound studies / 48s preview length / 02 queued tracks
- Queue: Neon Fold：Selected / Liquid Echo：Queued / Audio：Paused
- Features: 铬色雕塑 + 错位排版是舞台；音轨切片可排序；播放器稳定在底部
- Page change: keep track slices + bottom player; add a hero artwork plate.

## 22 Art Deco — 鎏金大饭店
- Old: 海上电台，爵士晚会
- New brand: **鎏金大饭店** | User: 庆祝晚宴的客人 | Task: 订一张 19:30 的桌，8 张桌中选一桌，看菜单与人均
- Eyebrow: A heritage hotel, an evening of jazz | Headline: Leave the evening to a record.
- Lede: 一家老牌饭店的爵士晚宴。19:30、8 张桌，选桌、看菜单与人均，生成一张本地预约单。
- Nav: An evening together / Find a table / A local invitation | Primary: Create a reservation slip | Secondary: View menu
- Metrics: 08 tables / 03 evenings / 228 starting price per guest
- Queue: Evening：19:30 / Seasonal dinner：228 per guest / Reservation：Local demo
- Features: 对称 + 金线是全部；日期与人数在两侧；菜单与价格在侧边
- Page change: keep floor plan + menu; add gold-line ornament + a real floor-plan drawing.

## 23 Wabi-Sabi — 拾器修复所
- Old: 拾木修复工作室，1987 年的椅子
- New brand: **拾器修复所** | User: 想修一件旧物的客人 | Task: 为一把 1987 年的椅子选修复方案，预约面谈
- Eyebrow: A restoration atelier for old objects | Headline: Keep the old stories. Give a good chair a second chapter.
- Lede: 一家器物修复工作室。一把 1987 年的椅子，3 种修复方案、2 种表面处理，预约一次面谈。
- Nav: Story / Repair plan / Visit | Primary: Book a studio consultation | Secondary: View repair options
- Metrics: 1987 chair archive / 3 repair choices / 2 surface finishes
- Queue: Joint repair：Available / Keep patina：Selected / Studio consultation：Unreserved
- Features: 泥土色 + 克制留白；手工痕迹是质感，不是瑕疵；修复方案一次说清
- Page change: keep story + plan + visit; add texture + object plates.

## 24 Ink Wash — 山外茶室
- Old: 山水旧札，地方志阅读
- New brand: **山外茶室** | User: 茶室客人 / 读者 | Task: 读 3 章山水散文，加眉批，记笔记
- Eyebrow: A tea house reading room | Headline: Between mountains and rivers, everyday lives.
- Lede: 一家茶室的阅读角。3 章、9 段原文，加眉批、记笔记；纸白、墨黑、朱红印章。
- Nav: Chapters / Reading / Notebook | Primary: Add a margin note | Secondary: View chapters
- Metrics: 3 chapters / 9 original passages / 0 initial notes
- Queue: 山水：Volume I / 旧巷：Volume II / 时令笔记：Volume III
- Features: 卷轴节奏 + 纸面留白；眉批是交互；印章只用在关键处
- Page change: keep scroll rhythm; add an ink-painting plate.

## 25 Blueprint — 方寸营造
- Old: 泊位，6.5㎡ 露营车内装
- New brand: **方寸营造** | User: 小户型业主 / 建筑师 | Task: 在 6.5㎡ 里排一张床、一个柜，留 450mm 过道
- Eyebrow: A studio for small homes | Headline: Fit a distant life into 6.5 square metres.
- Lede: 一家做小户型的工作室。6.5㎡、3600×1800mm，排床、排柜，留出 450mm 过道，确认一次布局。
- Nav: Plan / Configuration / Review | Primary: Confirm the current layout | Secondary: Adjust cabinet
- Metrics: 3600 interior length mm / 1800 interior width mm / 450 target aisle mm
- Queue: Base bed layout：Selected / 450 mm cabinet：Adjustable / 450 mm aisle：Passed
- Features: 深蓝网格 + 青色线是图纸；标注即内容；尺寸要真实可核
- Page change: keep measured plan; add a real plan drawing with annotations.

## 26 Industrial Control — 冷链中控
- Old: 冷链哨站，北区冷库当班
- New brand: **冷链中控** | User: 冷链仓库当班主管 | Task: 管 8 间冷库，处理 1 起超温告警，记处置步骤
- Eyebrow: Cold-chain shift console | Headline: 北区冷库 · 当班总览
- Lede: 一家食品冷链仓库的当班控制台。8 间冷库、1 起超温告警，确认、处置、复测，记入当班日志。
- Nav: Zones / Alerts / Shift log | Primary: Acknowledge and record treatment | Secondary: View shift log
- Metrics: 8 cold rooms / 1 open incident / 4 treatment steps
- Queue: C—01 over-temperature：Unacknowledged / Door contact：Closed / Temperature retest：After treatment
- Features: 深色面板 + 安全色 + 密集状态行；告警要确认，不只是变色；处置步骤可追溯
- Page change: keep dense status rows; improve hierarchy so it reads as a control room. Closest to Jams's MES experience after 01.

---

## What stays the same, what changes in code

- Unchanged: style IDs 01–26, slugs, `name`/`zhName`, tokens (`bg/surface/text/muted/primary/accent/border/radius/shadow`), `bestFor`, `playbook`, `geometry`, `implementation`, `scene`.
- Changed in `catalog/styles.json`: `scenario` (all 13 fields per style, per the bible above).
- Changed in `catalog/style-docs.zh.json`: `scenario.eyebrow/headline/primaryAction/secondaryAction/features/queue` (Chinese, per the bible above; `brand` comes from the English catalog in `renderStyleDoc`).
- Regenerated by `npm run docs`: `README.md`, `README.zh-CN.md`, `skills/awesome-page-design/references/styles/style-XX-*.md`, `skills/awesome-page-design/references/style-index.md`.
- **Not** changed by this step: the visible demo pages. Those are hardcoded in `scripts/preview-pages/redesign/styleXX.js` (+ `style01-inventory.*`, `style02-market.*`) and must be rewritten per style in the next step, then `npm run previews` + `npm run check`.
- 18 is the flagship: render pipeline → Agent run pipeline. 01 and 26 are the MES/enterprise pair. Those three should be implemented first as the pilot, even though the bible covers all 26.
