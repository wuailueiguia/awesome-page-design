const issues = [
  { id: "vol-42", label: "Vol. 42", name: "雨夜城市", date: "2026.11.06", state: "本期", articles: [
    { title: "雨夜城市", author: "沈聿", minutes: 18, tag: "特辑", excerpt: "雨落下来的时候，整座城市都放慢了脚步。" },
    { title: "霓虹灯下的行人", author: "顾青", minutes: 12, tag: "城市", excerpt: "每个人都带着自己的故事，走过同一条街。" },
    { title: "深夜便利店手记", author: "林见川", minutes: 9, tag: "生活", excerpt: "凌晨两点的便利店，是城市最后亮着的灯。" }
  ]},
  { id: "vol-41", label: "Vol. 41", name: "深夜书房", date: "2026.10.30", state: "往期", articles: [
    { title: "深夜书房", author: "沈聿", minutes: 15, tag: "特辑", excerpt: "一盏灯，一本书，时间在这里有了形状。" },
    { title: "旧书店的灯", author: "陈默", minutes: 11, tag: "城市", excerpt: "书店打烊之后，灯还为晚归的人留着。" },
    { title: "读一本厚书的耐心", author: "顾青", minutes: 8, tag: "阅读", excerpt: "慢下来，才读得到字与字之间的意思。" }
  ]},
  { id: "vol-40", label: "Vol. 40", name: "远行手记", date: "2026.10.23", state: "往期", articles: [
    { title: "远行手记", author: "林见川", minutes: 20, tag: "特辑", excerpt: "走出去，才知道世界比地图大得多。" },
    { title: "山间的雾", author: "沈聿", minutes: 14, tag: "远行", excerpt: "雾散开的时候，山才把自己交出来。" },
    { title: "一张车票的距离", author: "陈默", minutes: 10, tag: "远行", excerpt: "有些地方，出发比到达更重要。" }
  ]}
];
function init() {
  const root = document.querySelector(".s27"), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  const issues = JSON.parse($("[data-s27-data]").textContent);
  D.bindDialogs(root);
  let current = 0;
  const saved = new Set();
  let subscribed = false;
  function draw() {
    const issue = issues[current];
    root.querySelectorAll("[data-s27-issue]").forEach((b, i) => {
      b.setAttribute("aria-pressed", String(i === current));
      b.classList.toggle("is-active", i === current);
    });
    $("[data-s27-issue-label]").textContent = `${issue.label} · ${issue.name}`;
    $("[data-s27-issue-date]").textContent = issue.date;
    $("[data-s27-list]").innerHTML = issue.articles.map((a, i) => `<article class="s27-article">
      <span class="s27-index">0${i + 1}</span>
      <div><p class="s27-tag">${D.escapeHtml(a.tag)} · ${a.minutes} 分钟</p>
      <h3>${D.escapeHtml(a.title)}</h3>
      <p class="s27-excerpt">${D.escapeHtml(a.excerpt)}</p>
      <p class="s27-author">${D.escapeHtml(a.author)}</p></div>
      <button type="button" class="s27-bookmark" data-s27-bookmark="${i}" aria-pressed="${saved.has(a.title)}">${saved.has(a.title) ? "★ 已收藏" : "☆ 收藏"}</button>
    </article>`).join("");
    $("[data-s27-saved-count]").textContent = String(saved.size);
    $("[data-s27-note]").textContent = `${issue.label} ${issue.name}：${issue.articles.length} 篇文章，${saved.size} 篇已收藏`;
  }
  root.querySelectorAll("[data-s27-issue]").forEach((b, i) => b.addEventListener("click", () => { current = i; draw(); }));
  $("[data-s27-list]").addEventListener("click", event => {
    const button = event.target.closest("[data-s27-bookmark]");
    if (!button) return;
    const article = issues[current].articles[Number(button.dataset.s27Bookmark)];
    if (saved.has(article.title)) { saved.delete(article.title); D.toast(root, `已取消收藏《${article.title}》。`); }
    else { saved.add(article.title); D.toast(root, `已收藏《${article.title}》。`); }
    draw();
  });
  D.wireForm($("[data-s27-form]"), data => {
    subscribed = true;
    const email = String(data.get("email")).trim();
    $("[data-s27-subscribe]").textContent = "已订阅 ✓";
    $("[data-s27-subscribe]").disabled = true;
    D.closeDialog($("#s27-subscribe-dialog"));
    draw();
    D.toast(root, `订阅成功，每周五深夜送到 ${email}。`);
  });
  $("[data-s27-subscribe]").addEventListener("click", () => { if (!subscribed) D.openDialog($("#s27-subscribe-dialog")); });
  draw();
}
function render() {
  return `<div class="demo-root s27">
  <header class="s27-header"><a href="#top" class="s27-brand"><span aria-hidden="true">夜</span><b>夜航</b><small>NIGHT VOYAGE</small></a>
  <nav aria-label="刊物导航"><span aria-current="page">本期</span><span>专栏</span><span>档案</span></nav>
  <button type="button" class="s27-subscribe" data-s27-subscribe>订阅本期</button></header>
  <section class="s27-hero" aria-labelledby="s27-title">
    <p class="s27-eyebrow">NIGHT CULTURE / VOL. 42</p>
    <h1 id="s27-title">在深夜，把世界读慢一点。</h1>
    <p class="s27-lede">一本深夜文化刊物。本期 12 篇文章、3 个专栏、1 个特辑：雨夜城市、深夜书房与远行。</p>
    <p class="s27-meta"><span>12 篇文章</span><span>03 个专栏</span><span>01 期特辑</span><span>每周五深夜送达</span></p>
  </section>
  <figure class="s27-cover"><img src="night-city-editorial.jpg" alt="雨夜城市：雨滴挂在窗上，窗外是黑白的夜色城市"><figcaption><span>封面 · 雨夜城市</span><span>本期特辑 / 18 分钟</span></figcaption></figure>
  <section class="s27-issues" aria-label="期号与文章">
    <header class="s27-issues-head"><h2 data-s27-issue-label>Vol. 42 · 雨夜城市</h2><span data-s27-issue-date>2026.11.06</span></header>
    <div class="s27-tabs" role="group" aria-label="选择期号">${issues.map((issue, i) => `<button type="button" data-s27-issue="${i}" aria-pressed="${i === 0}" class="${i === 0 ? "is-active" : ""}">${issue.label} · ${issue.name}</button>`).join("")}</div>
    <div class="s27-list" data-s27-list></div>
  </section>
  <footer class="s27-footer"><span role="status" aria-live="polite" data-s27-note></span><span>已收藏 <b data-s27-saved-count>0</b> 篇 · 演示数据只保存在本地</span></footer>
  <dialog class="s27-dialog" id="s27-subscribe-dialog" aria-labelledby="s27-dialog-title">
    <form data-s27-form novalidate>
      <header><div><p>SUBSCRIBE</p><h2 id="s27-dialog-title">订阅夜航</h2></div><button type="button" class="demo-close" data-demo-close aria-label="关闭订阅表单">×</button></header>
      <p class="s27-dialog-note">每周五深夜，一期文章送到你的邮箱。本地演示，不发送邮件。</p>
      <label><span>邮箱地址 <b aria-hidden="true">*</b></span><input name="email" type="email" placeholder="you@example.com" required aria-describedby="s27-email-error" data-error="请输入有效的邮箱地址。"></label>
      <p class="demo-field-error" id="s27-email-error"></p>
      <button type="submit" class="s27-submit">确认订阅</button>
    </form>
  </dialog>
  <script type="application/json" data-s27-data>${JSON.stringify(issues)}</script>
  <script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
