(function () {
  var select = document.getElementById('projectSelect');
  var custom = document.getElementById('projectSelectCustom');
  var trigger = document.getElementById('projectSelectTrigger');
  var list = document.getElementById('projectSelectList');
  var valueEl = custom && custom.querySelector('.project-select-value');
  var options = list ? list.querySelectorAll('.project-select-option') : [];
  var panels = document.querySelectorAll('.project-full');
  if (!panels.length) return;

  function showProject(index) {
    var i = Math.max(0, Math.min(index, panels.length - 1));
    panels.forEach(function (panel, idx) {
      if (idx === i) {
        panel.classList.add('is-active');
        panel.removeAttribute('hidden');
      } else {
        panel.classList.remove('is-active');
        panel.setAttribute('hidden', '');
      }
    });
    if (select) select.value = String(i);
    if (valueEl && options[i]) valueEl.textContent = options[i].textContent;
    options.forEach(function (opt, idx) {
      opt.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
    if (custom) custom.classList.remove('is-open');
    if (list) list.setAttribute('aria-hidden', 'true');
    var tabs = document.querySelectorAll('.projects-tab');
    tabs.forEach(function (tab, idx) {
      if (idx === i) {
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-selected', 'false');
      }
    });
  }

  function closeDropdown() {
    if (custom) custom.classList.remove('is-open');
    if (list) list.setAttribute('aria-hidden', 'true');
  }

  if (trigger && list) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = custom.classList.toggle('is-open');
      list.setAttribute('aria-hidden', open ? 'false' : 'true');
      custom.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  options.forEach(function (opt, index) {
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      if (select) {
        select.value = String(index);
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      showProject(index);
    });
  });

  document.addEventListener('click', function () {
    closeDropdown();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdown();
  });
  if (custom) custom.addEventListener('click', function (e) { e.stopPropagation(); });

  if (select) {
    select.addEventListener('change', function () {
      showProject(parseInt(select.value, 10));
    });
  }

  var tabs = document.querySelectorAll('.projects-tab');
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      showProject(index);
    });
  });

  showProject(0);
})();
