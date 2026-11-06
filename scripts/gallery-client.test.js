const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { renderGallery } = require("./preview-gallery");
const { buildStylePrompt } = require("./preview-prompts");
const { allStyles } = require("./preview-catalog");

// Exercise the actual offline script with a small DOM adapter. This verifies
// state and clipboard behavior; browser rendering is a separate visual check.
function openGallery({ writeText = async () => {}, fallbackCopy = false } = {}) {
  const html = renderGallery();
  const nodes = [];
  const events = {};
  const stored = new Map();
  let focused = null;
  let selected = null;
  function node(tag, attrs = {}) {
    const item = {
      tag, attrs, id: attrs.id, dataset: {}, style: {}, events: {}, value: "", textContent: "", innerHTML: "", open: false,
      setAttribute(key, value) { this.attrs[key] = value; },
      addEventListener(key, handler) { this.events[key] = handler; },
      closest(selector) { return selector === "button" && tag === "button" ? this : selector === "dialog" ? document.getElementById("detail-dialog") : null; },
      focus() { focused = this; },
      select() { selected = this.value; },
      appendChild(child) { child.parentElement = this; },
      remove() { this.parentElement = null; },
      showModal() { this.open = true; },
      close() { this.open = false; this.events.close?.(); },
      querySelector(selector) { return selector === "img" ? this.image : null; },
    };
    for (const [key, value] of Object.entries(attrs)) if (key.startsWith("data-")) {
      item.dataset[key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value;
    }
    return item;
  }
  for (const match of html.slice(0, html.indexOf('<script id="gallery-data"')).matchAll(/<([a-z][\w-]*)\b([^>]*)>/g)) {
    const attrs = Object.fromEntries([...match[2].matchAll(/([\w:-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] || ""]));
    nodes.push(node(match[1], attrs));
  }
  function matches(item, selector) {
    if (!selector.startsWith("[")) return item.tag === selector;
    const parts = [...selector.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)];
    return parts.every(([, key, value]) => key in item.attrs && (value === undefined || item.attrs[key] === value));
  }
  const document = {
    documentElement: {}, body: node("body"),
    getElementById: (id) => nodes.find((item) => item.id === id),
    querySelectorAll: (selector) => nodes.filter((item) => matches(item, selector)),
    querySelector: (selector) => nodes.find((item) => matches(item, selector)),
    addEventListener: (key, handler) => { events[key] = handler; },
    createElement: (tag) => node(tag),
    contains: (item) => nodes.includes(item),
    execCommand: () => fallbackCopy,
  };
  for (const card of document.querySelectorAll("[data-style-card]")) card.image = node("img");
  const payload = node("script", { id: "gallery-data" });
  payload.textContent = html.match(/<script id="gallery-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
  nodes.push(payload);
  const location = { href: "file:///preview/index.html?style=09", search: "?style=09" };
  const context = vm.createContext({
    document, location, URL, URLSearchParams,
    history: { replaceState(_state, _title, url) { location.href = String(url); } },
    localStorage: { getItem: (key) => stored.get(key), setItem: (key, value) => stored.set(key, value) },
    navigator: { clipboard: { writeText } }, setTimeout: () => 0, clearTimeout: () => {},
  });
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  vm.runInContext(script, context);
  return {
    get: document.getElementById, stored,
    click(selector) {
      const target = selector.startsWith("#") ? document.getElementById(selector.slice(1)) : document.querySelector(selector);
      assert.ok(target, `Missing control: ${selector}`);
      events.click({ target });
      return target.events.click?.({ target });
    },
    brief(value) { const field = document.getElementById("task-brief"); field.value = value; field.events.input(); },
    get focused() { return focused; },
    get selected() { return selected; },
  };
}

test("task and brief survive changing styles and language; copied text matches the visible prompt", async () => {
  let copied;
  const page = openGallery({ writeText: async (text) => { copied = text; } });
  page.click('[data-prompt-kind="system"]');
  const brief = '为仓储团队建设预约与归还流程，使用 Vue。\n<script>userText()</script>';
  page.brief(brief);
  page.get("detail-dialog").close();
  page.click('[data-open-style="02"]');
  assert.equal(page.get("task-brief").value, brief);
  assert.equal(page.get("copy-prompt").textContent, "复制新系统");
  assert.equal(page.get("prompt-output").textContent, `用户任务:\n${brief}\n\n${buildStylePrompt(allStyles.find((s) => s.id === "02"), "zh", "system")}`);
  assert.equal(page.get("prompt-output").innerHTML, "", "brief must be inserted as text, never HTML");
  page.click('[data-lang="en"]');
  assert.equal(page.get("task-brief").value, brief);
  assert.equal(page.get("copy-prompt").textContent, "Copy New System");
  await page.click("#copy-prompt");
  assert.equal(copied, page.get("prompt-output").textContent);
  assert.equal(copied, `User task:\n${brief}\n\n${buildStylePrompt(allStyles.find((s) => s.id === "02"), "en", "system")}`);
  assert.match(page.get("status").textContent, /New system/);
  assert.deepEqual([...page.stored.entries()], [["apd-language", "en"]], "the task must never be persisted");
});

test("existing UI is distinct from new-system planning and an empty brief leaves its prompt unchanged", async () => {
  let copied;
  const page = openGallery({ writeText: async (text) => { copied = text; } });
  page.click('[data-prompt-kind="refine"]');
  page.brief("  \n ");
  await page.click("#copy-prompt");
  assert.equal(copied, buildStylePrompt(allStyles.find((s) => s.id === "09"), "zh", "refine"));
  assert.equal(page.get("copy-prompt").textContent, "复制界面优化提示词");
  assert.match(page.get("status").textContent, /已有界面/);
  assert.ok(!copied.includes("新系统建设："));
});

test("clipboard denial falls back to the same prompt and exposes manual copying if both APIs fail", async () => {
  const fail = async () => { throw new Error("Clipboard unavailable"); };
  for (const fallbackCopy of [true, false]) {
    const page = openGallery({ writeText: fail, fallbackCopy });
    page.click('[data-prompt-kind="admin"]');
    page.brief("保留现有组件，建设器材管理后台。");
    const visible = page.get("prompt-output").textContent;
    await page.click("#copy-prompt");
    assert.equal(page.selected, visible);
    assert.equal(page.get("prompt-disclosure").open, !fallbackCopy);
    assert.equal(page.focused, page.get(fallbackCopy ? "copy-prompt" : "prompt-output"));
    assert.equal(page.get("prompt-output").textContent, visible);
  }
});

test("a pending clipboard operation reports the task that was actually copied", async () => {
  let finish;
  let copied;
  const page = openGallery({ writeText: (text) => { copied = text; return new Promise((resolve) => { finish = resolve; }); } });
  page.click('[data-prompt-kind="system"]');
  const original = page.get("prompt-output").textContent;
  const copying = page.click("#copy-prompt");
  page.click('[data-prompt-kind="refine"]');
  finish();
  await copying;
  assert.equal(copied, original);
  assert.equal(page.get("copy-prompt").textContent, "复制界面优化提示词");
  assert.match(page.get("status").textContent, /「新系统」/);
});
