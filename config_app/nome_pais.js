(function () {

  function aplicarNomePais() {
    const paisNomeBase = document.getElementById("pais-nome");
    if (!paisNomeBase) return;

    const nomePais = paisNomeBase.textContent.trim();
    if (!nomePais) return;

    document.querySelectorAll(".paisnome-js")
      .forEach(el => el.textContent = nomePais);
  }

  document.addEventListener("DOMContentLoaded", function () {

    // Tenta aplicar imediatamente
    aplicarNomePais();

    // Observa mudanças no #pais-nome
    const observer = new MutationObserver(() => {
      aplicarNomePais();
    });

    const alvo = document.getElementById("pais-nome");
    if (alvo) {
      observer.observe(alvo, { childList: true, subtree: true });
    }

  });

})();