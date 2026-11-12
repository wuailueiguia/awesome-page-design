const dashboards = [
  { id: "growth", name: "增长总览", metrics: [
    { label: "月活用户", value: "128,400", delta: "+12.4%" },
    { label: "新增注册", value: "9,812", delta: "+8.1%" },
    { label: "付费转化", value: "4.6%", delta: "+0.8 pt" }
  ]},
  { id: "retention", name: "留存分析", metrics: [
    { label: "次日留存", value: "68%", delta: "+3.2 pt" },
    { label: "7 日留存", value: "41%", delta: "+1.5 pt" },
    { label: "30 日留存", value: "23%", delta: "-0.4 pt" }
  ]},
  { id: "revenue", name: "收入报表", metrics: [
    { label: "月经常收入", value: "¥486,000", delta: "+15.7%" },
    { label: "客单价", value: "¥1,280", delta: "+4.2%" },
    { label: "流失率", value: "2.1%", delta: "-0.3 pt" }
  ]}
];
function init() {
  const root = document.querySelector(".s29"), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  const data = JSON.parse($("[data-s29-data]").textContent);
  D.bindDialogs(root);
  let current = 0;
  let trial = false;
  function draw() {
    const d = data[current];
    root.querySelectorAll("[data-s29-tab]").forEach((b, i) => {
      b.setAttribute("aria-pressed", String(i === current));
      b.classList.toggle("is-active", i === current);
    });
    $("[data-s29-cards]").innerHTML = d.metrics.map(m => `<article class="s29-card"><p>${D.escapeHtml(m.label)}</p><strong>${D.escapeHtml(m.value)}</strong><span class="${m.delta.startsWith("-") ? "down" : "up"}">${D.escapeHtml(m.delta)}</span></article>`).join("");
    $("[data-s29-note]").textContent = `当前看板：${d.name}，3 个核心指标，每 30 秒刷新一次（演示数据）`;
  }
  root.querySelectorAll("[data-s29-tab]").forEach((b, i) => b.addEventListener("click", () => { current = i; draw(); }));
  D.wireForm($("[data-s29-form]"), formData => {
    trial = true;
    const email = String(formData.get("email")).trim();
    root.querySelectorAll("[data-s29-trial]").forEach(b => { b.textContent = "已开通试用 ✓"; b.disabled = true; });
    D.closeDialog($("#s29-trial-dialog"));
    D.toast(root, `试用已开通，14 天免费，确认邮件将发到 ${email}。`);
  });
  root.querySelectorAll("[data-s29-trial]").forEach(b => b.addEventListener("click", () => { if (!trial) D.openDialog($("#s29-trial-dialog")); }));
  draw();
}
function render() {
  return `<div class="demo-root s29">
  <header class="s29-header"><a href="#top" class="s29-brand"><span aria-hidden="true">数</span><b>数核</b><small>SHUHE</small></a>
  <nav aria-label="产品导航"><span aria-current="page">产品</span><span>定价</span><span>文档</span></nav>
  <button type="button" class="s29-trial" data-s29-trial>免费试用</button></header>
  <section class="s29-hero" aria-labelledby="s29-title">
    <p class="s29-eyebrow">ANALYTICS PLATFORM / SAAS</p>
    <h1 id="s29-title">数据一动，生意就跟得上。</h1>
    <p class="s29-lede">数核是给增长团队的数据分析平台。3 个核心指标、3 个看板、1 个试用入口：注册 14 天免费，不用信用卡。</p>
    <p class="s29-cta"><button type="button" class="s29-trial" data-s29-trial>免费试用 14 天</button><button type="button" class="s29-ghost">查看定价</button></p>
    <p class="s29-meta"><span>03 个核心指标</span><span>14 天免费试用</span><span>01 个看板</span></p>
  </section>
  <figure class="s29-shot"><img src="saas-dashboard-dark.jpg" alt="深色仪表盘：靛蓝辉光的图表与数据面板"><figcaption><span>产品截图 · 增长总览</span><span>AI 生成示意</span></figcaption></figure>
  <section class="s29-dash" aria-label="看板演示">
    <div class="s29-tabs" role="group" aria-label="选择看板">${dashboards.map((d, i) => `<button type="button" data-s29-tab="${i}" aria-pressed="${i === 0}" class="${i === 0 ? "is-active" : ""}">${d.name}</button>`).join("")}</div>
    <div class="s29-cards" data-s29-cards></div>
  </section>
  <footer class="s29-footer"><span role="status" aria-live="polite" data-s29-note></span><span>演示数据只保存在本地 · 图片为 AI 生成示意</span></footer>
  <dialog class="s29-dialog" id="s29-trial-dialog" aria-labelledby="s29-dialog-title">
    <form data-s29-form novalidate>
      <header><div><p>FREE TRIAL</p><h2 id="s29-dialog-title">开通 14 天免费试用</h2></div><button type="button" class="demo-close" data-demo-close aria-label="关闭试用表单">×</button></header>
      <p class="s29-dialog-note">不用信用卡，试用到期前 3 天会提醒你。本地演示，不发送邮件。</p>
      <label><span>工作邮箱 <b aria-hidden="true">*</b></span><input name="email" type="email" placeholder="you@company.com" required aria-describedby="s29-email-error" data-error="请输入有效的工作邮箱。"></label>
      <p class="demo-field-error" id="s29-email-error"></p>
      <label><span>公司名称</span><input name="company" type="text" placeholder="数核科技有限公司"></label>
      <button type="submit" class="s29-submit">开通试用</button>
    </form>
  </dialog>
  <script type="application/json" data-s29-data>${JSON.stringify(dashboards)}</script>
  <script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
