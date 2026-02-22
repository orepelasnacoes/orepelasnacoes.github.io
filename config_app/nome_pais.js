document.addEventListener("DOMContentLoaded", function () {

  const paisNomeBase = document.getElementById("pais-nome");
  if (!paisNomeBase) return;

  const nomePais = paisNomeBase.textContent.trim();
  if (!nomePais) return;

  document.querySelectorAll(".paisnome-js")
    .forEach(el => el.textContent = nomePais);

});