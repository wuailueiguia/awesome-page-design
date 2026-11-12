const presets = [
  { id: "violet", name: "紫罗兰", css: "linear-gradient(135deg, #7c3aed 0%, #a855f7 35%, #ec4899 70%, #06b6d4 100%)", stops: [
    { hex: "#7C3AED", name: "紫罗兰" }, { hex: "#A855F7", name: "淡紫" }, { hex: "#EC4899", name: "玫瑰" }, { hex: "#06B6D4", name: "青" }
  ]},
  { id: "sunset", name: "落日", css: "linear-gradient(135deg, #f97316 0%, #ec4899 35%, #f59e0b 70%, #facc15 100%)", stops: [
    { hex: "#F97316", name: "橙" }, { hex: "#EC4899", name: "玫瑰" }, { hex: "#F59E0B", name: "琥珀" }, { hex: "#FACC15", name: "亮黄" }
  ]},
  { id: "mint", name: "薄荷", css: "linear-gradient(135deg, #10b981 0%, #06b6d4 35%, #84cc16 70%, #a3e635 100%)", stops: [
    { hex: "#10B981", name: "薄荷" }, { hex: "#06B6D4", name: "青" }, { hex: "#84CC16", name: "青柠" }, { hex: "#A3E635", name: "嫩绿" }
  ]}
];
function init() {
  const root = document.querySelector(".s28"), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  const data = JSON.parse($("[data-s28-data]").textContent);
  let current = 0;
  function draw() {
    const p = data[current];
    root.querySelectorAll("[data-s28-preset]").forEach((b, i) => {
      b.setAttribute("aria-pressed", String(i === current));
      b.classList.toggle("is-active", i === current);
    });
    $("[data-s28-preview]").style.background = p.css;
    $("[data-s28-preview-name]").textContent = `${p.name} · ${p.stops.length} 个色标`;
    $("[data-s28-stops]").innerHTML = p.stops.map((s, i) => `<li><button type="button" data-s28-stop="${i}" aria-label="复制色标 ${s.hex}"><span class="s28-swatch" style="background:${s.hex}"></span><span class="s28-stop-name">${D.escapeHtml(s.name)}</span><code>${s.hex}</code><span class="s28-copy-hint">复制</span></button></li>`).join("");
    $("[data-s28-code]").textContent = `background: ${p.css};`;
    $("[data-s28-note]").textContent = `当前预设：${p.name}，共 ${data.length} 套预设、12 个色标`;
  }
  root.querySelectorAll("[data-s28-preset]").forEach((b, i) => b.addEventListener("click", () => { current = i; draw(); }));
  $("[data-s28-stops]").addEventListener("click", async event => {
    const button = event.target.closest("[data-s28-stop]");
    if (!button) return;
    const hex = data[current].stops[Number(button.dataset.s28Stop)].hex;
    const ok = await D.copy(hex);
    D.toast(root, ok ? `已复制色标 ${hex}。` : `复制失败，请手动复制 ${hex}。`);
  });
  root.querySelectorAll("[data-s28-copy]").forEach(b => b.addEventListener("click", async () => {
    const ok = await D.copy(`background: ${data[current].css};`);
    D.toast(root, ok ? `已复制 ${data[current].name} 的渐变 CSS。` : "复制失败，请手动复制下方代码。");
  }));
  draw();
}
function render() {
  return `<div class="demo-root s28">
  <header class="s28-header"><a href="#top" class="s28-brand"><span aria-hidden="true">◐</span><b>虹光</b><small>RAINBOW LIGHT</small></a>
  <nav aria-label="实验室导航"><span aria-current="page">渐变库</span><span>调色</span><span>导出</span></nav>
  <button type="button" class="s28-copy" data-s28-copy>复制渐变 CSS</button></header>
  <section class="s28-hero" aria-labelledby="s28-title">
    <p class="s28-eyebrow">GRADIENT LAB / MESH</p>
    <h1 id="s28-title">把光，调成你想要的颜色。</h1>
    <p class="s28-lede">一个渐变实验室。3 套预设、12 个色标、1 键复制 CSS：紫罗兰、落日、薄荷三套渐变随调随看。</p>
    <p class="s28-meta"><span>03 套预设</span><span>12 个色标</span><span>01 键复制</span></p>
  </section>
  <figure class="s28-inspiration"><img src="mesh-gradient-inspiration.jpg" alt="彩虹光斑渐变：紫色、粉色、青色与琥珀色丝滑流动"><figcaption><span>灵感参考 · 彩虹光斑</span><span>AI 生成示意</span></figcaption></figure>
  <section class="s28-lab" aria-label="渐变实验室">
    <div class="s28-preview" data-s28-preview><span data-s28-preview-name>紫罗兰 · 4 个色标</span></div>
    <div class="s28-tabs" role="group" aria-label="选择预设">${presets.map((p, i) => `<button type="button" data-s28-preset="${i}" aria-pressed="${i === 0}" class="${i === 0 ? "is-active" : ""}">${p.name}</button>`).join("")}</div>
    <ul class="s28-stops" data-s28-stops></ul>
    <div class="s28-code"><pre data-s28-code></pre><button type="button" data-s28-copy>复制 CSS</button></div>
  </section>
  <footer class="s28-footer"><span role="status" aria-live="polite" data-s28-note></span><span>演示数据只保存在本地 · 图片为 AI 生成示意</span></footer>
  <script type="application/json" data-s28-data>${JSON.stringify(presets)}</script>
  <script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
