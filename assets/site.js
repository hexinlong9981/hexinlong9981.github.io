// 简历页面的共用脚本：明暗主题、日语注音的显示切换、手机导航、当前章节高亮。
(function () {
  var root = document.documentElement;
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // 主题：auto → 跟随系统；light / dark → 固定
  var theme = load("resume-theme");
  if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme);

  // 注音：在页面绘制前恢复上次的选择
  if (load("resume-no-furi") === "1") root.classList.add("no-furi");
  if (load("resume-no-eng") === "1") root.classList.add("no-eng");

  document.addEventListener("DOMContentLoaded", function () {
    var themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var dark = root.getAttribute("data-theme") === "dark" ||
          (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
        var next = dark ? "light" : "dark";
        root.setAttribute("data-theme", next);
        save("resume-theme", next);
      });
    }

    [["furi-btn", "no-furi", "resume-no-furi"], ["eng-btn", "no-eng", "resume-no-eng"]].forEach(function (t) {
      var btn = document.getElementById(t[0]);
      if (!btn) return;
      function sync() { btn.classList.toggle("on", !root.classList.contains(t[1])); }
      sync();
      btn.addEventListener("click", function () {
        root.classList.toggle(t[1]);
        save(t[2], root.classList.contains(t[1]) ? "1" : "0");
        sync();
      });
    });

    // 手机：☰ 打开导航，点链接或点外侧关闭
    var menuBtn = document.getElementById("menu-btn");
    var nav = document.querySelector("nav.side");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function (e) { e.stopPropagation(); root.classList.toggle("nav-open"); });
      nav.addEventListener("click", function (e) { if (e.target.closest("li a")) root.classList.remove("nav-open"); });
      document.addEventListener("click", function (e) {
        if (root.classList.contains("nav-open") && !nav.contains(e.target)) root.classList.remove("nav-open");
      });
    }

    // 当前章节高亮
    var links = Array.prototype.slice.call(document.querySelectorAll('nav.side li a[href^="#"]'));
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    function mark() {
      var cur = 0;
      sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < 120) cur = i; });
      if (innerHeight + scrollY >= document.body.scrollHeight - 4) cur = sections.length - 1;
      links.forEach(function (a, i) { a.classList.toggle("current", i === cur); });
    }
    addEventListener("scroll", mark, { passive: true });
    mark();
  });
})();
