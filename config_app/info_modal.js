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
    document.getElementById(id).style.display = 'flex';
    bloquearScroll();
  }

  function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (!algumModalAberto()) liberarScroll();
  }

  document.getElementById('btn-detalhes').onclick = e => {
    e.preventDefault();
    openModal('modal-detalhes');
  };

  document.getElementById('btn-compartilhar').onclick = e => {
    e.preventDefault();
    openModal('modal-share');
  };

  document.querySelectorAll('.perfil-modal-close').forEach(el => {
    el.onclick = () => closeModal(el.dataset.close);
  });

  document.querySelectorAll('.perfil-modal').forEach(m => {
    m.onclick = e => {
      if (e.target === m) closeModal(m.id);
    };
  });

  /* --- links de compartilhamento ---------------------------------*/
// Pega partes do texto
const prayFor = document.getElementById("prayFor").textContent.trim();
const country = document.getElementById("pais-nome").textContent.trim();
const pageUrl = window.location.href;

// Monta o texto completo
const shareText = `${prayFor} ${country} | Para saber mais, acesse: ${pageUrl}`;
const encodedText = encodeURIComponent(shareText);

// Links de compartilhamento
document.getElementById('share-whatsapp').href = `https://wa.me/?text=${encodedText}`;
document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodedText}`;
document.getElementById('share-twitter').href = `https://x.com/intent/tweet?text=${encodedText}`;
document.getElementById('share-telegram').href = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodedText}`;