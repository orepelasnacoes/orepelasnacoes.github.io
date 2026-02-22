(function () {
  function initCountryClimate(config) {
    const { timeZone, latitude, longitude, apiKey } = config;

    function updateCountryTime() {
      const now = new Date();
      const localTime = now.toLocaleTimeString("pt-BR", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const timeElement = document.getElementById("country-time");
      if (timeElement) timeElement.textContent = localTime;
    }

    function updateCountryTemperature() {
      const tempElement = document.getElementById("country-temperature");
      if (!tempElement) return;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`;

      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Erro na API");
          return response.json();
        })
        .then((data) => {
          const temperature = Math.round(data.main.temp);
          tempElement.textContent = `${temperature}°C`;
        })
        .catch((error) => {
          console.error("Erro ao obter temperatura:", error);
          tempElement.textContent = "--°C";
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
      updateCountryTime();
      updateCountryTemperature();

      setInterval(updateCountryTime, 60000);
      setInterval(updateCountryTemperature, 1800000);
    });
  }

  // expõe globalmente
  window.initCountryClimate = initCountryClimate;
})();