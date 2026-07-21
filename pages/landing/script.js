// ===== PARTÍCULAS (canvas) =====
(function particles() {
  const canvas = document.createElement('canvas');
  const container = document.getElementById('particles-js');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const count = 120;

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
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.6 + 0.2;
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
      ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
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
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 92, 231, ${0.15 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
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

// ===== TYPING EFFECT =====
const phrases = ['Crie experiências inesquecíveis.', 'Converta visitantes em clientes.', 'Acelere seu crescimento.'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typingElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 80);
  } else {
    typingElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 500);
      return;
    }
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
        if (progress < 1) requestAnimationFrame(updateCounter);
        else el.textContent = isFloat ? target.toFixed(1) : target;
      }
      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== CARDS REVEAL (scroll) =====
const cards = document.querySelectorAll('.card-glass');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(c => cardObserver.observe(c));

// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
const totalSlides = track.children.length;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});
// Autoplay
let autoSlide = setInterval(() => { nextBtn.click(); }, 5000);
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => { nextBtn.click(); }, 5000);
});

// ===== FORMULÁRIO =====
const form = document.getElementById('ctaForm');
const msg = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!nome || !email) {
    msg.textContent = 'Preencha todos os campos.';
    msg.className = 'form-message error';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    msg.textContent = 'E-mail inválido.';
    msg.className = 'form-message error';
    return;
  }
  msg.textContent = '✅ Enviado com sucesso! Entraremos em contato.';
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
// Fecha ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});