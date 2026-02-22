document.addEventListener("DOMContentLoaded", function () {

  const paisEl = document.getElementById("pais-nome");
  const track = document.querySelector(".pais-carousel-track");

  // Se a página não tiver esses elementos, não faz nada
  if (!paisEl || !track) return;

  const pais = paisEl.textContent.trim();

  fetch("https://orepelasnacoes.github.io/data/organizations.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar JSON");
      }
      return response.json();
    })
    .then(data => {

      const orgs = data.filter(org =>
        Array.isArray(org.countries) &&
        org.countries.includes(pais)
      );

      if (!orgs.length) return;

      const criarGrupo = () => {
        const group = document.createElement("div");
        group.classList.add("pais-carousel-group");

        orgs.forEach(org => {

          const a = document.createElement("a");
          a.href = org.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer"; // segurança

          const img = document.createElement("img");
          img.src = org.logo;
          img.alt = org.alt || (org.name + " logo");

          a.appendChild(img);
          group.appendChild(a);
        });

        return group;
      };

      const group1 = criarGrupo();
      const group2 = criarGrupo();

      track.innerHTML = "";
      track.appendChild(group1);
      track.appendChild(group2);

    })
    .catch(error => {
      console.error("Erro ao carregar organizations.json:", error);
    });

});