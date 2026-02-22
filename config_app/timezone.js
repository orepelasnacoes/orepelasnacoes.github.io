(function () {
  const API_KEY = "855bb7590f1d2c8d972805feca7798d5";

  function initCountryClimate(config) {
    if (!config) {
      console.error("Configuração não fornecida para initCountryClimate()");
      return;
    }

    const { timeZone, latitude, longitude } = config;

    if (!timeZone || !latitude || !longitude) {
      console.error("Parâmetros obrigatórios ausentes.");
      return;
    }

    function updateCountryTime() {
      const timeElement = document.getElementById("country-time");
      if (!timeElement) return;

      const now = new Date();
      const localTime = now.toLocaleTimeString("pt-BR", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

      timeElement.textContent = localTime;
    }

    function updateCountryTemperature() {
      const tempElement = document.getElementById("country-temperature");
      if (!tempElement) return;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt`;

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Erro na requisição");
          return response.json();
        })
        .then(data => {
          if (!data.main || typeof data.main.temp !== "number") {
            throw new Error("Resposta inesperada da API");
          }

          const temperature = Math.round(data.main.temp);
          tempElement.textContent = `${temperature}°C`;
        })
        .catch(error => {
          console.error("Erro ao obter temperatura:", error);
          tempElement.textContent = "--°C";
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
      updateCountryTime();
      updateCountryTemperature();

      // Atualiza hora a cada 1 min
      setInterval(updateCountryTime, 60000);

      // Atualiza temperatura a cada 30 min
      setInterval(updateCountryTemperature, 1800000);
    });
  }

  // Evita sobrescrever se já existir
  if (!window.initCountryClimate) {
    window.initCountryClimate = initCountryClimate;
  }
})();