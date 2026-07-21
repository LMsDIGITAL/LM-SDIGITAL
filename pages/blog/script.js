// ===== DADOS DOS POSTS =====
const postsData = [
  {
    id: 1,
    titulo: 'O futuro da IA no design de interfaces',
    resumo: 'Como a inteligência artificial está revolucionando a criação de experiências digitais, automatizando tarefas e gerando insights.',
    conteudo: 'A inteligência artificial já não é mais uma promessa distante. Ferramentas como o Figma com plugins de IA estão permitindo que designers criem protótipos em minutos, analisem padrões de usabilidade e até gerem variações de layout automaticamente. Estudos mostram que o uso de IA no design pode reduzir o tempo de desenvolvimento em até 40%. Além disso, a IA generativa está abrindo portas para criações que antes exigiam equipes inteiras. Neste artigo, exploramos as principais tendências e como você pode se preparar para essa revolução.',
    categoria: 'tecnologia',
    data: '15/07/2026',
    autor: 'Ana Lima',
    tags: ['IA', 'Design', 'Figma'],
    imagem: 'linear-gradient(135deg, #c0392b, #e74c3c)'
  },
  {
    id: 2,
    titulo: 'Design emocional: como as cores influenciam decisões',
    resumo: 'Entenda a psicologia das cores e como aplicá-la para aumentar conversões e engajamento.',
    conteudo: 'As cores não são apenas estética; elas carregam significados profundos que afetam o comportamento humano. O vermelho, por exemplo, está associado à urgência e paixão, enquanto o azul transmite confiança. Em uma landing page, a escolha certa de cores pode aumentar as conversões em até 30%. Neste post, abordamos a psicologia das cores aplicada ao design digital, com exemplos práticos e estudos de caso.',
    categoria: 'design',
    data: '10/07/2026',
    autor: 'Carlos Mendes',
    tags: ['Design', 'Psicologia', 'Cores'],
    imagem: 'linear-gradient(135deg, #f39c12, #e67e22)'
  },
  {
    id: 3,
    titulo: 'Como a inovação aberta está transformando startups',
    resumo: 'O conceito de inovação aberta e como ele está acelerando o crescimento de novas empresas.',
    conteudo: 'A inovação aberta é um modelo que incentiva empresas a colaborarem com ecossistemas externos, como universidades, outras startups e até clientes. Isso acelera o desenvolvimento de produtos e reduz custos. Grandes corporações já adotam esse modelo, com programas de aceleração e parcerias estratégicas. Para startups, isso representa uma oportunidade de acessar recursos e mentoria que antes eram inacessíveis. Vamos explorar casos de sucesso e como aplicar na sua empresa.',
    categoria: 'inovacao',
    data: '05/07/2026',
    autor: 'Juliana Rocha',
    tags: ['Inovação', 'Startups', 'Colaboração'],
    imagem: 'linear-gradient(135deg, #8e44ad, #9b59b6)'
  },
  {
    id: 4,
    titulo: 'Marketing de conteúdo na era da atenção',
    resumo: 'Estratégias para criar conteúdo que realmente engaja e gera resultados.',
    conteudo: 'Com a saturação de informações, capturar a atenção do público é cada vez mais desafiador. O marketing de conteúdo precisa ser relevante, autêntico e direcionado. Neste artigo, apresentamos técnicas de storytelling, uso de dados para personalização e como medir o ROI do seu conteúdo. Também discutimos a importância de formatos interativos, como vídeos e infográficos, para aumentar o engajamento.',
    categoria: 'marketing',
    data: '28/06/2026',
    autor: 'Rafael Lima',
    tags: ['Marketing', 'Conteúdo', 'Engajamento'],
    imagem: 'linear-gradient(135deg, #2980b9, #3498db)'
  },
  {
    id: 5,
    titulo: 'Realidade aumentada: o próximo grande passo',
    resumo: 'Como a AR está mudando a forma como interagimos com o mundo digital e físico.',
    conteudo: 'A realidade aumentada já está presente em aplicativos de redes sociais, jogos e até no varejo. Com a popularização de dispositivos como óculos AR e smartphones com sensores avançados, as possibilidades são enormes. Empresas estão usando AR para permitir que clientes visualizem produtos em suas casas antes de comprar, ou para treinamentos imersivos. Neste post, analisamos as tendências e como você pode integrar AR em sua estratégia.',
    categoria: 'tecnologia',
    data: '20/06/2026',
    autor: 'Ana Lima',
    tags: ['AR', 'Tecnologia', 'Imersão'],
    imagem: 'linear-gradient(135deg, #27ae60, #2ecc71)'
  },
  {
    id: 6,
    titulo: 'UX writing: a arte de escrever para interfaces',
    resumo: 'A importância das palavras na experiência do usuário e como aplicá-las corretamente.',
    conteudo: 'UX writing é a prática de escrever textos que orientam e auxiliam o usuário dentro de uma interface. Palavras mal escolhidas podem gerar confusão e frustração, enquanto uma boa comunicação aumenta a satisfação e a conversão. Abordamos princípios de clareza, concisão e tom de voz, com exemplos de grandes empresas que acertam nesse aspecto.',
    categoria: 'design',
    data: '15/06/2026',
    autor: 'Carlos Mendes',
    tags: ['UX', 'Escrita', 'Interface'],
    imagem: 'linear-gradient(135deg, #e67e22, #f1c40f)'
  }
];

