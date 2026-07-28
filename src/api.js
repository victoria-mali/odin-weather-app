async function fetchWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=HRB3NNMMG6T7J3CA8UJMY88L6`,
  );
  return await response.json();
}

function celcToFahr(n) {
  return Math.round((n * 9.0) / 5.0 + 32.0);
}


async function processWeatherData(city) {
  try {
    const weatherData = await fetchWeatherData(city);
    console.log(weatherData);
    let weatherDetails = {
      tempC: Math.round(weatherData.currentConditions.temp),
      tempF: celcToFahr(weatherData.currentConditions.temp),
      conditions: weatherData.currentConditions.conditions,
      feelslikeC: Math.round(weatherData.currentConditions.feelslike),
      feelslikeF: celcToFahr(weatherData.currentConditions.feelslike),
      icon: weatherData.currentConditions.icon,
      location: weatherData.resolvedAddress,
    };
    return weatherDetails;
  } catch (error) {
    console.log(error.message);
  }
}

export { processWeatherData };
