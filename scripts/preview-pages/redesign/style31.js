const routes = [
  { id: "mist", name: "山间的雾", days: "3 天 2 晚", price: "¥2,480 起", excerpt: "雾散开的时候，山才把自己交出来。", note: "湖边木屋 · 每日徒步 6 公里" },
  { id: "sea", name: "海边的风", days: "2 天 1 晚", price: "¥1,860 起", excerpt: "海风一吹，时间就慢了下来。", note: "渔村小院 · 日出观景台" },
  { id: "ticket", name: "一张车票的距离", days: "5 天 4 晚", price: "¥3,200 起", excerpt: "有些地方，出发比到达更重要。", note: "绿皮火车 · 三座小城" }
];
function init() {
  const root = document.querySelector(".s31"), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  const data = JSON.parse($("[data-s31-data]").textContent);
  D.bindDialogs(root);
  const saved = new Set();
  function draw() {
    $("[data-s31-routes]").innerHTML = data.map((r, i) => `<article class="s31-route">
      <p class="s31-route-tag">${D.escapeHtml(r.days)} · ${D.escapeHtml(r.price)}</p>
      <h3>${D.escapeHtml(r.name)}</h3>
      <p class="s31-excerpt">${D.escapeHtml(r.excerpt)}</p>
      <p class="s31-note">${D.escapeHtml(r.note)}</p>
      <button type="button" class="s31-save" data-s31-save="${i}" aria-pressed="${saved.has(r.name)}">${saved.has(r.name) ? "★ 已收藏" : "☆ 收藏路线"}</button>
    </article>`).join("");
    $("[data-s31-saved-count]").textContent = String(saved.size);
    $("[data-s31-note]").textContent = `3 条路线，${saved.size} 条已收藏 · 演示数据只保存在本地`;
  }
  $("[data-s31-routes]").addEventListener("click", event => {
    const button = event.target.closest("[data-s31-save]");
    if (!button) return;
    const route = data[Number(button.dataset.s31Save)];
    if (saved.has(route.name)) { saved.delete(route.name); D.toast(root, `已取消收藏「${route.name}」。`); }
    else { saved.add(route.name); D.toast(root, `已收藏「${route.name}」，出发前再翻出来。`); }
    draw();
  });
  D.wireForm($("[data-s31-form]"), formData => {
    const route = String(formData.get("route"));
    const date = String(formData.get("date"));
    const people = String(formData.get("people"));
    D.closeDialog($("#s31-plan-dialog"));
    D.toast(root, `行程单已生成：${route}，${date} 出发，${people} 人。`);
    $("[data-s31-plan]").textContent = "行程单已生成 ✓";
  });
  $("[data-s31-plan]").addEventListener("click", () => D.openDialog($("#s31-plan-dialog")));
  draw();
}
function render() {
  return `<div class="demo-root s31">
  <header class="s31-header"><a href="#top" class="s31-brand"><span aria-hidden="true">远</span><b>远行</b><small>YUANXING</small></a>
  <nav aria-label="杂志导航"><span aria-current="page">目的地</span><span>行程</span><span>手记</span></nav>
  <button type="button" class="s31-plan" data-s31-plan>规划我的行程</button></header>
  <section class="s31-hero" aria-labelledby="s31-title">
    <p class="s31-eyebrow">TRAVEL MAGAZINE / ISSUE 12</p>
    <h1 id="s31-title">走出去，世界就大了起来。</h1>
    <p class="s31-lede">远行是一本旅行杂志。3 条路线、3 篇手记、1 份行程单：山间的雾、海边的风与一张车票的距离。</p>
    <p class="s31-meta"><span>03 条路线</span><span>03 篇手记</span><span>01 份行程单</span></p>
  </section>
  <figure class="s31-cover"><img src="travel-misty-mountains.jpg" alt="清晨山间湖泊：雾气缭绕的山谷与一艘木船"><figcaption><span>封面 · 山间的雾</span><span>本期特辑 / 3 天 2 晚</span></figcaption></figure>
  <section class="s31-routes" aria-label="本期路线">
    <header class="s31-routes-head"><h2>本期路线</h2><span>已收藏 <b data-s31-saved-count>0</b> 条</span></header>
    <div class="s31-grid" data-s31-routes></div>
  </section>
  <footer class="s31-footer"><span role="status" aria-live="polite" data-s31-note></span><span>图片为 AI 生成示意</span></footer>
  <dialog class="s31-dialog" id="s31-plan-dialog" aria-labelledby="s31-dialog-title">
    <form data-s31-form novalidate>
      <header><div><p>PLAN A TRIP</p><h2 id="s31-dialog-title">生成我的行程单</h2></div><button type="button" class="demo-close" data-demo-close aria-label="关闭行程表单">×</button></header>
      <p class="s31-dialog-note">选好路线、日期与人数，行程单就生成好了。本地演示，不发送信息。</p>
      <label><span>路线 <b aria-hidden="true">*</b></span><select name="route" required aria-describedby="s31-route-error">
        <option value="">请选择一条路线</option>
        ${routes.map(r => `<option>${r.name}</option>`).join("")}
      </select></label>
      <p class="demo-field-error" id="s31-route-error"></p>
      <label><span>出发日期 <b aria-hidden="true">*</b></span><input name="date" type="date" required aria-describedby="s31-date-error" data-error="请选择出发日期。"></label>
      <p class="demo-field-error" id="s31-date-error"></p>
      <label><span>人数 <b aria-hidden="true">*</b></span><input name="people" type="number" min="1" max="12" value="2" required aria-describedby="s31-people-error" data-error="请输入 1–12 人。"></label>
      <p class="demo-field-error" id="s31-people-error"></p>
      <button type="submit" class="s31-submit">生成行程单</button>
    </form>
  </dialog>
  <script type="application/json" data-s31-data>${JSON.stringify(routes)}</script>
  <script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
