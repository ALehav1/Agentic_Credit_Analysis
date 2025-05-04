// Static fallback JS for CoreWeave analysis demo. Copied from project root for demo safety.

document.addEventListener('DOMContentLoaded', function () {
  // Collapsible panels
  document.querySelectorAll('.collapsible h2').forEach(function (header) {
    header.addEventListener('click', function () {
      const section = header.parentElement;
      section.classList.toggle('open');
    });
  });

  // --- Robust Sidebar Navigation & Scrollspy ---
  // All sidebar navigation logic is now centralized here for auditability and maintenance.
  // Only one handler per event; debug logs for every navigation event.

  // Sidebar navigation active state & smooth scroll
  const navLinks = Array.from(document.querySelectorAll('#sidebar nav ul li a'));
  const sections = navLinks.map(link => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (!section) {
      console.error('[NAV DEBUG] No section found for id:', id);
    }
    return section;
  });

  // Remove any existing active classes
  navLinks.forEach(link => link.classList.remove('active'));

  // Robust scrollspy logic
  function setActiveLink() {
    let index = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
      if (!sections[i]) continue;
      if (window.scrollY + 60 < sections[i].offsetTop) {
        index = i - 1;
        break;
      }
    }
    navLinks.forEach(link => link.classList.remove('active'));
    if (index >= 0 && navLinks[index]) navLinks[index].classList.add('active');
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // Smooth scroll handler (idempotent)
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      try {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 20,
            behavior: 'smooth'
          });
          console.log(`[NAV DEBUG] Navigated to section: ${targetId}`);
        } else {
          console.error('[NAV DEBUG] Sidebar nav error: target section not found for', targetId);
        }
      } catch (err) {
        console.error('[NAV DEBUG] Sidebar nav JS error:', err);
      }
    });
  });

  // Hashchange handler for repeatable navigation
  window.addEventListener('hashchange', function () {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 20,
            behavior: 'smooth'
          });
          console.log(`[NAV DEBUG] Hashchange navigation to: ${hash}`);
        }
      }
    } catch (err) {
      console.error('[NAV DEBUG] Sidebar nav hashchange JS error:', err);
    }
  });

  // Initial debug log
  console.log('[NAV DEBUG] Sidebar navigation initialized.');
});
