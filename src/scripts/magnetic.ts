export function initMagnetic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  const elements = document.querySelectorAll('.cta, .footer-link-item, .nav-link');

  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;

    htmlEl.addEventListener('mousemove', (e) => {
      const rect = htmlEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;

      if (distance < maxDistance) {
        const scale = 0.3;
        htmlEl.style.transform = `translate(${x * scale}px, ${y * scale}px)`;
      }
    });

    htmlEl.addEventListener('mouseleave', () => {
      htmlEl.style.transform = '';
      htmlEl.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { htmlEl.style.transition = ''; }, 500);
    });
  });
}
