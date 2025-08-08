// MENU HAMBURGUER
const btnHamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const btnCloseMenu = document.getElementById('closeMenuBtn');
const navLinks = document.querySelectorAll('.nav-links a');

btnHamburger.addEventListener('click', () => {
  navMenu.classList.add('active');
  navMenu.classList.remove('hidden');
  btnHamburger.setAttribute('aria-expanded', 'true');
});

btnCloseMenu.addEventListener('click', () => {
  navMenu.classList.remove('active');
  navMenu.classList.add('hidden');
  btnHamburger.setAttribute('aria-expanded', 'false');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navMenu.classList.add('hidden');
    btnHamburger.setAttribute('aria-expanded', 'false');
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

// ELEMENTOS MODAL
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

// Fecha modal
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Fecha modal ao clicar fora da caixa
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
const abrirCarrinhoBtn = document.getElementById('abrirCarrinhoBtn');
const contadorCarrinho = document.getElementById('contadorCarrinho');
const btnComprarWhatsApp = document.getElementById('btnComprarWhatsApp');

let carrinho = {};

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  const keys = Object.keys(carrinho);

  if (keys.length === 0) {
    listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
    totalCompra.textContent = 'R$ 0,00';
    contadorCarrinho.textContent = '0';
    contadorCarrinho.style.display = 'none';
    return;
  }

  contadorCarrinho.style.display = 'inline-block';

  let total = 0;
  let totalItens = 0;

  keys.forEach(key => {
    const produto = produtosDetalhes[key];
    const qtd = carrinho[key];
    const precoTotal = produto.preco * qtd;
    total += precoTotal;
    totalItens += qtd;

    const li = document.createElement('li');
    li.textContent = `${produto.titulo} x${qtd}`;

    const precoSpan = document.createElement('span');
    precoSpan.textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    li.appendChild(precoSpan);

    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.title = 'Remover item';
    btnRemover.style.marginLeft = '10px';
    btnRemover.style.cursor = 'pointer';
    btnRemover.addEventListener('click', () => {
      removerDoCarrinho(key);
    });
    li.appendChild(btnRemover);

    listaCarrinho.appendChild(li);
  });

  totalCompra.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  contadorCarrinho.textContent = totalItens;
}

function adicionarAoCarrinho(produtoKey) {
  if (carrinho[produtoKey]) {
    carrinho[produtoKey]++;
  } else {
    carrinho[produtoKey] = 1;
  }
  atualizarCarrinho();
}

// Remove item do carrinho
function removerDoCarrinho(produtoKey) {
  if (carrinho[produtoKey]) {
    carrinho[produtoKey]--;
    if (carrinho[produtoKey] <= 0) {
      delete carrinho[produtoKey];
    }
    atualizarCarrinho();
  }
}

// Adicionar produto ao carrinho pelo modal
btnAddCarrinho.addEventListener('click', () => {
  if (produtoAtual) {
    adicionarAoCarrinho(produtoAtual);
    modal.classList.add('hidden');
    carrinhoMenu.classList.add('active');
    carrinhoMenu.classList.remove('hidden');
  }
});

// Fechar menu carrinho
btnFecharCarrinho.addEventListener('click', () => {
  carrinhoMenu.classList.remove('active');
  carrinhoMenu.classList.add('hidden');
});

// Abrir carrinho (ícone)
abrirCarrinhoBtn.addEventListener('click', () => {
  const keys = Object.keys(carrinho);
  if (keys.length === 0) {
    // Carrinho vazio: abre o menu lateral normalmente
    carrinhoMenu.classList.toggle('active');
    carrinhoMenu.classList.toggle('hidden');
  } else {
    // Carrinho com itens: abre WhatsApp direto
    const telefoneVendedor = '5511995286351'; // seu número

    let mensagem = 'Olá, quero comprar os seguintes produtos:%0A';
    keys.forEach(key => {
      mensagem += `- ${produtosDetalhes[key].titulo} x${carrinho[key]}%0A`;
    });
    mensagem += 'Por favor, me envie mais informações.';

    const urlWhats = `https://wa.me/${telefoneVendedor}?text=${mensagem}`;
    window.open(urlWhats, '_blank');
  }
});

// Botão "Comprar pelo WhatsApp" dentro do menu do carrinho
btnComprarWhatsApp.addEventListener('click', () => {
  const keys = Object.keys(carrinho);
  if (keys.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const telefoneVendedor = '5511995286351'; // seu número

  let mensagem = 'Olá, quero comprar os seguintes produtos:%0A';
  keys.forEach(key => {
    mensagem += `- ${produtosDetalhes[key].titulo} x${carrinho[key]}%0A`;
  });
  mensagem += 'Por favor, me envie mais informações.';

  const urlWhats = `https://wa.me/${telefoneVendedor}?text=${mensagem}`;
  window.open(urlWhats, '_blank');
});

// Inicializa o carrinho e contador
atualizarCarrinho();
