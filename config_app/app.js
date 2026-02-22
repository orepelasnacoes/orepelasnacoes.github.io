// ================================
// Script: nome_pais.js (inline)
// ================================
const paisNomeBase = document.getElementById("pais-nome");
if (paisNomeBase) {
  const nomePais = paisNomeBase.textContent.trim();
  if (nomePais) {
    document.querySelectorAll(".paisnome-js").forEach(el => {
      el.textContent = nomePais;
    });
  }
}

// ================================
// Script: organizacoes_ministerios.js (inline)
// ================================

document.addEventListener("DOMContentLoaded", function () {

  const paisEl = document.getElementById("pais-nome");
  const track = document.querySelector(".pais-carousel-track");

  // Se a página não tiver esses elementos, não faz nada
  if (!paisEl || !track) return;

  const pais = paisEl.textContent.trim();

  fetch("https://orepelasnacoes.github.io/data/organizations.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar JSON");
      }
      return response.json();
    })
    .then(data => {

      const orgs = data.filter(org =>
        Array.isArray(org.countries) &&
        org.countries.includes(pais)
      );

      if (!orgs.length) return;

      const criarGrupo = () => {
        const group = document.createElement("div");
        group.classList.add("pais-carousel-group");

        orgs.forEach(org => {

          const a = document.createElement("a");
          a.href = org.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer"; // segurança

          const img = document.createElement("img");
          img.src = org.logo;
          img.alt = org.alt || (org.name + " logo");

          a.appendChild(img);
          group.appendChild(a);
        });

        return group;
      };

      const group1 = criarGrupo();
      const group2 = criarGrupo();

      track.innerHTML = "";
      track.appendChild(group1);
      track.appendChild(group2);

    })
    .catch(error => {
      console.error("Erro ao carregar organizations.json:", error);
    });

});

// ================================
// Script: botão expandir (inline)
// ================================

document.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("perfil-pais-expandirBtn");
  const conteudos = document.querySelectorAll(".perfil-pais-conteudo-expandivel");

  if (!btn || !conteudos.length) return;

  let expanded = false;

  btn.addEventListener("click", function () {

    expanded = !expanded;

    conteudos.forEach(function (conteudo) {
      conteudo.style.maxHeight = expanded
        ? conteudo.scrollHeight + "px"
        : "3.6rem";
    });

    btn.innerHTML = expanded
      ? '<i class="fa-solid fa-chevron-up"></i>'
      : '<i class="fa-solid fa-chevron-down"></i>';

    btn.classList.toggle("expandido", expanded);

  });

});

// ================================
// Script: Timezone config (inline)
// ================================

