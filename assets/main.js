(() => {
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 220);
  });

  const reveals = document.querySelectorAll('.reveal, .scale-reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  const progress = document.querySelector('.scroll-progress > span');
  const sections = [...document.querySelectorAll('[data-section]')];
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    if (progress) progress.style.width = `${pct}%`;

    const y = window.scrollY + window.innerHeight * 0.32;
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= y) current = section.id;
    }
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  menuBtn?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });
  navLinks.forEach((link) => link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }));

  const measureNodes = [...document.querySelectorAll('.measure-dot')];
  let loopTimer;
  const loopSection = document.querySelector('#validation');
  if (loopSection && measureNodes.length) {
    const animateLoop = () => {
      let idx = 0;
      clearInterval(loopTimer);
      measureNodes.forEach(n => n.classList.remove('is-active'));
      measureNodes[0].classList.add('is-active');
      loopTimer = window.setInterval(() => {
        measureNodes.forEach(n => n.classList.remove('is-active'));
        idx = (idx + 1) % measureNodes.length;
        measureNodes[idx].classList.add('is-active');
      }, 950);
    };
    const loopObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) animateLoop(); else clearInterval(loopTimer);
    }, { threshold: .35 });
    loopObserver.observe(loopSection);
  }
})();
