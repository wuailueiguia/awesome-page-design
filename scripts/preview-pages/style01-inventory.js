const { icon } = require("./style01-icons");

const initialInventory = [
  { code: "HG-2048", name: "便携振动分析仪", detail: "双通道 · 含磁吸座与收纳包", category: "检测仪器", room: "一号车间", count: 6, keeper: "周知夏", date: "2026-10-27", stage: "可领用", open: true },
  { code: "HG-2047", name: "无线扭矩扳手组", detail: "数显扭矩 · 蓝牙记录", category: "紧固工具", room: "二号车间", count: 12, keeper: "林予安", date: "2026-10-27", stage: "可领用", open: true },
  { code: "HG-2046", name: "铝合金检修支架组", detail: "折叠支架 · 三件套", category: "检修工装", room: "仓库", count: 8, keeper: "许明澈", date: "2026-10-26", stage: "可领用", open: true },
  { code: "HG-2045", name: "便携工业内窥镜", detail: "双光源探头 · 3 米软管", category: "检测仪器", room: "一号车间", count: 0, keeper: "周知夏", date: "2026-10-26", stage: "借出中", open: true },
  { code: "HG-2044", name: "移动工作站", detail: "27 英寸 · 带升降支架", category: "办公设备", room: "二号车间", count: 2, keeper: "林予安", date: "2026-10-25", stage: "可领用", open: true },
  { code: "HG-2043", name: "手持红外测温仪", detail: "六台一组 · 附充电底座", category: "检测仪器", room: "仓库", count: 0, keeper: "陈听禾", date: "2026-10-25", stage: "检修中", open: false },
  { code: "HG-2042", name: "折叠检修平台", detail: "A3 作业面 · 磁吸面板", category: "检修工装", room: "仓库", count: 10, keeper: "许明澈", date: "2026-10-24", stage: "可领用", open: true },
  { code: "HG-2041", name: "工具收纳箱", detail: "45L 带轮款 · 可叠放", category: "仓储物料", room: "仓库", count: 0, keeper: "陈听禾", date: "2026-10-24", stage: "借出中", open: true },
  { code: "HG-2040", name: "噪声检测仪", detail: "全向拾音 · 桌面款", category: "检测仪器", room: "二号车间", count: 4, keeper: "林予安", date: "2026-10-23", stage: "可领用", open: true },
  { code: "HG-2039", name: "激光测距仪", detail: "200 米量程 · 含防护包", category: "检测仪器", room: "一号车间", count: 1, keeper: "周知夏", date: "2026-10-22", stage: "可领用", open: true },
  { code: "HG-2038", name: "便携标签打印机", detail: "蓝牙连接 · 热敏打印", category: "办公设备", room: "二号车间", count: 3, keeper: "林予安", date: "2026-10-22", stage: "可领用", open: true },
  { code: "HG-2037", name: "工业延长线盘", detail: "20 米防雨线盘", category: "仓储物料", room: "仓库", count: 0, keeper: "陈听禾", date: "2026-10-21", stage: "检修中", open: false },
  { code: "HG-2036", name: "轻便测量三脚架", detail: "碳纤维 · 折叠款", category: "检测仪器", room: "一号车间", count: 5, keeper: "周知夏", date: "2026-10-21", stage: "可领用", open: true },
  { code: "HG-2035", name: "线缆理线盒", detail: "六位插排收纳", category: "检修工装", room: "二号车间", count: 7, keeper: "许明澈", date: "2026-10-20", stage: "可领用", open: true },
  { code: "HG-2034", name: "防静电工作椅", detail: "深灰款 · 单把", category: "检修工装", room: "仓库", count: 0, keeper: "许明澈", date: "2026-10-19", stage: "借出中", open: true },
  { code: "HG-2033", name: "数字绘图板", detail: "中号压感板 · 含手写笔", category: "办公设备", room: "二号车间", count: 2, keeper: "林予安", date: "2026-10-18", stage: "可领用", open: true },
];
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
function selectControl(id, label, values, initial = "", placeholder = "不限") {
  const items = values.map(value => typeof value === "string" ? { value, label: value } : value);
  const selected = items.find(item => item.value === initial);
  return `<div class="stock-select" data-stock-select><button type="button" class="stock-select-trigger" id="${id}-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}-options" aria-label="${label}" data-stock-select-trigger><span data-stock-select-label>${escape(selected?.label || placeholder)}</span>${icon("chevron-down")}</button><input type="hidden" id="${id}" value="${escape(initial)}"><div class="stock-select-options" role="listbox" id="${id}-options" aria-label="${label}" hidden>${items.map(item => `<button type="button" role="option" aria-selected="${item.value === initial}" data-stock-option="${escape(item.value)}">${escape(item.label)}${icon("check")}</button>`).join("")}</div></div>`;
}
function renderStyle01Inventory() {
  const rooms = ["一号车间", "二号车间", "检测室", "仓库"];
  const stages = ["可领用", "借出中", "检修中"];
  const menus = [["all", "boxes", "全部设备"], ["ready", "package", "可领用设备"], ["borrowed", "rotate-ccw", "归还跟进"], ["repair", "wrench", "待检修设备"]];
  return `<section class="stock-app" aria-label="衡工设备调度台">
    <a class="stock-brand" href="#top" aria-label="衡工设备调度台首页"><span class="stock-brand-icon">${icon("boxes")}</span><strong>衡工设备台账</strong><span class="stock-brand-note">设备调度台</span></a>
    <header class="stock-topbar"><div class="stock-topbar-left"><button class="stock-icon-button stock-drawer-toggle" type="button" data-stock-drawer-toggle aria-label="展开设备导航" aria-expanded="false" aria-controls="stock-sidebar">${icon("panel-left")}</button><span class="stock-current-location" data-stock-location>设备台账</span></div><div class="stock-topbar-right"><span class="stock-workspace">衡工制造一厂</span><span class="stock-topbar-divider"></span><span class="stock-avatar">${icon("user")}</span><span class="stock-person">林予安<span>设备管理员</span></span><button class="stock-icon-button" type="button" aria-label="查看待办提醒" data-stock-reminder>${icon("bell")}<i class="stock-notification-dot"></i></button></div></header>
    <div class="stock-drawer-backdrop" data-stock-drawer-backdrop hidden></div>
    <aside class="stock-sidebar" id="stock-sidebar"><div class="stock-sidebar-mobile-head"><strong>设备工作台</strong><button class="stock-icon-button" type="button" data-stock-drawer-close aria-label="收起设备导航">${icon("x")}</button></div><p class="stock-nav-caption">清单与流转</p><nav aria-label="设备视图">${menus.map(([key, glyph, label], index) => `<button type="button" class="stock-nav-item${index === 0 ? " is-active" : ""}" data-stock-view="${key}"${index === 0 ? ' aria-current="page"' : ""}>${icon(glyph)}<span>${label}</span><span class="stock-nav-count" data-stock-count="${key}"></span></button>`).join("")}</nav><div class="stock-sidebar-bottom"><span class="stock-connection-dot"></span><span>记录仅保存在本次演示</span></div></aside>
    <div class="stock-workspace-area"><section class="stock-panel" aria-labelledby="stock-page-title"><header class="stock-panel-heading"><div><h1 id="stock-page-title" data-stock-page-title>设备台账</h1><p data-stock-page-description>记录设备去向，让每一次领用都有据可查。</p></div><button class="stock-button stock-button-primary" type="button" data-stock-create>${icon("plus")}<span>登记设备</span></button></header>
      <figure class="stock-hero"><img src="factory-equipment.jpg" alt="一号车间数控加工中心"><figcaption><strong>今日重点 · 一号车间</strong><span>数控加工中心刀具组 · 6 组可领用 · 检修支架组已备妥</span></figcaption></figure>
      <form class="stock-filters" data-stock-filters><label class="stock-search"><span class="stock-sr-only">按设备或编号检索</span>${icon("search")}<input name="query" placeholder="按设备或编号检索" autocomplete="off"></label>${selectControl("stock-room-filter", "按库位筛查", [{ value: "", label: "全部库位" }, ...rooms.map(value => ({ value, label: value }))])}${selectControl("stock-stage-filter", "按流转情况筛查", [{ value: "", label: "全部流转情况" }, ...stages.map(value => ({ value, label: value }))])}<button class="stock-button" type="submit">筛查</button><button class="stock-button stock-button-quiet" type="button" data-stock-clear>清空条件</button></form>
      <div class="stock-table-scroll" tabindex="0" aria-label="设备清单，可横向滚动"><table class="stock-table"><thead><tr><th class="stock-col-code">设备编号</th><th class="stock-col-name">设备名称</th><th>设备分组</th><th>所在库位</th><th class="stock-numeric">可领数量</th><th>保管同事</th><th>流转情况</th><th>最近流转</th><th class="stock-col-actions">条目处理</th></tr></thead><tbody data-stock-rows></tbody></table><div class="stock-empty" data-stock-empty hidden>${icon("package")}<strong>没有找到对应设备</strong><p>换一组条件，或先登记一件设备。</p><button type="button" class="stock-button" data-stock-empty-clear>查看全部设备</button></div></div>
      <footer class="stock-table-footer"><p data-stock-total>共 16 件设备</p><div class="stock-pagination"><span class="stock-page-size">每页 8 件</span><button class="stock-icon-button" type="button" aria-label="上一页设备" data-stock-prev>${icon("chevron-left")}</button><div class="stock-page-buttons" data-stock-pages></div><button class="stock-icon-button" type="button" aria-label="下一页设备" data-stock-next>${icon("chevron-right")}</button></div></footer>
    </section><p class="stock-page-footnote">让物尽其用，也让协作更轻一点。</p></div>
    <dialog class="stock-dialog" id="stock-item-dialog" aria-labelledby="stock-dialog-title"><form data-stock-item-form novalidate><header class="stock-dialog-head"><h2 id="stock-dialog-title">登记一件设备</h2><button class="stock-icon-button" type="button" data-stock-dismiss aria-label="收起设备表单">${icon("x")}</button></header><div class="stock-dialog-body"><div class="stock-form-grid"><label class="stock-field"><span>设备编号</span><input name="code" readonly aria-describedby="stock-code-help"><small id="stock-code-help">新设备将自动分配编号</small></label><label class="stock-field"><span>设备名称 <b aria-hidden="true">*</b></span><input name="name" placeholder="例如：便携振动分析仪" maxlength="60" required aria-describedby="stock-name-error"><small class="stock-field-error" id="stock-name-error" data-stock-error="name"></small></label><div class="stock-field"><label for="stock-category-trigger">设备分组</label>${selectControl("stock-category", "设备分组", ["检测仪器", "办公设备", "检修工装", "仓储物料"], "检测仪器")}</div><label class="stock-field"><span>保管同事 <b aria-hidden="true">*</b></span><input name="keeper" placeholder="填写负责接收与归还的同事" maxlength="20" required aria-describedby="stock-keeper-error"><small class="stock-field-error" id="stock-keeper-error" data-stock-error="keeper"></small></label><div class="stock-field stock-field-wide"><label for="stock-room-trigger">所在库位</label>${selectControl("stock-room", "所在库位", rooms, "一号车间")}</div><label class="stock-field stock-field-wide"><span>设备说明</span><textarea name="detail" placeholder="记录规格、配件或需要留意的事项" rows="2" maxlength="120"></textarea></label><label class="stock-field"><span>可领数量 <b aria-hidden="true">*</b></span><input name="count" type="number" min="0" max="9999" step="1" value="1" required aria-describedby="stock-count-error"><small class="stock-field-error" id="stock-count-error" data-stock-error="count"></small></label><div class="stock-field"><label for="stock-stage-trigger">流转情况</label>${selectControl("stock-stage", "流转情况", stages, "可领用")}</div><div class="stock-field stock-field-wide stock-switch-field"><div><span>开放领用登记</span><small>关闭后，这件设备仍会保留在台账中。</small></div><button class="stock-switch" type="button" role="switch" aria-checked="true" aria-label="开放领用登记" data-stock-available><span></span></button></div></div><p class="stock-form-message" data-stock-form-message aria-live="polite"></p></div><footer class="stock-dialog-footer"><button class="stock-button" type="button" data-stock-dismiss>稍后填写</button><button class="stock-button stock-button-primary" type="submit" data-stock-submit>完成登记</button></footer></form></dialog>
    <dialog class="stock-dialog stock-confirm" id="stock-remove-dialog" aria-labelledby="stock-remove-title"><header class="stock-dialog-head"><h2 id="stock-remove-title">将这件设备移出台账？</h2><button class="stock-icon-button" type="button" data-stock-remove-dismiss aria-label="返回设备台账">${icon("x")}</button></header><div class="stock-dialog-body"><p data-stock-remove-copy></p><p class="stock-muted">本次演示中移出的条目不会继续出现在清单里。</p></div><footer class="stock-dialog-footer"><button class="stock-button" type="button" data-stock-remove-dismiss>继续保留</button><button class="stock-button stock-button-danger" type="button" data-stock-remove-confirm>确认移出</button></footer></dialog>
    <div class="stock-toast" role="status" aria-live="polite" data-stock-toast hidden>${icon("circle-check")}<span data-stock-toast-text></span></div>
  </section><script>(${initializeInventory.toString()})(${JSON.stringify(initialInventory)});</script>`;
}

