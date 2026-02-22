function recentpostslist(json) {
  const container = document.querySelector(".historias-grandecomissao");
  const track = document.getElementById("ore-recent-posts-track");

  if (!container || !track) return;

  if (!json.feed.entry || json.feed.entry.length === 0) {
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");

  json.feed.entry.forEach((entry) => {
    const link = entry.link.find((l) => l.rel === "alternate")?.href || "#";
    const title = entry.title?.$t || "Sem título";

    const div = document.createElement("div");
    div.innerHTML = entry.summary ? entry.summary.$t : "";
    let summary = (div.textContent || div.innerText || "").trim() || "Sem resumo disponível";
    if (summary.length > 150) summary = summary.slice(0, 150) + "...";

    const img =
      entry.media$thumbnail?.url
        ? entry.media$thumbnail.url.replace("/s72-c", "/s600")
        : "https://via.placeholder.com/300x180?text=Sem+Imagem";

    const card = document.createElement("div");
    card.className = "ore-recent-post-card";
    card.innerHTML = `
      <div class="ore-recent-post-image">
        <img src="${img}" alt="${title}">
      </div>
      <div class="ore-recent-post-content">
        <h3>${title}</h3>
        <p>${summary}</p>
        <a href="${link}" target="_blank" rel="noopener">Leia mais ›</a>
      </div>`;

    track.appendChild(card);
  });
}

function oreSlidePosts(dir) {
  const track = document.getElementById("ore-recent-posts-track");
  if (!track) return;

  const step = 320;
  track.scrollBy({ left: dir * step, behavior: "smooth" });
}