// ===== ELEMENTOS =====
const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoriasList = document.getElementById('categoriasList');
const recentesList = document.getElementById('recentesList');
const pagination = document.getElementById('pagination');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbClose = document.getElementById('lbClose');
const lbTitulo = document.getElementById('lbTitulo');
const lbCategoria = document.getElementById('lbCategoria');
const lbData = document.getElementById('lbData');
const lbDesc = document.getElementById('lbDesc');
const lbTags = document.getElementById('lbTags');

// ===== ESTADO =====
let postsFiltrados = [...postsData];
let currentPage = 1;
const postsPerPage = 3;

// ===== RENDERIZAR POSTS =====
function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = postsFiltrados.slice(start, end);

  if (pagePosts.length === 0) {
    postsContainer.innerHTML = `<p style="text-align:center;color:#8080a0;padding:40px 0;">Nenhum post encontrado.</p>`;
    pagination.style.display = 'none';
    return;
  }

  pagination.style.display = 'flex';

  postsContainer.innerHTML = pagePosts.map(post => `
    <div class="post-card" data-id="${post.id}">
      <div class="post-img" style="background: ${post.imagem};">
        <span class="post-categoria">${post.categoria}</span>
      </div>
      <div class="post-body">
        <h3>${post.titulo}</h3>
        <div class="post-meta">
          <i class="fas fa-user"></i> ${post.autor} • <i class="fas fa-calendar-alt"></i> ${post.data}
        </div>
        <p>${post.resumo}</p>
        <div class="post-tags">
          ${post.tags.map(tag => `<span>#${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Atualizar info da página
  const totalPages = Math.ceil(postsFiltrados.length / postsPerPage);
  pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
  prevPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages || totalPages === 0;

  // Adicionar evento de clique em cada post para abrir lightbox
  document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id'));
      const post = postsData.find(p => p.id === id);
      if (post) openLightbox(post);
    });
  });
}

// ===== FILTRO POR CATEGORIA =====
categoriasList.addEventListener('click', (e) => {
  e.preventDefault();
  const link = e.target.closest('a');
  if (!link) return;
  const categoria = link.getAttribute('data-categoria');

  // Ativar visual
  document.querySelectorAll('#categoriasList a').forEach(a => a.classList.remove('active'));
  link.classList.add('active');

  // Filtrar
  if (categoria === 'todos') {
    postsFiltrados = [...postsData];
  } else {
    postsFiltrados = postsData.filter(p => p.categoria === categoria);
  }
  currentPage = 1;
  renderPosts();
});

// ===== BUSCA =====
function performSearch() {
  const term = searchInput.value.toLowerCase().trim();
  if (term === '') {
    postsFiltrados = [...postsData];
  } else {
    postsFiltrados = postsData.filter(p =>
      p.titulo.toLowerCase().includes(term) ||
      p.resumo.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
  }
  currentPage = 1;
  // Resetar categoria ativa
  document.querySelectorAll('#categoriasList a').forEach(a => a.classList.remove('active'));
  document.querySelector('#categoriasList a[data-categoria="todos"]').classList.add('active');
  renderPosts();
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

// ===== POSTS RECENTES (sidebar) =====
function renderRecentes() {
  const recentes = [...postsData].sort((a, b) => {
    // Simples ordenação por data (assumindo formato DD/MM/YYYY)
    const aParts = a.data.split('/').reverse().join('');
    const bParts = b.data.split('/').reverse().join('');
    return bParts.localeCompare(aParts);
  }).slice(0, 4);

  recentesList.innerHTML = recentes.map(post => `
    <li><a href="#" data-id="${post.id}">${post.titulo}</a></li>
  `).join('');

  // Adicionar evento para abrir post
  recentesList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(link.getAttribute('data-id'));
      const post = postsData.find(p => p.id === id);
      if (post) openLightbox(post);
    });
  });
}

// ===== LIGHTBOX =====
function openLightbox(post) {
  lbTitulo.textContent = post.titulo;
  lbCategoria.textContent = post.categoria;
  lbData.textContent = post.data;
  lbDesc.textContent = post.conteudo;
  lbTags.innerHTML = post.tags.map(tag => `<span>#${tag}</span>`).join('');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== PAGINAÇÃO =====
prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
    window.scrollTo({ top: document.getElementById('posts').offsetTop - 80, behavior: 'smooth' });
  }
});

nextPage.addEventListener('click', () => {
  const totalPages = Math.ceil(postsFiltrados.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
    window.scrollTo({ top: document.getElementById('posts').offsetTop - 80, behavior: 'smooth' });
  }
});

// ===== NEWSLETTER =====
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const email = input.value.trim();
  if (email && email.includes('@')) {
    alert('✅ Inscrito com sucesso! Você receberá novidades.');
    input.value = '';
  } else {
    alert('Por favor, insira um e-mail válido.');
  }
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

// ===== INICIALIZAR =====
renderPosts();
renderRecentes();