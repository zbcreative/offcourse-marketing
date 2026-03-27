(function () {
  function initNav() {
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

    function onToggle(e) {
      e.stopPropagation();
      if (document.body.classList.contains('nav-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // iOS WebKit: empty touch listener makes fixed controls reliably receive taps
    btn.addEventListener('touchstart', function () {}, { passive: true });

    btn.addEventListener('click', onToggle);

    var links = nav.querySelectorAll('.nav-center a, .nav-end a');
    var i;
    for (i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    window.addEventListener(
      'resize',
      function () {
        if (window.innerWidth > 900) closeMenu();
      },
      { passive: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
