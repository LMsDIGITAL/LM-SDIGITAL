// ===== EFEITO DE DIGITAÇÃO NO SUBTÍTULO =====
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  const type = setInterval(() => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(type);
    }
  }, 50);
}

// ===== ANIMAÇÃO DOS CARDS (Intersection Observer) =====
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = '0.6s ease';
  observer.observe(card);
});

// ===== ANIMAÇÃO DOS CARDS DE PORTFÓLIO =====
const portfolioCards = document.querySelectorAll('.portfolio-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

portfolioCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = `0.6s ease ${i * 0.1}s`;
  cardObserver.observe(card);
});

// ===== GARANTIR QUE O LINK DO PORTFÓLIO FUNCIONE =====
// (Não precisa de nada extra, pois o link já tem href e target)
// Mas se quiser garantir que nenhum evento pai bloqueie:
document.querySelectorAll('.btn-portfolio').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que o clique no botão seja capturado pelo card
  });
});

// ===== FECHAR MENU BOOTSTRAP AO CLICAR EM LINK (OPCIONAL) =====
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarContent');
  if (navbarCollapse) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }
});

// ===== NAVBAR SCROLL (efeito opcional) =====
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.custom-navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.9)';
  } else {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.8)';
  }
});