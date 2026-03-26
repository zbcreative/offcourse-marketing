(function () {
  var btn = document.getElementById('nav-hamburger');
  var nav = document.querySelector('.site-nav');
  if (!btn || !nav) return;

  function openMenu() {
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
  }

  btn.addEventListener('click', function () {
    if (document.body.classList.contains('nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll('.nav-center a, .nav-end a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
})();
