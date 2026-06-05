document.addEventListener('DOMContentLoaded', () => {

  const SUPABASE_URL = 'https://seu-projeto.supabase.co';
  const SUPABASE_KEY = 'sua_chave_anon_aqui';
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const IMPERATRIZ = { lat: -5.5269, lng: -47.4781 };

  // Agora cada evento tem array de fotos
  const EVENTOS_MOCK = [
    {
      id: 1,
      nome: "Bar Seu Manel",
      local: "Nova Imperatriz",
      lat: -5.5180, lng: -47.4910,
      fotos: [
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop"
      ],
      avatar: "🍖",
      atracao: "Pagode do AD + DJ Wallison",
      preco: 20,
      hora: "21h - 03h",
      tags: ["pagode", "sertanejo", "universitario"],
      bombando: 89,
      desc: "Entrada R$20. Open de caipirinha até 23h. Ambiente climatizado."
    },
    {
      id: 2,
      nome: "DBB Draft Beer Bar",
      local: "Centro",
      lat: -5.5305, lng: -47.4785,
      fotos: [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571266028243-d220c9fad208?w=600&h=600&fit=crop"
      ],
      avatar: "🎤",
      atracao: "Forró Boys + Zé Cantor",
      preco: 40,
      hora: "22h - 05h",
      tags: ["forro", "sertanejo"],
      bombando: 156,
      desc: "MULHER VIP até 00h. Área VIP open bar R$120. Estacionamento grátis."
    },
    {
      id: 3,
      nome: "Lunna Lounge ITZ",
      local: "Beira Rio",
      lat: -5.5380, lng: -47.4650,
      fotos: [
        "https://images.unsplash.com/photo-1571266028243-d220c9fad208?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&h=600&fit=crop"
      ],
      avatar: "🌴",
      atracao: "Sunset Eletrônico - DJ Local",
      preco: 60,
      hora: "16h - 22h",
      tags: ["eletronica", "house", "sunset"],
      bombando: 67,
      desc: "Domingão na beira do Tocantins. Dose dupla de gin até 18h."
    }
  ];

  let map;
  let markers = [];
  let eventosFiltrados = [...EVENTOS_MOCK];
  let carrosseis = {}; // Guarda os intervals de cada post

  function initMap() {
    map = L.map('map').setView([IMPERATRIZ.lat, IMPERATRIZ.lng], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
  }

  function renderizarFeed(eventos) {
    // Limpa intervals antigos
    Object.values(carrosseis).forEach(clearInterval);
    carrosseis = {};

    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    eventos.forEach(evento => {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `
        <div class="post-header">
          <div class="post-avatar">${evento.avatar}</div>
          <div class="post-info">
            <h3>${evento.nome}</h3>
            <p>📍 ${evento.local} • ${evento.hora}</p>
          </div>
        </div>

        <div class="carrossel" data-id="${evento.id}">
          <div class="carrossel-track">
            ${evento.fotos.map((foto, idx) => `
              <img src="${foto}" class="carrossel-img" alt="${evento.nome}" onclick="abrirModal(${evento.id}, ${idx})">
            `).join('')}
          </div>
          ${evento.fotos.length > 1? `
            <div class="carrossel-dots">
              ${evento.fotos.map((_, idx) => `<span class="dot ${idx === 0? 'ativo' : ''}"></span>`).join('')}
            </div>
          ` : ''}
        </div>

        <div class="post-actions">
          <span onclick="curtir(this)">🤍</span>
          <span onclick="verNoMapa(${evento.id})">📍</span>
          <span onclick="compartilhar(${evento.id})">📤</span>
        </div>
        <div class="post-bombando">🔥 ${evento.bombando} pessoas confirmaram</div>
        <div class="post-desc"><b>${evento.atracao}</b><br>${evento.desc.substring(0, 80)}...</div>
        <div class="post-tags">
          <span class="tag">R$ ${evento.preco}</span>
          ${evento.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
        <button class="btn-toindo" onclick="confirmarPresenca(this, ${evento.id})">Tô indo</button>
      `;
      feed.appendChild(post);

      // Inicia carrossel se tiver mais de 1 foto
      if (evento.fotos.length > 1) {
        iniciarCarrossel(evento.id, evento.fotos.length);
      }
    });
  }

  function iniciarCarrossel(id, totalFotos) {
    let indexAtual = 0;
    const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
    const track = carrossel.querySelector('.carrossel-track');
    const dots = carrossel.querySelectorAll('.dot');

    function irParaSlide(idx) {
      indexAtual = idx;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('ativo', i === idx));
    }

    // Autoplay de 10 segundos
    carrosseis[id] = setInterval(() => {
      indexAtual = (indexAtual + 1) % totalFotos;
      irParaSlide(indexAtual);
    }, 10000);

    // Pausa no hover
    carrossel.addEventListener('mouseenter', () => clearInterval(carrosseis[id]));
    carrossel.addEventListener('mouseleave', () => {
      carrosseis[id] = setInterval(() => {
        indexAtual = (indexAtual + 1) % totalFotos;
        irParaSlide(indexAtual);
      }, 10000);
    });

    // Arrastar no touch
    let startX = 0;
    carrossel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    carrossel.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && indexAtual < totalFotos - 1) irParaSlide(indexAtual + 1);
        if (diff < 0 && indexAtual > 0) irParaSlide(indexAtual - 1);
      }
    });

    // Clicar nos dots
    dots.forEach((dot, idx) => {
      dot.onclick = () => irParaSlide(idx);
    });
  }

  function renderizarMapa(eventos) {
    if (!map) return;
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    eventos.forEach(evento => {
      const marker = L.marker([evento.lat, evento.lng]).addTo(map)
       .bindPopup(`<b>${evento.nome}</b><br>${evento.atracao}<br>${evento.local}`);
      marker.id = evento.id;
      markers.push(marker);
    });
  }

  // Modal agora recebe o index da foto clicada
  const modal = document.getElementById('modal');
  const modalFechar = document.querySelector('.modal-fechar');

  window.abrirModal = function(id, fotoIndex = 0) {
    const evento = EVENTOS_MOCK.find(e => e.id === id);
    document.getElementById('modal-img').src = evento.fotos[fotoIndex];
    document.getElementById('modal-avatar').textContent = evento.avatar;
    document.getElementById('modal-nome').textContent = evento.nome;
    document.getElementById('modal-local').textContent = `${evento.local} • ${evento.hora}`;
    document.getElementById('modal-atracao').textContent = evento.atracao;
    document.getElementById('modal-descricao').textContent = evento.desc;
    document.getElementById('modal-preco').textContent = `Entrada: R$ ${evento.preco}`;
    document.getElementById('modal-tags').innerHTML = evento.tags.map(t => `<span class="tag">#${t}</span>`).join('');

    const btnModal = document.getElementById('modal-btn');
    btnModal.onclick = () => confirmarPresenca(btnModal, id);

    modal.classList.add('ativo');
  }

  modalFechar.onclick = () => modal.classList.remove('ativo');
  window.onclick = (e) => { if (e.target === modal) modal.classList.remove('ativo'); }

  window.curtir = function(el) {
    el.textContent = el.textContent === '🤍'? '❤️' : '🤍';
  }

  window.verNoMapa = function(id) {
    const evento = EVENTOS_MOCK.find(e => e.id === id);
    map.setView([evento.lat, evento.lng], 17);
    markers.find(m => m.id === id)?.openPopup();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.confirmarPresenca = function(btn, id) {
    const evento = EVENTOS_MOCK.find(e => e.id === id);
    if (btn.classList.contains('indo')) {
      btn.classList.remove('indo');
      btn.textContent = 'Tô indo';
      evento.bombando--;
    } else {
      btn.classList.add('indo');
      btn.textContent = 'Confirmado ✓';
      evento.bombando++;
    }
    renderizarFeed(eventosFiltrados);
  }

  window.compartilhar = async function(id) {
    const evento = EVENTOS_MOCK.find(e => e.id === id);
    const texto = `Bora pro rolê? ${evento.nome} em ${evento.local} • ${evento.hora} • R$${evento.preco}`;
    const url = `https://rolesp.com.br/role/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: evento.nome, text: texto, url: url });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(`${texto} ${url}`);
      alert('Link copiado! Cola no WhatsApp 📲');
    }
  }

  // Filtros
  document.querySelectorAll('.filtros button').forEach(btn => {
    btn.onclick = () => {
      document.querySelector('.filtro-ativo').classList.remove('filtro-ativo');
      btn.classList.add('filtro-ativo');
      const tag = btn.dataset.tag;
      eventosFiltrados = tag === 'todos'? [...EVENTOS_MOCK] : EVENTOS_MOCK.filter(e => e.tags.includes(tag));
      renderizarFeed(eventosFiltrados);
      renderizarMapa(eventosFiltrados);
    };
  });

  // Inicia
  initMap();
  renderizarFeed(EVENTOS_MOCK);
  renderizarMapa(EVENTOS_MOCK);

});