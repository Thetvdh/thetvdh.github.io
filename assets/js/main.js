// ---------------------------------------------------------------------------
// Progressive enhancement only. Everything on this site works without it.
// ---------------------------------------------------------------------------
(function () {
  "use strict";

  var root = document.documentElement;

  // -- Theme toggle: auto -> light -> dark -> auto ---------------------------
  function currentMode() {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    return stored === "light" || stored === "dark" ? stored : "auto";
  }

  function applyMode(mode, label) {
    if (mode === "auto") {
      root.removeAttribute("data-theme");
      try { localStorage.removeItem("theme"); } catch (e) {}
    } else {
      root.setAttribute("data-theme", mode);
      try { localStorage.setItem("theme", mode); } catch (e) {}
    }
    if (label) label.textContent = mode;
  }

  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    var label = toggle.querySelector("[data-theme-label]");
    var order = ["auto", "light", "dark"];
    applyMode(currentMode(), label);

    toggle.addEventListener("click", function () {
      var next = order[(order.indexOf(currentMode()) + 1) % order.length];
      applyMode(next, label);
    });
  }

  // -- Code blocks: language tag and copy button ----------------------------
  var blocks = document.querySelectorAll(".prose .highlighter-rouge");

  Array.prototype.forEach.call(blocks, function (block) {
    var match = /language-([\w+#-]+)/.exec(block.className);
    var lang = match ? match[1] : "text";
    var code = block.querySelector("code");
    if (!code) return;

    block.classList.add("codeblock");

    var bar = document.createElement("div");
    bar.className = "codeblock__bar";

    var name = document.createElement("span");
    name.className = "codeblock__lang";
    name.textContent = lang;
    bar.appendChild(name);

    if (navigator.clipboard) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "codeblock__copy";
      button.textContent = "copy";

      button.addEventListener("click", function () {
        navigator.clipboard.writeText(code.innerText).then(function () {
          button.textContent = "copied";
          setTimeout(function () { button.textContent = "copy"; }, 1600);
        });
      });

      bar.appendChild(button);
    }

    block.insertBefore(bar, block.firstChild);
  });
})();
