document.addEventListener('DOMContentLoaded', () => {

  const SUPABASE_URL = 'https://seu-projeto.supabase.co';
  const SUPABASE_KEY = 'sua_chave_anon_aqui';
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const IMPERATRIZ = { lat: -5.5269, lng: -47.4781 };

  const EVENTOS_MOCK = [
    {
      id: 1,
      nome: "Quintal do Espeto",
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
      dataHora: new Date(Date.now() + 3 * 60 * 60 * 1000),
      tags: ["pagode", "sertanejo", "universitario"],
      bombando: 89,
      desc: "Entrada R$20. Open de caipirinha até 23h. Ambiente climatizado. Aniversariante do mês não paga."
    },
    {
      id: 2,
      nome: "Arena Premium",
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
      dataHora: new Date(Date.now() + 5 * 60 * 60 * 1000),
      tags: ["forro", "sertanejo"],
      bombando: 156,
      desc: "MULHER VIP até 00h. Área VIP open bar R$120. Estacionamento grátis. Proibido camisa de time."
    },
    {
      id: 3,
      nome: "Prime Beach Club",
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
      dataHora: new Date(Date.now() + 1 * 60 * 60 * 1000),
      tags: ["eletronica", "house", "sunset"],
      bombando: 67,
      desc: "Domingão na beira do Tocantins. Dose dupla de gin até 18h. Ingresso 1º lote esgotado."
    },
    {
      id: 4,
      nome: "Buteco do Gaúcho",
      local: "Bacuri",
      lat: -5.5145, lng: -47.4820,
      fotos: [
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=600&fit=crop"
      ],
      avatar: "🍺",
      atracao: "Sertanejo ao vivo",
      preco: 0,
      hora: "18h - 00h",
      dataHora: new Date(Date.now() + 2 * 60 * 60 * 1000),
      tags: ["sertanejo", "bar", "modao"],
      bombando: 43,
      desc: "Entrada GRÁTIS. Couvert R$15. Espetinho + cerveja gelada. Música ao vivo toda sexta."
    },
    {
      id: 5,
      nome: "Mansão Club",
      local: "Parque Alvorada",
      lat: -5.5450, lng: -47.4880,
      fotos: [
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=600&fit=crop"
      ],
      avatar: "🔥",
      atracao: "Baile Funk - MC 7 Belo + Convidados",
      preco: 25,
      hora: "23h - 06h",
      dataHora: new Date(Date.now() + 6 * 60 * 60 * 1000),
      tags: ["funk", "mandela"],
      bombando: 214,
      desc: "R$25 até 01h. Depois R$40. Proibido boné. +18 com documento. Melhor baile da região."
    }
  ];

  const STORIES_MOCK = [
    {
      id: 1,
      eventoId: 2,
      nome: "Arena Premium",
      avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
      imagens: [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=1600&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=1600&fit=crop"
      ],
      tempo: "2h",
      aoVivo: true
    },
    {
      id: 2,
      eventoId: 5,
      nome: "Mansão Club",
      avatar: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=100&h=100&fit=crop",
      imagens: [
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=1600&fit=crop"
      ],
      tempo: "4h",
      aoVivo: false
    },
    {
      id: 3,
      eventoId: 1,
      nome: "Quintal do Espeto",
      avatar: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=100&h=100&fit=crop",
      imagens: [
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=1600&fit=crop"
      ],
      tempo: "6h",
      aoVivo: false
    },
    {
      id: 4,
      eventoId: 3,
      nome: "Prime Beach",
      avatar: "https://images.unsplash.com/photo-1571266028243-d220c9fad208?w=100&h=100&fit=crop",
      imagens: [
        "https://images.unsplash.com/photo-1571266028243-d220c9fad208?w=900&h=1600&fit=crop"
      ],
      tempo: "8h",
      aoVivo: false
    }
  ];

  let map;
  let markers = [];
  let heatLayer = null;
  let eventosFiltrados = [...EVENTOS_MOCK];
  let carrosseis = {};
  let eventoModalAtual = null;
  let storyAtual = null;
  let storyIndex = 0;
  let storyInterval = null;
  let countdownInterval = null;
  let checkinsUsuario = JSON.parse(localStorage.getItem('checkins') || '[]');

  function initMap() {
    map = L.map('map').setView([IMPERATRIZ.lat, IMPERATRIZ.lng], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
  }

  function renderizarStories() {
    const container = document.getElementById('stories-container');
    container.innerHTML = `
      <div class="story-item" onclick="alert('Funcionalidade: Postar seu story')">
        <div class="story-avatar adicionar">+</div>
        <span class="story-nome">Seu story</span>
      </div>
    `;

    STORIES_MOCK.forEach(story => {
      const item = document.createElement('div');
      item.className = 'story-item';
      item.onclick = () => abrirStories(story.id);
      item.innerHTML = `
        <div class="story-avatar">
          <img src="${story.avatar}" alt="${story.nome}">
          ${story.aoVivo? '<span class="story-ao-vivo">AO VIVO</span>' : ''}
        </div>
        <span class="story-nome">${story.nome.split(' ')[0]}</span>
      `;
      container.appendChild(item);
    });
  }

  function renderizarRanking() {
    const container = document.getElementById('ranking-semanal');
    const top5 = [...EVENTOS_MOCK].sort((a, b) => b.bombando - a.bombando).slice(0, 5);
    
    container.innerHTML = `
      <div class="ranking-titulo">👑 Top 5 Rolês da Semana</div>
      ${top5.map((e, i) => `
        <div class="ranking-item" onclick="abrirModal(${e.id})">
          <div class="ranking-posicao ${i === 0? 'primeiro' : ''}">${i + 1}</div>
          <div class="ranking-avatar">${e.avatar}</div>
          <div class="ranking-info">
            <strong>${e.nome}</strong>
            <span>📍 ${e.local}</span>
          </div>
          <div class="ranking-badge">🔥 ${e.bombando}</div>
        </div>
      `).join('')}
    `;
  }

  function calcularTempoRestante(dataHora) {
    const diff = dataHora - Date.now();
    if (diff <= 0) return 'JÁ COMEÇOU';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function renderizarFeed(eventos) {
    Object.values(carrosseis).forEach(clearInterval);
    carrosseis = {};

    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    eventos.forEach(evento => {
      const tempoRestante = calcularTempoRestante(evento.dataHora);
      const urgente = evento.dataHora - Date.now() < 3600000;
      
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `
        <div class="post-header">
          <div class="post-avatar">${evento.avatar}</div>
          <div class="post-info">
            <h3>${evento.nome}</h3>
            <p>📍 ${evento.local} • ${evento.hora}</p>
          </div>
          <div class="post-countdown ${urgente? 'urgente' : ''}" data-id="${evento.id}">${tempoRestante}</div>
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

      if (evento.fotos.length > 1) {
        iniciarCarrossel(evento.id, evento.fotos.length);
      }
    });
    
    iniciarCountdowns();
  }

  function iniciarCountdowns() {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      document.querySelectorAll('.post-countdown').forEach(el => {
        const id = parseInt(el.dataset.id);
        const evento = EVENTOS_MOCK.find(e => e.id === id);
        if (evento) {
          el.textContent = calcularTempoRestante(evento.dataHora);
          const urgente = evento.dataHora - Date.now() < 3600000;
          el.classList.toggle('urgente', urgente);
        }
      });
    }, 1000);
  }

  function iniciarCarrossel(id, totalFotos) {
    let indexAtual = 0;
    const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
    if (!carrossel) return;
    const track = carrossel.querySelector('.carrossel-track');
    const dots = carrossel.querySelectorAll('.dot');

    function irParaSlide(idx) {
      indexAtual = idx;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('ativo', i === idx));
    }

    carrosseis[id] = setInterval(() => {
      indexAtual = (indexAtual + 1) % totalFotos;
      irParaSlide(indexAtual);
    }, 10000);

    carrossel.addEventListener('mouseenter', () => clearInterval(carrosseis[id]));
    carrossel.addEventListener('mouseleave', () => {
      carrosseis[id] = setInterval(() => {
        indexAtual = (indexAtual + 1) % totalFotos;
        irParaSlide(indexAtual);
      }, 10000);
    });

    let startX = 0;
    carrossel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    carrossel.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && indexAtual < totalFotos - 1) irParaSlide(indexAtual + 1);
        if (diff < 0 && indexAtual > 0) irParaSlide(indexAtual - 1);
      }
    });

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
   .bindPopup(`<b>${evento.nome}</b><br>${evento.atracao}<br>${evento.local}<br>🔥 ${evento.bombando}`);
      marker.id = evento.id;
      markers.push(marker);
    });
  }

  function toggleHeatmap() {
    const btn = document.getElementById('btn-heatmap');
    if (heatLayer) {
      map.removeLayer(heatLayer);
      heatLayer = null;
      btn.classList.remove('ativo');
      renderizarMapa(eventosFiltrados);
    } else {
      markers.forEach(m => map.removeLayer(m));
      const heatData = eventosFiltrados.map(e => [e.lat, e.lng, e.bombando / 10]);
      heatLayer = L.heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
      btn.classList.add('ativo');
    }
  }

  function buscarPertoDeMim() {
    if (!navigator.geolocation) {
      alert('Geolocalização não suportada');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const raio = 5; // km
      
      eventosFiltrados = EVENTOS_MOCK.filter(e => {
        const dist = calcularDistancia(latitude, longitude, e.lat, e.lng);
        return dist <= raio;
      });
      
      map.setView([latitude, longitude], 14);
      renderizarFeed(eventosFiltrados);
      renderizarMapa(eventosFiltrados);
      document.getElementById('btn-perto').classList.add('ativo');
    }, () => alert('Erro ao obter localização'));
  }

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  const modal = document.getElementById('modal');
  const modalFechar = document.querySelector('.modal-fechar-full');

  window.abrirModal = function(id, fotoIndex = 0) {
    const evento = EVENTOS_MOCK.find(e => e.id === id);
    eventoModalAtual = evento;

    document.getElementById('modal-img-full').src = evento.fotos[fotoIndex];
    document.getElementById('modal-nome-full').textContent = evento.nome;
    document.getElementById('modal-atracao-full').textContent = evento.atracao;
    document.getElementById('modal-bombando-full').textContent = evento.bombando;
    document.getElementById('modal-hora-full').textContent = evento.hora.split(' - ')[0];
    document.getElementById('modal-preco-full').textContent = `R$ ${evento.preco}`;
    document.getElementById('modal-desc-full').textContent = evento.desc;
    document.getElementById('modal-tags-full').innerHTML = evento.tags.map(t => `<span class="tag">#${t}</span>`).join('');

    const vagas = Math.max(12, 100 - evento.bombando);
    document.getElementById('modal-vagas').textContent = vagas;
    document.getElementById('modal-urgencia').textContent =
      vagas < 20? `🔥 ÚLTIMAS ${vagas} VAGAS!` : `Últimas ${vagas} vagas no 1º lote`;

    const status = evento.bombando > 150? '🔥 LOTANDO AGORA' :
                   evento.bombando > 80? '🔥 BOMBA HOJE' : '⚡ COMEÇANDO A BOMBAR';
    document.getElementById('modal-status').textContent = status;

    // Countdown no modal
    const atualizarTimerModal = () => {
      document.getElementById('modal-timer').textContent = calcularTempoRestante(evento.dataHora);
    };
    atualizarTimerModal();
    clearInterval(countdownInterval);
    countdownInterval = setInterval(atualizarTimerModal, 1000);

    const btn = document.getElementById('modal-btn-full');
    btn.onclick = () => confirmarPresencaModal(btn, id);

    // Check-in button
    const btnCheckin = document.querySelector('.btn-checkin');
    const jaFezCheckin = checkinsUsuario.includes(id);
    btnCheckin.classList.toggle('feito', jaFezCheckin);
    btnCheckin.innerHTML = jaFezCheckin? '<span>✓</span>' : '<span>📍</span>';

    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  }

  window.compartilharModal = function() {
    if (eventoModalAtual) compartilhar(eventoModalAtual.id);
  }

  window.fazerCheckin = function() {
    if (!eventoModalAtual) return;
    
    if (!navigator.geolocation) {
      alert('Geolocalização não suportada');
      return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
      const dist = calcularDistancia(
        pos.coords.latitude, pos.coords.longitude,
        eventoModalAtual.lat, eventoModalAtual.lng
      );
      
      if (dist > 0.1) { // 100m
        alert('Você precisa estar no local pra fazer check-in! 📍');
        return;
      }
      
      if (!checkinsUsuario.includes(eventoModalAtual.id)) {
        checkinsUsuario.push(eventoModalAtual.id);
        localStorage.setItem('checkins', JSON.stringify(checkinsUsuario));
        document.querySelector('.btn-checkin').classList.add('feito');
        document.querySelector('.btn-checkin').innerHTML = '<span>✓</span>';
        alert('Check-in feito! Você ganhou 10 pontos 🎉');
      } else {
        alert('Você já fez check-in nesse rolê!');
      }
    });
  }

  function confirmarPresencaModal(btn, id) {
    const evento = EVENTOS_MOCK.find(e => e.id === id);
    if (btn.classList.contains('confirmado')) {
      btn.classList.remove('confirmado');
      btn.innerHTML = `<span>GARANTIR MINHA VAGA</span><small>Restam <b>${Math.max(12, 100 - evento.bombando)}</b></small>`;
      evento.bombando--;
    } else {
      btn.classList.add('confirmado');
      btn.innerHTML = `<span>✓ VAGA GARANTIDA</span><small>Te vejo lá!</small>`;
      evento.bombando++;
    }
    document.getElementById('modal-bombando-full').textContent = evento.bombando;
    renderizarFeed(eventosFiltrados);
  }

  modalFechar.onclick = () => {
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
    clearInterval(countdownInterval);
    iniciarCountdowns();
  }

  document.querySelector('.modal-bg').onclick = () => {
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
    clearInterval(countdownInterval);
    iniciarCountdowns();
  }

  window.abrirStories = function(id) {
    storyAtual = STORIES_MOCK.find(s => s.id === id);
    storyIndex = 0;
    const modalStories = document.getElementById('modal-stories');
    modalStories.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    mostrarStoryAtual();
  }

  function mostrarStoryAtual() {
    if (!storyAtual) return;
    clearInterval(storyInterval);

    document.getElementById('stories-avatar').src = storyAtual.avatar;
    document.getElementById('stories-nome').textContent = storyAtual.nome;
    document.getElementById('stories-tempo').textContent = storyAtual.tempo;
    document.getElementById('stories-img').src = storyAtual.imagens[storyIndex];

    const progressoContainer = document.getElementById('stories-progresso');
    progressoContainer.innerHTML = storyAtual.imagens.map((_, i) => `
      <div class="barra"><div class="preenchido" style="width: ${i < storyIndex? 100 : i === storyIndex? 0 : 0}%"></div></div>
    `).join('');

    const barraAtual = progressoContainer.children[storyIndex]?.querySelector('.preenchido');
    let progresso = 0;
    storyInterval = setInterval(() => {
      progresso += 2;
      if (barraAtual) barraAtual.style.width = progresso + '%';
      if (progresso >= 100) {
        proximoStory();
      }
    }, 100);
  }

  function proximoStory() {
    if (storyIndex < storyAtual.imagens.length - 1) {
      storyIndex++;
      mostrarStoryAtual();
    } else {
      fecharStories();
    }
  }

  function fecharStories() {
    clearInterval(storyInterval);
    document.getElementById('modal-stories').classList.remove('ativo');
    document.body.style.overflow = '';
    storyAtual = null;
  }

  window.irParaRole = function() {
    if (storyAtual) {
      fecharStories();
      abrirModal(storyAtual.eventoId, 0);
    }
  }

  document.querySelector('.stories-fechar').onclick = fecharStories;
  document.getElementById('stories-img').onclick = proximoStory;

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

  document.querySelectorAll('.filtros button').forEach(btn => {
    btn.onclick = () => {
      document.querySelector('.filtro-ativo').classList.remove('filtro-ativo');
      btn.classList.add('filtro-ativo');
      const tag = btn.dataset.tag;
      
      if (tag === 'ranking') {
        document.getElementById('feed').style.display = 'none';
        document.getElementById('ranking-semanal').style.display = 'block';
        renderizarRanking();
      } else {
        document.getElementById('feed').style.display = 'block';
        document.getElementById('ranking-semanal').style.display = 'none';
        eventosFiltrados = tag === 'todos'? [...EVENTOS_MOCK] : EVENTOS_MOCK.filter(e => e.tags.includes(tag));
        renderizarFeed(eventosFiltrados);
        renderizarMapa(eventosFiltrados);
      }
    };
  });

  document.getElementById('btn-heatmap').onclick = toggleHeatmap;
  document.getElementById('btn-perto').onclick = buscarPertoDeMim;

  initMap();
  renderizarStories();
  renderizarFeed(EVENTOS_MOCK);
  renderizarMapa(EVENTOS_MOCK);

});
