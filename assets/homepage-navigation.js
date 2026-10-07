document.querySelectorAll('a[href="#about"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById('about');
    if (!target) return;
    event.preventDefault();
    if (window.location.hash !== '#about') window.history.pushState(null, '', '#about');
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
});
