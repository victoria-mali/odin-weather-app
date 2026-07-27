async function fetchWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HRB3NNMMG6T7J3CA8UJMY88L6`,
  );
  return await response.json();
}

async function processWeatherData(city) {
  const weatherData = await fetchWeatherData(city);
  const weatherDetails = {
    temp: weatherData.currentConditions.temp,
  };
  return weatherDetails;
}

export { processWeatherData };
