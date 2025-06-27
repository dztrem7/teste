// MENU HAMBURGUER
const btnHamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

btnHamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em algum link (opcional)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// DADOS DOS PRODUTOS
const produtosDetalhes = {
  teclado: {
    titulo: 'Teclado Mecânico RGB',
    imagem: 'https://cdn.pixabay.com/photo/2020/10/28/08/28/keyboard-5693930_960_720.jpg',
    descricao: 'Switch Red, iluminação personalizável, anti-ghosting e teclas programáveis.',
    preco: 349.90
  },
  mouse: {
    titulo: 'Mouse Gamer 7200DPI',
    imagem: 'https://cdn.pixabay.com/photo/2018/11/06/00/53/gaming-3796584_960_720.jpg',
    descricao: 'Alta precisão com sensor óptico, design ergonômico e botões programáveis.',
    preco: 159.90
  },
  pc: {
    titulo: 'PC Gamer RTX 3060',
    imagem: 'https://cdn.pixabay.com/photo/2021/01/18/21/18/computer-5928826_960_720.jpg',
    descricao: 'Ryzen 5 5600, 16GB RAM, SSD 1TB, placa de vídeo RTX 3060 para alto desempenho.',
    preco: 5799.00
  },
  headset: {
    titulo: 'Headset Surround 7.1',
    imagem: 'https://cdn.pixabay.com/photo/2016/12/04/17/52/headphones-1883916_960_720.jpg',
    descricao: 'Som envolvente e microfone removível com cancelamento de ruído.',
    preco: 289.90
  }
};

// MODAL PRODUTOS
const modal = document.getElementById('produtoModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const btnAddCarrinho = document.getElementById('btnAddCarrinho');

let produtoAtual = null;

function abrirModal(produtoKey) {
  const produto = produtosDetalhes[produtoKey];
  if (!produto) return;

  produtoAtual = produtoKey;

  modalTitle.textContent = produto.titulo;
  modalImage.src = produto.imagem;
  modalImage.alt = produto.titulo;
  modalDesc.textContent = produto.descricao;
  modalPrice.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;

  modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Fechar modal ao clicar fora do conteúdo
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// CARRINHO
const carrinhoMenu = document.getElementById('carrinhoMenu');
const btnFecharCarrinho = document.getElementById('fecharCarrinho');
const listaCarrinho = document.getElementById('listaCarrinho');
const totalCompra = document.getElementById('totalCompra');
const btnAbrirCarrinho = document.getElementById('abrirCarrinhoBtn');

let carrinho = {};

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
  listaCarrinho.innerHTML = ''; // limpa a lista

  const produtosKeys = Object.keys(carrinho);
  if (produtosKeys.length === 0) {
    listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
    totalCompra.textContent = 'R$ 0,00';
    return;
  }

  let somaTotal = 0;
  produtosKeys.forEach(key => {
    const item = produtosDetalhes[key];
    const quantidade = carrinho[key];
    const precoTotal = item.preco * quantidade;
    somaTotal += precoTotal;

    const li = document.createElement('li');
    li.textContent = `${item.titulo} x${quantidade}`;
    const precoSpan = document.createElement('span');
    precoSpan.textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    li.appendChild(precoSpan);

    // Botão remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.style.marginLeft = '10px';
    btnRemover.style.cursor = 'pointer';
    btnRemover.title = 'Remover item';
    btnRemover.addEventListener('click', () => {
      removerDoCarrinho(key);
    });
    li.appendChild(btnRemover);

    listaCarrinho.appendChild(li);
  });

  totalCompra.textContent = `R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
}

function adicionarAoCarrinho(produtoKey) {
  if (carrinho[produtoKey]) {
    carrinho[produtoKey]++;
  } else {
    carrinho[produtoKey] = 1;
  }
  atualizarCarrinho();
  alert(`"${produtosDetalhes[produtoKey].titulo}" adicionado ao carrinho!`);
}

function removerDoCarrinho(produtoKey) {
  if (carrinho[produtoKey]) {
    carrinho[produtoKey]--;
    if (carrinho[produtoKey] <= 0) {
      delete carrinho[produtoKey];
    }
    atualizarCarrinho();
  }
}

// Botão para adicionar produto no modal
btnAddCarrinho.addEventListener('click', () => {
  if (produtoAtual) {
    adicionarAoCarrinho(produtoAtual);
    modal.classList.add('hidden');
    carrinhoMenu.classList.remove('hidden');
  }
});

// Botão fechar carrinho
btnFecharCarrinho.addEventListener('click', () => {
  carrinhoMenu.classList.add('hidden');
});

// Botão abrir carrinho (caso queira ter um botão fixo)
if (btnAbrirCarrinho) {
  btnAbrirCarrinho.addEventListener('click', () => {
    carrinhoMenu.classList.remove('hidden');
  });
}

// Inicializa o carrinho aberto ou fechado conforme quiser
carrinhoMenu.classList.add('hidden'); // começa escondido