function initializeInventory(initial) {
  const root = document.querySelector(".stock-app");
  if (!root) return;
  const $ = selector => root.querySelector(selector);
  const $$ = selector => [...root.querySelectorAll(selector)];
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const state = { items: initial.map(item => ({ ...item })), view: "all", page: 1, query: "", room: "", stage: "", editing: null, removing: null, open: true, saving: false, trigger: null, nextId: 1049 };
  const titles = { all: ["设备台账", "记录设备去向，让每一次领用都有据可查。"], ready: ["可领用设备", "这些设备已备妥，可以安排下一次领用。"], borrowed: ["归还跟进", "跟进已借出设备，及时衔接下一次使用。"], repair: ["待检修设备", "把需要照料的设备单独留意起来。"] };
  const dialog = $("#stock-item-dialog"), removeDialog = $("#stock-remove-dialog"), form = $("[data-stock-item-form]");
  let toastTimer, previousOverflow = "", drawerOverflow = "";
  const drawerInert = [];
  function toast(message) { $("[data-stock-toast-text]").textContent = message; $("[data-stock-toast]").hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { $("[data-stock-toast]").hidden = true; }, 3200); }
  function setSelect(id, value) {
    const input = $("#" + id), select = input.closest("[data-stock-select]"); input.value = value;
    const options = [...select.querySelectorAll("[data-stock-option]")];
    options.forEach(option => option.setAttribute("aria-selected", String(option.dataset.stockOption === value)));
    const selected = options.find(option => option.dataset.stockOption === value);
    select.querySelector("[data-stock-select-label]").textContent = selected?.textContent.trim() || value;
  }
  function closeSelects(restore = false) { $$("[data-stock-select]").forEach(select => { const trigger = select.querySelector("[data-stock-select-trigger]"), options = select.querySelector('[role="listbox"]'); if (trigger.getAttribute("aria-expanded") === "true") { trigger.setAttribute("aria-expanded", "false"); options.hidden = true; if (restore) trigger.focus(); } }); }
  function toggleSelect(select, keyboard = false) {
    const trigger = select.querySelector("[data-stock-select-trigger]"), options = select.querySelector('[role="listbox"]');
    const wasOpen = trigger.getAttribute("aria-expanded") === "true"; closeSelects();
    if (wasOpen) return;
    trigger.setAttribute("aria-expanded", "true"); options.hidden = false;
    const bounds = options.getBoundingClientRect(), limit = select.closest(".stock-dialog-body")?.getBoundingClientRect().bottom || innerHeight;
    select.classList.toggle("stock-select-up", bounds.bottom > limit - 12 && select.getBoundingClientRect().top - bounds.height > 60);
    if (keyboard) (options.querySelector('[aria-selected="true"]') || options.querySelector("button"))?.focus();
  }
  function filtered() { return state.items.filter(item => (state.view === "all" || state.view === "ready" && item.stage === "可领用" && item.open || state.view === "borrowed" && item.stage === "借出中" || state.view === "repair" && item.stage === "检修中") && (!state.query || (item.name + " " + item.code + " " + item.detail).toLowerCase().includes(state.query.toLowerCase())) && (!state.room || item.room === state.room) && (!state.stage || item.stage === state.stage)); }
  function render() {
    const list = filtered(), pageCount = Math.max(1, Math.ceil(list.length / 8)); state.page = Math.min(state.page, pageCount);
    const current = list.slice((state.page - 1) * 8, state.page * 8);
    $("[data-stock-rows]").innerHTML = current.map(item => `<tr><td><span class="stock-code">${esc(item.code)}</span></td><td><strong class="stock-item-name">${esc(item.name)}</strong><small class="stock-item-detail">${esc(item.detail || "尚未补充器材说明")}</small></td><td>${esc(item.category)}</td><td>${esc(item.room)}</td><td class="stock-numeric">${item.count}<span class="stock-unit"> 件</span></td><td>${esc(item.keeper)}</td><td><span class="stock-badge ${item.stage === "可领用" ? "is-ready" : item.stage === "借出中" ? "is-borrowed" : "is-repair"}">${esc(item.stage)}</span>${!item.open ? '<small class="stock-private-note">暂不开放领用</small>' : ""}</td><td class="stock-date">${esc(item.date)}</td><td><div class="stock-row-actions"><button type="button" data-stock-edit="${esc(item.code)}" aria-label="调整${esc(item.name)}">调整</button><button type="button" class="stock-row-remove" data-stock-remove="${esc(item.code)}" aria-label="移出${esc(item.name)}">移出</button></div></td></tr>`).join("");
    $("[data-stock-empty]").hidden = list.length !== 0;
    $("[data-stock-total]").textContent = `共 ${list.length} 件设备${list.length ? `，当前展示 ${(state.page - 1) * 8 + 1}–${Math.min(state.page * 8, list.length)} 件` : ""}`;
    $("[data-stock-prev]").disabled = state.page === 1; $("[data-stock-next]").disabled = state.page === pageCount;
    $("[data-stock-pages]").innerHTML = Array.from({ length: pageCount }, (_, i) => `<button type="button" class="stock-page-number${i + 1 === state.page ? " is-active" : ""}" data-stock-page="${i + 1}" aria-label="第 ${i + 1} 页设备"${i + 1 === state.page ? ' aria-current="page"' : ""}>${i + 1}</button>`).join("");
    $("[data-stock-count='all']").textContent = state.items.length; $("[data-stock-count='ready']").textContent = state.items.filter(item => item.stage === "可领用" && item.open).length; $("[data-stock-count='borrowed']").textContent = state.items.filter(item => item.stage === "借出中").length; $("[data-stock-count='repair']").textContent = state.items.filter(item => item.stage === "检修中").length;
    $("[data-stock-page-title]").textContent = titles[state.view][0]; $("[data-stock-location]").textContent = titles[state.view][0]; $("[data-stock-page-description]").textContent = titles[state.view][1];
  }
  function clearFilters() { $("[data-stock-filters]").reset(); setSelect("stock-room-filter", ""); setSelect("stock-stage-filter", ""); state.query = ""; state.room = ""; state.stage = ""; state.page = 1; render(); }
  function closeDrawer(restoreFocus = true) {
    if (!root.classList.contains("stock-drawer-open")) return;
    root.classList.remove("stock-drawer-open"); $("[data-stock-drawer-backdrop]").hidden = true; $("[data-stock-drawer-toggle]").setAttribute("aria-expanded", "false");
    $("#stock-sidebar").removeAttribute("role"); $("#stock-sidebar").removeAttribute("aria-modal");
    drawerInert.splice(0).forEach(element => { element.inert = false; }); document.body.style.overflow = drawerOverflow;
    if (restoreFocus) (innerWidth <= 760 ? $("[data-stock-drawer-toggle]") : $("[data-stock-view].is-active"))?.focus();
  }
  function openDrawer() {
    root.classList.add("stock-drawer-open"); $("[data-stock-drawer-backdrop]").hidden = false; $("[data-stock-drawer-toggle]").setAttribute("aria-expanded", "true");
    const sidebar = $("#stock-sidebar"), backdrop = $("[data-stock-drawer-backdrop]");
    sidebar.setAttribute("role", "dialog"); sidebar.setAttribute("aria-modal", "true"); sidebar.setAttribute("aria-label", "设备工作台");
    let branch = sidebar;
    while (branch && branch !== document.body) {
      for (const sibling of branch.parentElement.children) if (sibling !== branch && sibling !== backdrop && sibling.tagName !== "SCRIPT" && !sibling.inert) { sibling.inert = true; drawerInert.push(sibling); }
      branch = branch.parentElement;
    }
    drawerOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; $("[data-stock-drawer-close]").focus();
  }
  function openItem(code, trigger) {
    closeSelects(); state.editing = code || null; state.trigger = trigger; state.saving = false; form.reset();
    $$("[data-stock-error]").forEach(error => { error.textContent = ""; }); form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute("aria-invalid")); $("[data-stock-form-message]").textContent = "";
    const item = state.items.find(item => item.code === code);
    form.elements.code.value = item?.code || `HG-${state.nextId}`; form.elements.name.value = item?.name || ""; form.elements.keeper.value = item?.keeper || ""; form.elements.detail.value = item?.detail || ""; form.elements.count.value = item?.count ?? 1;
    setSelect("stock-category", item?.category || "检测仪器"); setSelect("stock-room", item?.room || "一号车间"); setSelect("stock-stage", item?.stage || "可领用"); state.open = item?.open ?? true; $("[data-stock-available]").setAttribute("aria-checked", String(state.open));
    $("#stock-dialog-title").textContent = item ? "调整设备信息" : "登记一件设备"; $("[data-stock-submit]").textContent = item ? "完成调整" : "完成登记"; $("[data-stock-submit]").disabled = false;
    previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; dialog.showModal(); form.elements.name.focus();
  }
  function afterClose() { closeSelects(); document.body.style.overflow = previousOverflow; const trigger = state.trigger?.isConnected ? state.trigger : $("[data-stock-create]"); trigger?.focus(); }
  dialog.addEventListener("close", afterClose); removeDialog.addEventListener("close", afterClose);
  dialog.addEventListener("cancel", event => { if (state.saving) event.preventDefault(); });
  $$("[data-stock-dismiss]").forEach(button => button.addEventListener("click", () => { if (!state.saving) dialog.close(); }));
  $$("[data-stock-remove-dismiss]").forEach(button => button.addEventListener("click", () => removeDialog.close()));
  root.addEventListener("click", event => {
    const trigger = event.target.closest("button"); if (!trigger) return;
    if (trigger.hasAttribute("data-stock-select-trigger")) toggleSelect(trigger.closest("[data-stock-select]"));
    if (trigger.hasAttribute("data-stock-option")) { const select = trigger.closest("[data-stock-select]"), input = select.querySelector('input[type="hidden"]'); setSelect(input.id, trigger.dataset.stockOption); closeSelects(); select.querySelector("[data-stock-select-trigger]").focus(); }
    if (trigger.dataset.stockView) { state.view = trigger.dataset.stockView; state.page = 1; clearFilters(); $$("[data-stock-view]").forEach(button => { button.classList.toggle("is-active", button === trigger); if (button === trigger) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current"); }); closeDrawer(); }
    if (trigger.hasAttribute("data-stock-create")) openItem(null, trigger);
    if (trigger.dataset.stockEdit) openItem(trigger.dataset.stockEdit, trigger);
    if (trigger.dataset.stockRemove) { state.removing = trigger.dataset.stockRemove; state.trigger = trigger; $("[data-stock-remove-copy]").textContent = `「${state.items.find(item => item.code === state.removing).name}」将从本次清单中移出。`; previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; removeDialog.showModal(); $("[data-stock-remove-dismiss]").focus(); }
    if (trigger.hasAttribute("data-stock-prev") && state.page > 1) { state.page--; render(); }
    if (trigger.hasAttribute("data-stock-next")) { state.page++; render(); }
    if (trigger.dataset.stockPage) { state.page = Number(trigger.dataset.stockPage); render(); $('[data-stock-page="' + state.page + '"]')?.focus(); }
    if (trigger.hasAttribute("data-stock-available")) { state.open = !state.open; trigger.setAttribute("aria-checked", String(state.open)); }
    if (trigger.hasAttribute("data-stock-reminder")) toast("有 3 件设备需要跟进归还，2 件等待检修安排。");
  });
  root.addEventListener("keydown", event => {
    const select = event.target.closest("[data-stock-select]");
    if (select && ["ArrowDown", "ArrowUp", "Home", "End", "Escape"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Escape") { event.stopPropagation(); closeSelects(true); return; }
      const trigger = select.querySelector("[data-stock-select-trigger]");
      if (trigger.getAttribute("aria-expanded") !== "true") { toggleSelect(select, true); return; }
      const options = [...select.querySelectorAll("[data-stock-option]")], i = options.indexOf(document.activeElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : event.key === "ArrowUp" ? (i - 1 + options.length) % options.length : (i + 1) % options.length;
      options[next].focus();
    }
    if (event.key === "Escape" && root.classList.contains("stock-drawer-open") && !dialog.open && !removeDialog.open) { closeDrawer(); $("[data-stock-drawer-toggle]").focus(); }
    if (event.key === "Tab") {
      closeSelects();
      if (root.classList.contains("stock-drawer-open")) {
        const buttons = [...$("#stock-sidebar").querySelectorAll("button")].filter(button => !button.disabled && button.getClientRects().length);
        if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === buttons.at(-1)) { event.preventDefault(); buttons[0]?.focus(); }
      }
    }
  });
  document.addEventListener("click", event => { if (!event.target.closest("[data-stock-select]")) closeSelects(); });
  $("[data-stock-filters]").addEventListener("submit", event => { event.preventDefault(); closeSelects(); state.query = new FormData(event.currentTarget).get("query").trim(); state.room = $("#stock-room-filter").value; state.stage = $("#stock-stage-filter").value; state.page = 1; render(); });
  $("[data-stock-clear]").addEventListener("click", clearFilters);
  $("[data-stock-empty-clear]").addEventListener("click", () => { state.view = "all"; clearFilters(); $$("[data-stock-view]").forEach(button => { const active = button.dataset.stockView === "all"; button.classList.toggle("is-active", active); if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current"); }); });
  $("[data-stock-drawer-toggle]").addEventListener("click", () => { if (root.classList.contains("stock-drawer-open")) closeDrawer(); else openDrawer(); });
  window.addEventListener("resize", () => { if (innerWidth > 760) closeDrawer(); });
  $("[data-stock-drawer-close]").addEventListener("click", closeDrawer); $("[data-stock-drawer-backdrop]").addEventListener("click", closeDrawer);
  $("[data-stock-remove-confirm]").addEventListener("click", () => { const name = state.items.find(item => item.code === state.removing)?.name; state.items = state.items.filter(item => item.code !== state.removing); removeDialog.close(); render(); toast(`已将「${name}」移出台账`); });
  form.addEventListener("submit", event => {
    event.preventDefault(); if (state.saving) return;
    const values = Object.fromEntries(new FormData(form)); let firstInvalid = null;
    for (const [key, message] of [["name", "请填写设备名称"], ["keeper", "请填写保管同事"], ["count", "可领数量应为 0–9999 之间的整数"]]) {
      const invalid = key === "count" ? !/^\d+$/.test(values.count) || Number(values.count) > 9999 : !values[key].trim();
      $("[data-stock-error='" + key + "']").textContent = invalid ? message : ""; form.elements[key].setAttribute("aria-invalid", String(invalid)); if (invalid && !firstInvalid) firstInvalid = form.elements[key];
    }
    if (firstInvalid) { firstInvalid.focus(); return; }
    const record = { code: values.code, name: values.name.trim(), keeper: values.keeper.trim(), detail: values.detail.trim(), count: Number(values.count), category: $("#stock-category").value, room: $("#stock-room").value, stage: $("#stock-stage").value, open: state.open, date: "2026-10-28" };
    closeSelects(); state.saving = true; form.querySelectorAll("button,input,textarea").forEach(control => { control.disabled = true; }); $("[data-stock-submit]").textContent = state.editing ? "正在调整…" : "正在登记…"; $("[data-stock-submit]").setAttribute("aria-busy", "true");
    setTimeout(() => {
      if (state.editing) state.items = state.items.map(item => item.code === state.editing ? record : item); else { state.items.unshift(record); state.nextId++; }
      state.saving = false; form.querySelectorAll("button,input,textarea").forEach(control => { control.disabled = false; }); $("[data-stock-submit]").removeAttribute("aria-busy"); dialog.close(); state.view = "all"; clearFilters(); $$("[data-stock-view]").forEach(button => { const active = button.dataset.stockView === "all"; button.classList.toggle("is-active", active); if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current"); }); toast(state.editing ? `「${record.name}」的资料已更新` : `「${record.name}」已登记到台账`);
    }, 500);
  });
  render();
}

module.exports = { renderStyle01Inventory };
