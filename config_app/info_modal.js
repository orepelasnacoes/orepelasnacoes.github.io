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