(function () {
  const API_KEY = "855bb7590f1d2c8d972805feca7798d5";

  function initCountryClimate(config) {
    if (!config) {
      console.error("Configuração não fornecida para initCountryClimate()");
      return;
    }

    const { timeZone, latitude, longitude } = config;

    if (!timeZone || !latitude || !longitude) {
      console.error("Parâmetros obrigatórios ausentes.");
      return;
    }

    function updateCountryTime() {
      const timeElement = document.getElementById("country-time");
      if (!timeElement) return;

      const now = new Date();
      const localTime = now.toLocaleTimeString("pt-BR", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

      timeElement.textContent = localTime;
    }

    function updateCountryTemperature() {
      const tempElement = document.getElementById("country-temperature");
      if (!tempElement) return;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt`;

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Erro na requisição");
          return response.json();
        })
        .then(data => {
          if (!data.main || typeof data.main.temp !== "number") {
            throw new Error("Resposta inesperada da API");
          }

          const temperature = Math.round(data.main.temp);
          tempElement.textContent = `${temperature}°C`;
        })
        .catch(error => {
          console.error("Erro ao obter temperatura:", error);
          tempElement.textContent = "--°C";
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
      updateCountryTime();
      updateCountryTemperature();

      // Atualiza hora a cada 1 min
      setInterval(updateCountryTime, 60000);

      // Atualiza temperatura a cada 30 min
      setInterval(updateCountryTemperature, 1800000);
    });
  }

  // Evita sobrescrever se já existir
  if (!window.initCountryClimate) {
    window.initCountryClimate = initCountryClimate;
  }
})();

// ================================
// Script: feed_historias.js (inline)
// ================================

function recentpostslist(json) {
  const container = document.querySelector(".historias-grandecomissao");
  const track = document.getElementById("ore-recent-posts-track");

  if (!container || !track) return;

  if (!json.feed.entry || json.feed.entry.length === 0) {
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");

  json.feed.entry.forEach((entry) => {
    const link = entry.link.find((l) => l.rel === "alternate")?.href || "#";
    const title = entry.title?.$t || "Sem título";

    const div = document.createElement("div");
    div.innerHTML = entry.summary ? entry.summary.$t : "";
    let summary = (div.textContent || div.innerText || "").trim() || "Sem resumo disponível";
    if (summary.length > 150) summary = summary.slice(0, 150) + "...";

    const img =
      entry.media$thumbnail?.url
        ? entry.media$thumbnail.url.replace("/s72-c", "/s600")
        : "https://via.placeholder.com/300x180?text=Sem+Imagem";

    const card = document.createElement("div");
    card.className = "ore-recent-post-card";
    card.innerHTML = `
      <div class="ore-recent-post-image">
        <img src="${img}" alt="${title}">
      </div>
      <div class="ore-recent-post-content">
        <h3>${title}</h3>
        <p>${summary}</p>
        <a href="${link}" target="_blank" rel="noopener">Leia mais ›</a>
      </div>`;

    track.appendChild(card);
  });
}

function oreSlidePosts(dir) {
  const track = document.getElementById("ore-recent-posts-track");
  if (!track) return;

  const step = 320;
  track.scrollBy({ left: dir * step, behavior: "smooth" });
}

// ================================
// Script: info_modal.js (inline)
// ================================

document.addEventListener("DOMContentLoaded", function () {

  /* --- CONTROLE DE SCROLL ---------------------------------------- */
  function bloquearScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function liberarScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  function algumModalAberto() {
    return Array.from(document.querySelectorAll('.perfil-modal'))
      .some(modal => modal.style.display === 'flex');
  }

  /* --- ABRIR / FECHAR MODAIS ------------------------------------- */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.style.display = 'flex';
      bloquearScroll();
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.style.display = 'none';
      if (!algumModalAberto()) liberarScroll();
    }
  }

  /* --- BOTÕES PRINCIPAIS ----------------------------------------- */
  const btnDetalhes = document.getElementById('btn-detalhes');
  const btnCompartilhar = document.getElementById('btn-compartilhar');

  if (btnDetalhes) {
    btnDetalhes.onclick = function (e) {
      e.preventDefault();
      openModal('modal-detalhes');
    };
  }

  if (btnCompartilhar) {
    btnCompartilhar.onclick = function (e) {
      e.preventDefault();
      openModal('modal-share');
    };
  }

  /* --- FECHAR POR BOTÃO X ---------------------------------------- */
  document.querySelectorAll('.perfil-modal-close').forEach(el => {
    el.onclick = () => closeModal(el.dataset.close);
  });

  /* --- FECHAR CLICANDO FORA -------------------------------------- */
  document.querySelectorAll('.perfil-modal').forEach(m => {
    m.onclick = e => {
      if (e.target === m) closeModal(m.id);
    };
  });

  /* --- TÍTULO DINÂMICO DO MODAL ---------------------------------- */
  const paisNome = document.getElementById("pais-nome")?.textContent.trim();
  const spanPais = document.getElementById("modal-pais-nome");

  if (paisNome && spanPais) {
    spanPais.textContent = paisNome;
  }

  /* --- LINKS DE COMPARTILHAMENTO --------------------------------- */
  const prayFor = document.getElementById("prayFor")?.textContent.trim();
  const pageUrl = window.location.href;

  if (prayFor && paisNome) {

    const shareText = `${prayFor} ${paisNome} | Para saber mais, acesse: ${pageUrl}`;
    const encodedText = encodeURIComponent(shareText);

    document.getElementById('share-whatsapp')
      ?.setAttribute('href', `https://wa.me/?text=${encodedText}`);

    document.getElementById('share-facebook')
      ?.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodedText}`);

    document.getElementById('share-twitter')
      ?.setAttribute('href', `https://x.com/intent/tweet?text=${encodedText}`);

    document.getElementById('share-telegram')
      ?.setAttribute('href', `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodedText}`);
  }

});


// ================================
// Script: video_modal.js (inline)
// ================================

(function () {

  function initVideoModal(videoId) {
    if (!videoId) {
      console.error("VIDEO_ID não informado.");
      return;
    }

    document.addEventListener("DOMContentLoaded", function () {

      const gatilho = document.getElementById("perfil-pais-video-trigger");
      const modal = document.getElementById("perfil-pais-video-modal");
      const fecharBtn = document.getElementById("perfil-pais-video-close");
      const iframe = document.getElementById("perfil-pais-video-frame");

      if (!gatilho || !modal || !fecharBtn || !iframe) {
        console.warn("Elementos do modal de vídeo não encontrados.");
        return;
      }

      function bloquearScroll() {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      }

      function liberarScroll() {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }

      function fecharModal() {
        modal.style.display = "none";
        iframe.src = "";
        liberarScroll();
      }

      // --- ABRIR MODAL ---
      gatilho.addEventListener("click", function (e) {
        e.preventDefault();

        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.style.display = "flex";
        bloquearScroll();
      });

      // --- FECHAR MODAL ---
      fecharBtn.addEventListener("click", fecharModal);

      modal.addEventListener("click", function (e) {
        if (e.target === modal) fecharModal();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.style.display === "flex") {
          fecharModal();
        }
      });

    });
  }

  if (!window.initVideoModal) {
    window.initVideoModal = initVideoModal;
  }

})();

// ================================
// Script: footer_config.js (inline)
// ================================

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    // 1️⃣ Alterar imagem superior do rodapé (fixo)
    const img = document.querySelector("#footer-image");
    if (img) {
      img.src = "https://orepelasnacoes.github.io/assets/rodape-perfil-pais.png";
    }

    // 2️⃣ Puxar nome do país automaticamente
    const paisNomeEl = document.getElementById("pais-nome");
    const nomePais = paisNomeEl ? paisNomeEl.textContent.trim() : "";

    // 3️⃣ Alterar título com nome automático
    const titulo = document.querySelector("#intro-author-wrap .service-title");
    if (titulo && nomePais) {
      titulo.innerHTML =
        `<i>“Porque Deus amou o <strong class='pais-destaque'>${nomePais}</strong> de tal maneira que deu o seu Filho unigênito...”</i>`;
    }

    // 4️⃣ Alterar descrição (fixo)
    const descricao = document.querySelector("#intro-author-wrap .service-snippet");
    if (descricao) {
      descricao.innerHTML = "— João 3:16";
    }

    // 5️⃣ Alterar botão (fixo)
    const botaoContainer = document.querySelector("#intro-author-wrap .service-action");
    if (botaoContainer) {
      botaoContainer.innerHTML =
        `<a href="/p/nacoes.html">Todas as nações →</a>`;
    }

  });

})();