document.addEventListener('DOMContentLoaded', () => {

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
    if (!modal) return;

    modal.style.display = 'flex';
    bloquearScroll();
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = 'none';
    if (!algumModalAberto()) liberarScroll();
  }

  /* --- botões -----------------------------------------------------*/
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

  /* --- compartilhamento ------------------------------------------*/
  const prayForEl = document.getElementById('prayFor');
  const countryEl = document.getElementById('pais-nome');

  if (!prayForEl || !countryEl) return;

  const prayFor = prayForEl.textContent.trim();
  const country = countryEl.textContent.trim();
  const pageUrl = window.location.href;

  const shareText = `${prayFor} ${country} | Para saber mais, acesse: ${pageUrl}`;
  const encodedText = encodeURIComponent(shareText);

  const setHref = (id, url) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  };

  setHref('share-whatsapp', `https://wa.me/?text=${encodedText}`);
  setHref(
    'share-facebook',
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodedText}`
  );
  setHref('share-twitter', `https://x.com/intent/tweet?text=${encodedText}`);
  setHref(
    'share-telegram',
    `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodedText}`
  );

});
