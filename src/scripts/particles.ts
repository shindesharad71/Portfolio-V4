export function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animId: number;
  let mouseX = -1000, mouseY = -1000;
  const PARTICLE_COUNT = 70;
  const LINE_DISTANCE = 120;
  const MOUSE_RADIUS = 100;

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number;
  }

  let particles: Particle[] = [];
  let w = 0, h = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = canvas.width = rect.width * devicePixelRatio;
    h = canvas.height = rect.height * devicePixelRatio;
    ctx!.scale(devicePixelRatio, devicePixelRatio);
  }

  function createParticles() {
    const rect = canvas.getBoundingClientRect();
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 1,
    }));
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    const rw = rect.width, rh = rect.height;
    ctx!.clearRect(0, 0, rw, rh);

    for (const p of particles) {
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.5;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = rw;
      if (p.x > rw) p.x = 0;
      if (p.y < 0) p.y = rh;
      if (p.y > rh) p.y = 0;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(113, 113, 122, 0.3)';
      ctx!.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DISTANCE) {
          ctx!.beginPath();
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particles[j].x, particles[j].y);
          ctx!.strokeStyle = `rgba(113, 113, 122, ${0.08 * (1 - dist / LINE_DISTANCE)})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animId = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(animId);
    }
  }, { threshold: 0 });

  resize();
  createParticles();
  observer.observe(canvas);

  canvas.closest('section')?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e as MouseEvent).clientX - rect.left;
    mouseY = (e as MouseEvent).clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  return () => {
    cancelAnimationFrame(animId);
    observer.disconnect();
  };
}
