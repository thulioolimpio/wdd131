document.addEventListener('DOMContentLoaded', () => {
  // Update year and last modified date
  const yearSpan = document.getElementById('year');
  const lastModifiedSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

  // Wind Chill Calculation
  const tempEl = document.getElementById('temperature');
  const speedEl = document.getElementById('windSpeed');
  const windChillSpan = document.getElementById('windChill');

  if (!tempEl || !speedEl || !windChillSpan) return;

  // Extract numeric values from the elements
  const temperature = parseFloat(tempEl.textContent);
  const windSpeed = parseFloat(speedEl.textContent);

  function calculateWindChill(temp, speed) {
    // Improved wind chill formula for metric units (°C and km/h)
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16));
  }

  // Validate inputs and calculate wind chill
  if (!isNaN(temperature) && !isNaN(windSpeed)) {
    // Conditions for wind chill calculation (temp ≤ 10°C and wind > 4.8 km/h)
    if (temperature <= 10 && windSpeed > 4.8) {
      const chill = calculateWindChill(temperature, windSpeed);
      windChillSpan.textContent = `${chill.toFixed(1)}°C`;
    } else {
      windChillSpan.textContent = 'N/A (not applicable)';
    }
  } else {
    windChillSpan.textContent = 'N/A (invalid data)';
  }
});