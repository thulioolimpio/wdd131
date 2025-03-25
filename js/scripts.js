document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  const lastModifiedSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

  const tempEl = document.getElementById('temperature');
  const speedEl = document.getElementById('windSpeed');
  const windChillSpan = document.getElementById('windChill');

  if (!tempEl || !speedEl || !windChillSpan) return;

  const temperature = parseFloat(tempEl.textContent.replace(/[^\d.-]/g, ''));
  const windSpeed = parseFloat(speedEl.textContent.replace(/[^\d.-]/g, ''));

  function calculateWindChill(temp, speed) {
    // Fórmula oficial em Celsius
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
  }

  if (!isNaN(temperature) && !isNaN(windSpeed)) {
    if (temperature <= 10 && windSpeed > 4.8) {
      const chill = calculateWindChill(temperature, windSpeed);
      windChillSpan.textContent = chill.toFixed(1) + '°C';
    } else {
      windChillSpan.textContent = 'N/A';
    }
  } else {
    windChillSpan.textContent = 'N/A';
  }
});
