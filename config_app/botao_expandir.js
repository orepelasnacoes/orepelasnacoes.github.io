document.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("perfil-pais-expandirBtn");
  const conteudos = document.querySelectorAll(".perfil-pais-conteudo-expandivel");

  if (!btn || !conteudos.length) return;

  let expanded = false;

  btn.addEventListener("click", function () {

    expanded = !expanded;

    conteudos.forEach(function (conteudo) {
      conteudo.style.maxHeight = expanded
        ? conteudo.scrollHeight + "px"
        : "3.6rem";
    });

    btn.innerHTML = expanded
      ? '<i class="fa-solid fa-chevron-up"></i>'
      : '<i class="fa-solid fa-chevron-down"></i>';

    btn.classList.toggle("expandido", expanded);

  });

});