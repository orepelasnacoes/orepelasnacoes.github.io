  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAgBbByAt6rIHdGXFLzP4ouAU6v046EjjM",
    authDomain: "orepelasnacoes-7c37a.firebaseapp.com",
    projectId: "orepelasnacoes-7c37a",
    storageBucket: "orepelasnacoes-7c37a.appspot.com",
    messagingSenderId: "1075211973772",
    appId: "1:1075211973772:web:3a142ceb5f3e4a562db7a9"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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

  const dataLocal = new Date();
  const fusoHorarioBrasilia = new Date(dataLocal.getTime() - dataLocal.getTimezoneOffset() * 60000);
  const todayDate = fusoHorarioBrasilia.toISOString().split('T')[0];
  const anoMes = todayDate.slice(0, 7);
  const countrySlug = window.location.pathname.replace(/^\//, '').replace(/\/.*/, '');
  const docId = `contagem_${anoMes}`;
  const storageKey = `orou_${countrySlug}_${todayDate}`;

  countText.style.display = 'none';
  verse.style.display = 'none';

  const jaOrouHoje = localStorage.getItem(storageKey);

  // 🔹 Controlar animação do botão
  if (!jaOrouHoje) {
    btnOpen.classList.add('pulse-active');
  } else {
    btnOpen.classList.remove('pulse-active');
    btnPray.disabled = true;
    btnPray.textContent = "Obrigado por orar!";
    mostrarContagem();
    verse.style.display = 'block';
    mostrarHistoricoDeOracoes();
  }

  function fecharDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    btnOpen.style.display = 'block';
    document.body.classList.remove('no-scroll');
  }

  btnOpen.addEventListener('click', () => {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    btnOpen.style.display = 'none';
    document.body.classList.add('no-scroll');
  });

  btnClose.addEventListener('click', fecharDrawer);
  backdrop.addEventListener('click', fecharDrawer);

  async function mostrarContagem() {
    const docRef = doc(db, 'oracoes', docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dados = docSnap.data();
      const total = Object.values(dados).reduce((soma, val) => typeof val === 'number' ? soma + val : soma, 0);
      const texto = total === 1 ? '<strong>1</strong> pessoa orou este mês. <span class="perfil-pais-ranking">Acompanhe o <a href="/p/ranking.html">Ranking de Oração</a>.</span>' : `<strong>${total}</strong> pessoas oraram este mês. <span class="perfil-pais-ranking">Acompanhe o <a href="/p/ranking.html">Ranking de Oração</a>.</span>`;
      countText.innerHTML = texto;
      countText.style.display = 'block';
    }
  }

  btnPray.addEventListener('click', async () => {
    btnPray.disabled = true;
    btnPray.textContent = "Obrigado por orar!";
    spinner.style.display = 'block';
    localStorage.setItem(storageKey, 'true');

    // Remover a animação quando o usuário orar
    btnOpen.classList.remove('pulse-active');

    const docRef = doc(db, 'oracoes', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();
      const atual = dados[countrySlug] || 0;
      await updateDoc(docRef, { [countrySlug]: atual + 1 });
    } else {
      await setDoc(docRef, { [countrySlug]: 1 });
    }

    await mostrarContagem();

    const nomePais = document.getElementById('pais-nome')?.textContent || 'Desconhecido';
    const bandeiraSrc = document.getElementById('pais-bandeira')?.src || '';
    const storageHistoricoKey = `historico_oracoes_${anoMes}`;
    const historico = JSON.parse(localStorage.getItem(storageHistoricoKey)) || [];

    const jaExiste = historico.some(item => item.nome === nomePais);
    if (!jaExiste && nomePais !== 'Desconhecido') {
      historico.push({ nome: nomePais, bandeira: bandeiraSrc, slug: countrySlug });
      localStorage.setItem(storageHistoricoKey, JSON.stringify(historico));
    }

    mostrarHistoricoDeOracoes();
    spinner.style.display = 'none';
    verse.style.display = 'block';
  });

  function mostrarHistoricoDeOracoes() {
    const storageHistoricoKey = `historico_oracoes_${anoMes}`;
    const historico = JSON.parse(localStorage.getItem(storageHistoricoKey)) || [];

    if (historico.length > 0) {
      const historicoOrdenado = [...historico].reverse();
      countryList.innerHTML = '';

      historicoOrdenado.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `/${item.slug}`;
        link.style.display = 'flex';
        link.style.alignItems = 'center';
        link.style.textDecoration = 'none';
        link.style.color = '#333';

        const img = document.createElement('img');
        img.src = item.bandeira;
        img.alt = `Bandeira de ${item.nome}`;

        const span = document.createElement('span');
        span.textContent = item.nome;

        link.appendChild(img);
        link.appendChild(span);
        li.appendChild(link);
        countryList.appendChild(li);
      });

      historyBox.style.display = 'block';
    } else {
      historyBox.style.display = 'none';
    }
  }
