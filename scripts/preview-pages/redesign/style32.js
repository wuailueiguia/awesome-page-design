const levels = [
  { id: "l1", name: "第 1 关 · 打招呼", done: 5, total: 5, state: "done", badge: "🏅 开口先锋" },
  { id: "l2", name: "第 2 关 · 点餐", done: 3, total: 5, state: "active", badge: "🍔 美食家" },
  { id: "l3", name: "第 3 关 · 问路", done: 0, total: 5, state: "locked", badge: "🧭 方向感" }
];
const board = [
  { name: "小禾", score: 1280, me: true },
  { name: "阿哲", score: 1150, me: false },
  { name: "米娅", score: 980, me: false }
];
function init() {
  const root = document.querySelector(".s32"), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  const data = JSON.parse($("[data-s32-data]").textContent);
  let streak = 7;
  function draw() {
    $("[data-s32-levels]").innerHTML = data.levels.map((lv, i) => {
      const pct = Math.round(lv.done / lv.total * 100);
      const locked = lv.state === "locked";
      const done = lv.state === "done";
      return `<article class="s32-level ${lv.state}">
      <p class="s32-level-tag">${done ? "已完成 ✓" : locked ? "未解锁 🔒" : "进行中"}</p>
      <h3>${D.escapeHtml(lv.name)}</h3>
      <p class="s32-progress"><span class="s32-bar"><i style="width:${pct}%"></i></span><b>${lv.done}/${lv.total} 题</b></p>
      <p class="s32-badge">${D.escapeHtml(lv.badge)}</p>
      <button type="button" data-s32-play="${i}" ${locked ? "disabled" : ""}>${done ? "再练一次" : "开始闯关"}</button>
    </article>`;
    }).join("");
    $("[data-s32-board]").innerHTML = data.board.map((p, i) => `<li class="${p.me ? "me" : ""}"><span class="s32-rank">${i + 1}</span><span>${D.escapeHtml(p.name)}</span><strong>${p.score} 分</strong></li>`).join("");
    $("[data-s32-streak]").textContent = String(streak);
    $("[data-s32-note]").textContent = `连学 ${streak} 天 · 3 个关卡 · 3 个徽章 · 演示数据只保存在本地`;
  }
  $("[data-s32-levels]").addEventListener("click", event => {
    const button = event.target.closest("[data-s32-play]");
    if (!button) return;
    const lv = data.levels[Number(button.dataset.s32Play)];
    if (lv.state === "locked") return;
    if (lv.done < lv.total) {
      lv.done += 1;
      if (lv.done === lv.total) {
        lv.state = "done";
        streak += 1;
        const next = data.levels[Number(button.dataset.s32Play) + 1];
        if (next && next.state === "locked") next.state = "active";
        D.toast(root, `通关！「${lv.name}」完成，获得徽章 ${lv.badge}，连学 ${streak} 天。`);
      } else {
        D.toast(root, `答对一题！「${lv.name}」进度 ${lv.done}/${lv.total}。`);
      }
    } else {
      D.toast(root, `「${lv.name}」已通关，再练一次巩固一下吧。`);
    }
    draw();
  });
  draw();
}
function render() {
  return `<div class="demo-root s32">
  <header class="s32-header"><a href="#top" class="s32-brand"><span aria-hidden="true">跃</span><b>跃学</b><small>YUE XUE</small></a>
  <nav aria-label="学习导航"><span aria-current="page">课程</span><span>排行榜</span><span>我的</span></nav>
  <span class="s32-streak-chip">🔥 连学 <b data-s32-streak>7</b> 天</span></header>
  <section class="s32-hero" aria-labelledby="s32-title">
    <p class="s32-eyebrow">LANGUAGE LEARNING / GAMIFIED</p>
    <h1 id="s32-title">每天 10 分钟，英语越学越上瘾。</h1>
    <p class="s32-lede">跃学是一款游戏化语言学习应用。3 个关卡、3 个徽章、1 条连击：今天已连学 7 天，差 1 关升到下一级。</p>
    <p class="s32-meta"><span>03 个关卡</span><span>03 个徽章</span><span>07 天连击</span></p>
  </section>
  <figure class="s32-shot"><img src="gamified-flat-learning.jpg" alt="俏皮扁平插画：黄色方块、青色对话气泡与星星"><figcaption><span>跃学 · 今日关卡</span><span>AI 生成示意</span></figcaption></figure>
  <section class="s32-levels" aria-label="今日关卡">
    <h2>今日关卡</h2>
    <div class="s32-grid" data-s32-levels></div>
  </section>
  <section class="s32-board" aria-label="本周排行榜">
    <h2>本周排行榜</h2>
    <ol data-s32-board></ol>
  </section>
  <footer class="s32-footer"><span role="status" aria-live="polite" data-s32-note></span><span>图片为 AI 生成示意</span></footer>
  <script type="application/json" data-s32-data>${JSON.stringify({ levels, board })}</script>
  <script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
