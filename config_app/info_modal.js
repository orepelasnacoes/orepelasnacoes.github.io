document.addEventListener("DOMContentLoaded", function () {

  /* --- controle de scroll -----------------------------------------*/
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

  /* --- abre/fecha -------------------------------------------------*/
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

  const btnDetalhes = document.getElementById('btn-detalhes');
  const btnCompartilhar = document.getElementById('btn-compartilhar');

  if (btnDetalhes) {
    btnDetalhes.onclick = e => {
      e.preventDefault();
      openModal('modal-detalhes');
    };
  }

  if (btnCompartilhar) {
    btnCompartilhar.onclick = e => {
      e.preventDefault();
      openModal('modal-share');
    };
  }

  document.querySelectorAll('.perfil-modal-close').forEach(el => {
    el.onclick = () => closeModal(el.dataset.close);
  });

  document.querySelectorAll('.perfil-modal').forEach(m => {
    m.onclick = e => {
      if (e.target === m) closeModal(m.id);
    };
  });

  /* --- 🔹 TÍTULO DINÂMICO DO MODAL -------------------------------*/
  const paisNome = document.getElementById("pais-nome")?.textContent.trim();
  const tituloModal = document.querySelector("#modal-detalhes h2");

  if (paisNome && tituloModal) {
    tituloModal.textContent = `Sobre o ${paisNome}`;
  }

  /* --- links de compartilhamento ---------------------------------*/
  const prayFor = document.getElementById("prayFor")?.textContent.trim();
  const pageUrl = window.location.href;

  if (prayFor && paisNome) {
    const shareText = `${prayFor} ${paisNome} | Para saber mais, acesse: ${pageUrl}`;
    const encodedText = encodeURIComponent(shareText);

    document.getElementById('share-whatsapp')?.setAttribute('href',
      `https://wa.me/?text=${encodedText}`);

    document.getElementById('share-facebook')?.setAttribute('href',
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodedText}`);

    document.getElementById('share-twitter')?.setAttribute('href',
      `https://x.com/intent/tweet?text=${encodedText}`);

    document.getElementById('share-telegram')?.setAttribute('href',
      `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodedText}`);
  }

});