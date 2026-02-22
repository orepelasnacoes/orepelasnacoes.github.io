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