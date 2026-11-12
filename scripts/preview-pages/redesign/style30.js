const accounts = [
  { id: "savings", name: "储蓄账户", balance: "¥86,420.00", rate: "年利率 2.10%", txs: [
    { label: "工资入账", date: "11-10", amount: "+¥12,800.00" },
    { label: "自动转存", date: "11-09", amount: "-¥1,000.00" },
    { label: "利息入账", date: "11-01", amount: "+¥148.20" }
  ]},
  { id: "daily", name: "日常账户", balance: "¥12,350.50", rate: "年利率 0.35%", txs: [
    { label: "超市 · 山姆会员店", date: "11-12", amount: "-¥486.20" },
    { label: "地铁 · 交通卡充值", date: "11-11", amount: "-¥100.00" },
    { label: "咖啡 · 街角咖啡馆", date: "11-11", amount: "-¥32.00" }
  ]},
  { id: "wealth", name: "理财账户", balance: "¥58,900.00", rate: "近一年收益 4.35%", txs: [
    { label: "稳健理财 · 90 天", date: "11-08", amount: "+¥5,000.00" },
    { label: "收益分配", date: "11-05", amount: "+¥212.40" },
    { label: "定投扣款", date: "11-01", amount: "-¥2,000.00" }
  ]}
];
function init() {
  const root = document.querySelector(".s30"), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  const data = JSON.parse($("[data-s30-data]").textContent);
  D.bindDialogs(root);
  let current = 0;
  let applied = false;
  function draw() {
    const a = data[current];
    root.querySelectorAll("[data-s30-tab]").forEach((b, i) => {
      b.setAttribute("aria-pressed", String(i === current));
      b.classList.toggle("is-active", i === current);
    });
    $("[data-s30-balance]").textContent = a.balance;
    $("[data-s30-rate]").textContent = a.rate;
    $("[data-s30-txs]").innerHTML = a.txs.map(t => `<li><span class="s30-tx-label">${D.escapeHtml(t.label)}</span><span class="s30-tx-date">${t.date}</span><strong class="${t.amount.startsWith("+") ? "in" : "out"}">${t.amount}</strong></li>`).join("");
    $("[data-s30-note]").textContent = `当前账户：${a.name}，余额 ${a.balance}，${a.rate}`;
  }
  root.querySelectorAll("[data-s30-tab]").forEach((b, i) => b.addEventListener("click", () => { current = i; draw(); }));
  D.wireForm($("[data-s30-form]"), formData => {
    applied = true;
    const name = String(formData.get("name")).trim();
    root.querySelectorAll("[data-s30-apply]").forEach(b => { b.textContent = "已提交申请 ✓"; b.disabled = true; });
    D.closeDialog($("#s30-apply-dialog"));
    D.toast(root, `申请已提交，${name}，我们会在 1 个工作日内联系你。`);
  });
  root.querySelectorAll("[data-s30-apply]").forEach(b => b.addEventListener("click", () => { if (!applied) D.openDialog($("#s30-apply-dialog")); }));
  draw();
}
function render() {
  return `<div class="demo-root s30">
  <header class="s30-header"><a href="#top" class="s30-brand"><span aria-hidden="true">禾</span><b>青禾</b><small>QINGHE</small></a>
  <nav aria-label="银行导航"><span aria-current="page">账户</span><span>理财</span><span>关于</span></nav>
  <button type="button" class="s30-apply" data-s30-apply>开户</button></header>
  <section class="s30-hero" aria-labelledby="s30-title">
    <p class="s30-eyebrow">DIGITAL BANK / FINTECH</p>
    <h1 id="s30-title">钱，要看得明白。</h1>
    <p class="s30-lede">青禾是一家数字银行。3 个账户、3 笔动态、1 个目标：本月存下 ¥5,000，进度 62%。</p>
    <p class="s30-goal"><span>本月存钱目标 ¥5,000</span><span class="s30-goal-bar"><i style="width:62%"></i></span><b>62%</b></p>
    <p class="s30-meta"><span>03 个账户</span><span>62% 存钱进度</span><span>01 个目标</span></p>
  </section>
  <figure class="s30-shot"><img src="fintech-green-marble.jpg" alt="深绿大理石面上的黑色银行卡与金色芯片"><figcaption><span>青禾黑卡 · 深绿大理石</span><span>AI 生成示意</span></figcaption></figure>
  <section class="s30-accounts" aria-label="账户总览">
    <div class="s30-balance"><p>当前账户余额</p><strong data-s30-balance>¥86,420.00</strong><span data-s30-rate>年利率 2.10%</span></div>
    <div class="s30-tabs" role="group" aria-label="选择账户">${accounts.map((a, i) => `<button type="button" data-s30-tab="${i}" aria-pressed="${i === 0}" class="${i === 0 ? "is-active" : ""}">${a.name}</button>`).join("")}</div>
    <ul class="s30-txs" data-s30-txs></ul>
  </section>
  <footer class="s30-footer"><span role="status" aria-live="polite" data-s30-note></span><span>演示数据只保存在本地 · 图片为 AI 生成示意</span></footer>
  <dialog class="s30-dialog" id="s30-apply-dialog" aria-labelledby="s30-dialog-title">
    <form data-s30-form novalidate>
      <header><div><p>OPEN AN ACCOUNT</p><h2 id="s30-dialog-title">开一个青禾账户</h2></div><button type="button" class="demo-close" data-demo-close aria-label="关闭开户表单">×</button></header>
      <p class="s30-dialog-note">开户免费，不用去网点。本地演示，不提交真实信息。</p>
      <label><span>姓名 <b aria-hidden="true">*</b></span><input name="name" type="text" placeholder="张小禾" required aria-describedby="s30-name-error" data-error="请填写姓名。"></label>
      <p class="demo-field-error" id="s30-name-error"></p>
      <label><span>手机号 <b aria-hidden="true">*</b></span><input name="phone" type="tel" placeholder="138 0000 0000" required minlength="11" aria-describedby="s30-phone-error" data-error="请输入 11 位手机号。"></label>
      <p class="demo-field-error" id="s30-phone-error"></p>
      <button type="submit" class="s30-submit">提交开户申请</button>
    </form>
  </dialog>
  <script type="application/json" data-s30-data>${JSON.stringify(accounts)}</script>
  <script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
