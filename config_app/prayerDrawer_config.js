// config_app/prayer_drawer.js
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { initFirebase } from "./firebase_config.js";

document.addEventListener('DOMContentLoaded', async () => {

  const db = initFirebase();

  /* --- elementos ------------------------------------------------ */
  const btnOpen = document.getElementById('prayerDrawer-button');
  const drawer = document.getElementById('prayerDrawer-panel');
  const btnClose = document.getElementById('prayerDrawer-close');
  const btnPray = document.getElementById('prayerDrawer-prayBtn');
  const countText = document.getElementById('prayerDrawer-count');
  const backdrop = document.getElementById('prayerDrawer-backdrop');
  const verse = document.getElementById('prayerDrawer-verse');
  const spinner = document.getElementById('prayerDrawer-spinner');
  const historyBox = document.getElementById('prayerDrawer-history');
  const countryList = document.getElementById('prayerDrawer-countryList');

  if (!btnOpen || !drawer || !btnPray) return;

  /* --- datas / slug --------------------------------------------- */
  const now = new Date();
  const brasilia = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const today = brasilia.toISOString().split('T')[0];
  const anoMes = today.slice(0, 7);
  const countrySlug = location.pathname.replace(/^\/|\/.*$/g, '');

  const docId = `contagem_${anoMes}`;
  const storageKey = `orou_${countrySlug}_${today}`;

  countText.style.display = 'none';
  verse.style.display = 'none';

  const jaOrouHoje = localStorage.getItem(storageKey);

  if (!jaOrouHoje) {
    btnOpen.classList.add('pulse-active');
  } else {
    btnOpen.classList.remove('pulse-active');
    btnPray.disabled = true;
    btnPray.textContent = "Obrigado por orar!";
    await mostrarContagem();
    verse.style.display = 'block';
    mostrarHistorico();
  }

  /* --- drawer --------------------------------------------------- */
  function fecharDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    btnOpen.style.display = 'block';
    document.body.classList.remove('no-scroll');
  }

  btnOpen.onclick = () => {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    btnOpen.style.display = 'none';
    document.body.classList.add('no-scroll');
  };

  btnClose.onclick = fecharDrawer;
  backdrop.onclick = fecharDrawer;

  /* --- firestore ----------------------------------------------- */
  async function mostrarContagem() {
    const ref = doc(db, 'oracoes', docId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const total = Object.values(snap.data())
      .filter(v => typeof v === 'number')
      .reduce((a, b) => a + b, 0);

    countText.innerHTML =
      total === 1
        ? `<strong>1</strong> pessoa orou este mês. <span class="perfil-pais-ranking"><a href="/p/ranking.html">Ranking de Oração</a></span>`
        : `<strong>${total}</strong> pessoas oraram este mês. <span class="perfil-pais-ranking"><a href="/p/ranking.html">Ranking de Oração</a></span>`;

    countText.style.display = 'block';
  }

  btnPray.onclick = async () => {
    btnPray.disabled = true;
    btnPray.textContent = "Obrigado por orar!";
    spinner.style.display = 'block';

    localStorage.setItem(storageKey, 'true');
    btnOpen.classList.remove('pulse-active');

    const ref = doc(db, 'oracoes', docId);
    const snap = await getDoc(ref);

    const atual = snap.exists() ? snap.data()[countrySlug] || 0 : 0;
    snap.exists()
      ? await updateDoc(ref, { [countrySlug]: atual + 1 })
      : await setDoc(ref, { [countrySlug]: 1 });

    await mostrarContagem();
    mostrarHistorico();

    spinner.style.display = 'none';
    verse.style.display = 'block';
  };

  function mostrarHistorico() {
    const key = `historico_oracoes_${anoMes}`;
    const historico = JSON.parse(localStorage.getItem(key)) || [];
    if (!historico.length) return;

    countryList.innerHTML = '';
    historico.reverse().forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="/${p.slug}"><img src="${p.bandeira}"><span>${p.nome}</span></a>`;
      countryList.appendChild(li);
    });

    historyBox.style.display = 'block';
  }

});
