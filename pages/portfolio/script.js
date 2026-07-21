// ===== PARTÍCULAS =====
(function particles() {
  const canvas = document.createElement('canvas');
  const container = document.getElementById('particles-js');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const count = 100;

  function resize() {
    w = canvas.width = container.offsetWidth;
    h = canvas.height = container.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '108, 92, 231' : '253, 203, 110';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w) this.speedX *= -1;
      if (this.y < 0 || this.y > h) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(253, 203, 110, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== FILTROS =====
const filtroBtns = document.querySelectorAll('.filtro-btn');
const projetos = document.querySelectorAll('.projeto-item');

filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projetos.forEach(proj => {
      const categoria = proj.getAttribute('data-categoria');
      if (filter === 'todos' || categoria === filter) {
        proj.classList.remove('hidden');
        setTimeout(() => proj.classList.add('visible'), 50);
      } else {
        proj.classList.remove('visible');
        setTimeout(() => proj.classList.add('hidden'), 300);
      }
    });
  });
});

// ===== REVELAR PROJETOS AO SCROLL =====
const projetoObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 100);
      projetoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
projetos.forEach(proj => projetoObserver.observe(proj));

// ===== SKILLS (círculos animados) =====
const skillCircles = document.querySelectorAll('.skill-circle');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circle = entry.target;
      const percent = circle.getAttribute('data-percent');
      circle.style.setProperty('--percent', percent);
      circle.classList.add('animated');
      skillObserver.unobserve(circle);
    }
  });
}, { threshold: 0.5 });
skillCircles.forEach(c => skillObserver.observe(c));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const closeBtn = document.getElementById('lightboxClose');
const lbTitulo = document.getElementById('lbTitulo');
const lbDesc = document.getElementById('lbDesc');
const lbTech = document.getElementById('lbTech');
const lbLink = document.getElementById('lbLink');

const projetosData = [
  {
    titulo: 'E‑commerce Nexus',
    desc: 'Plataforma completa de e-commerce com inteligência artificial para recomendação de produtos, painel administrativo e integração com principais meios de pagamento.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  },
  {
    titulo: 'App FitLife',
    desc: 'Aplicativo mobile de treinos personalizados com gamificação, sistema de metas, integração com wearables e comunidade social.',
    tech: ['Flutter', 'Firebase', 'GraphQL'],
    link: '#'
  },
  {
    titulo: 'Dashboard Analytics',
    desc: 'Interface intuitiva para visualização de dados complexos em tempo real, com gráficos interativos, filtros avançados e exportação de relatórios.',
    tech: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
    link: '#'
  },
  {
    titulo: 'Arquitetura Virtual',
    desc: 'Tour 3D interativo de imóveis com realidade aumentada, permitindo visualização de plantas baixas em 360° e personalização de acabamentos.',
    tech: ['Three.js', 'WebGL', 'Unity', 'ARCore'],
    link: '#'
  },
  {
    titulo: 'Blog TechMind',
    desc: 'Plataforma de conteúdo focada em inteligência artificial e tecnologia, com sistema de assinaturas, newsletters e recomendações baseadas em leitura.',
    tech: ['Next.js', 'Tailwind', 'Strapi', 'Algolia'],
    link: '#'
  },
  {
    titulo: 'EcoTrack',
    desc: 'Aplicativo de monitoramento sustentável com integração IoT para coleta de dados ambientais em tempo real, gerando relatórios e alertas.',
    tech: ['React Native', 'AWS IoT', 'Node.js', 'MongoDB'],
    link: '#'
  }
];

document.querySelectorAll('.btn-detalhes').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const index = parseInt(btn.getAttribute('data-projeto'));
    const projeto = projetosData[index];
    lbTitulo.textContent = projeto.titulo;
    lbDesc.textContent = projeto.desc;
    lbTech.innerHTML = projeto.tech.map(t => `<span>${t}</span>`).join('');
    lbLink.href = projeto.link;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Fechar lightbox
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== FORMULÁRIO =====
const form = document.getElementById('contatoForm');
const msg = document.getElementById('formMessageContato');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeContato').value.trim();
  const email = document.getElementById('emailContato').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    msg.textContent = 'Preencha todos os campos.';
    msg.className = 'form-message error';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    msg.textContent = 'E-mail inválido.';
    msg.className = 'form-message error';
    return;
  }
  msg.textContent = '✅ Mensagem enviada! Entraremos em contato em breve.';
  msg.className = 'form-message success';
  form.reset();
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER =====
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});