(function () {
  window.scrollTo(0, 0);
  window.addEventListener('load', function () { window.scrollTo(0, 0); });
  window.addEventListener('DOMContentLoaded', function () { window.scrollTo(0, 0); });
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });

  document.querySelectorAll('.nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
    });
  });
})();
