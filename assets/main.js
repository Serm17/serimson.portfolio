(() => {
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 220);
  });

  // Random hero orbs — 2 to 5 on every page load
  const orbLayer = document.querySelector('.hero-orbs');
  if (orbLayer) {
    const count = Math.floor(Math.random() * 4) + 2;
    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < count; i += 1) {
      const orb = document.createElement('span');
      orb.className = 'hero-orb';

      const size = randomBetween(70, 230);
      const dx = randomBetween(18, 34) * (Math.random() < .5 ? -1 : 1);
      const dy = randomBetween(12, 25) * (Math.random() < .5 ? -1 : 1);

      orb.style.setProperty('--size', `${size}px`);
      orb.style.setProperty('--x', `${randomBetween(4, 90)}%`);
      orb.style.setProperty('--y', `${randomBetween(5, 84)}%`);
      orb.style.setProperty('--dx', `${dx}vw`);
      orb.style.setProperty('--dy', `${dy}vh`);
      orb.style.setProperty('--duration', `${randomBetween(8, 16)}s`);
      orb.style.setProperty('--delay', `${randomBetween(-8, 0)}s`);
      orb.style.setProperty('--alpha', randomBetween(.05, .13).toFixed(2));
      orb.style.setProperty('--blur', `${randomBetween(0, 8)}px`);

      orbLayer.appendChild(orb);
    }
  }

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
