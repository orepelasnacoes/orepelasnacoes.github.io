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