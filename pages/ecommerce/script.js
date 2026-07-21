// ===== DADOS DOS PRODUTOS =====
const produtos = [
  { id: 1, nome: 'Smartphone X10', categoria: 'eletronicos', preco: 2499.99, emoji: '📱' },
  { id: 2, nome: 'Fone Bluetooth Pro', categoria: 'acessorios', preco: 349.90, emoji: '🎧' },
  { id: 3, nome: 'Smartwatch Fit 3', categoria: 'smart', preco: 599.00, emoji: '⌚' },
  { id: 4, nome: 'Notebook Gamer', categoria: 'eletronicos', preco: 5499.00, emoji: '💻' },
  { id: 5, nome: 'Carregador Turbo', categoria: 'acessorios', preco: 89.90, emoji: '🔋' },
  { id: 6, nome: 'Smart Speaker', categoria: 'smart', preco: 399.00, emoji: '🔊' },
  { id: 7, nome: 'Tablet Pro 12', categoria: 'eletronicos', preco: 1899.00, emoji: '📟' },
  { id: 8, nome: 'Capa Protetora', categoria: 'acessorios', preco: 49.90, emoji: '🛡️' },
  { id: 9, nome: 'Lâmpada Inteligente', categoria: 'smart', preco: 129.90, emoji: '💡' },
  { id: 10, nome: 'Drone Mini', categoria: 'eletronicos', preco: 799.00, emoji: '🛸' },
];

// ===== ELEMENTOS =====
const grid = document.getElementById('produtosGrid');
const filtros = document.querySelectorAll('.filtro-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');

// ===== ESTADO =====
let carrinho = [];
let produtosFiltrados = [...produtos];
let currentCategory = 'todos';

// ===== RENDERIZAR PRODUTOS =====
function renderProdutos() {
  const busca = searchInput.value.toLowerCase().trim();
  let filtrados = produtos;

  // Filtro por categoria
  if (currentCategory !== 'todos') {
    filtrados = filtrados.filter(p => p.categoria === currentCategory);
  }

  // Filtro por busca
  if (busca) {
    filtrados = filtrados.filter(p =>
      p.nome.toLowerCase().includes(busca) ||
      p.categoria.includes(busca)
    );
  }

  produtosFiltrados = filtrados;

  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#8080a0; padding:40px 0;">Nenhum produto encontrado.</p>`;
    return;
  }

  grid.innerHTML = filtrados.map(produto => `
    <div class="produto-card" data-id="${produto.id}">
      <div class="produto-img">${produto.emoji}</div>
      <h3>${produto.nome}</h3>
      <div class="produto-categoria">${produto.categoria}</div>
      <div class="produto-preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
      <button class="btn-add" data-id="${produto.id}">
        <i class="fas fa-cart-plus"></i> Adicionar
      </button>
    </div>
  `).join('');

  // Animação de entrada
  document.querySelectorAll('.produto-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), i * 80);
  });

  // Eventos dos botões de adicionar
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      adicionarAoCarrinho(id);
    });
  });
}

// ===== CARRINHO =====
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  atualizarCarrinho();
  animarBotao(id);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) {
    removerDoCarrinho(id);
  } else {
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  // Atualizar contador
  const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
  cartCount.textContent = totalItens;

  // Atualizar lista
  if (carrinho.length === 0) {
    cartItems.innerHTML = `<p style="color:#8080a0; text-align:center; padding:40px 0;">Seu carrinho está vazio.</p>`;
    cartTotal.textContent = 'R$ 0,00';
    return;
  }

  cartItems.innerHTML = carrinho.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <span style="font-size:1.6rem;">${item.emoji}</span>
      <div class="item-info">
        <h4>${item.nome}</h4>
        <div class="item-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="item-qtd">
        <button class="qtd-minus" data-id="${item.id}">−</button>
        <span>${item.qtd}</span>
        <button class="qtd-plus" data-id="${item.id}">+</button>
      </div>
      <button class="item-remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
    </div>
  `).join('');

  // Eventos dos botões do carrinho
  document.querySelectorAll('.qtd-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      alterarQuantidade(id, -1);
    });
  });
  document.querySelectorAll('.qtd-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      alterarQuantidade(id, 1);
    });
  });
  document.querySelectorAll('.item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      removerDoCarrinho(id);
    });
  });

  // Atualizar total
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function animarBotao(id) {
  const btn = document.querySelector(`.btn-add[data-id="${id}"]`);
  if (!btn) return;
  btn.classList.add('added');
  btn.innerHTML = '<i class="fas fa-check"></i> Adicionado';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar';
  }, 1500);
}

// ===== FILTROS =====
filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-categoria');
    renderProdutos();
  });
});

// ===== BUSCA =====
function performSearch() {
  renderProdutos();
}
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

// ===== ABRIR/FECHAR CARRINHO =====
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ===== FINALIZAR COMPRA =====
checkoutBtn.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  alert(`✅ Pedido finalizado! Total: R$ ${total.toFixed(2).replace('.', ',')}\nObrigado por comprar na NexusShop!`);
  carrinho = [];
  atualizarCarrinho();
  closeCart();
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER (mobile) =====
document.querySelector('.hamburger').addEventListener('click', () => {
  // Simples toggle do search no mobile
  const searchBox = document.querySelector('.search-box');
  if (window.innerWidth <= 768) {
    searchBox.style.display = searchBox.style.display === 'flex' ? 'none' : 'flex';
    searchBox.style.width = '100%';
    searchBox.querySelector('input').focus();
  }
});

// ===== INICIALIZAR =====
renderProdutos();