const paisNomeBase = document.getElementById("pais-nome");
if (paisNomeBase) {
  const nomePais = paisNomeBase.textContent.trim();
  if (nomePais) {
    document.querySelectorAll(".paisnome-js")
      .forEach(el => el.textContent = nomePais);
  }
}