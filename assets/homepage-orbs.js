(() => {
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

})();
