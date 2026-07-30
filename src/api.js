async function fetchWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=HRB3NNMMG6T7J3CA8UJMY88L6`;
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Can't reach the weather service. Check your connection.");
  }

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(`We couldn't find "${location}". Check the spelling.`);
    }
    if (response.status === 429) {
      throw new Error("Too many requests today. Please try again tomorrow.");
    }
    throw new Error(`Weather service error (${response.status}).`);
  }
  return response.json();
}

function celcToFahr(n) {
  return Math.round((n * 9.0) / 5.0 + 32.0);
}

async function processWeatherData(city) {
  const weatherData = await fetchWeatherData(city);
  console.log(weatherData);
  let weatherDetails = {
    weather: {
      tempC: Math.round(weatherData.currentConditions.temp),
      tempF: celcToFahr(weatherData.currentConditions.temp),
      conditions: weatherData.currentConditions.conditions,
      feelslikeC: Math.round(weatherData.currentConditions.feelslike),
      feelslikeF: celcToFahr(weatherData.currentConditions.feelslike),
      icon: weatherData.currentConditions.icon,
      location: weatherData.resolvedAddress,
      precip: weatherData.currentConditions.precip,
      precipprob: weatherData.currentConditions.precipprob,
      humidity: weatherData.currentConditions.humidity,
      sunrise: weatherData.currentConditions.sunrise,
      sunset: weatherData.currentConditions.sunset,
      uvindex: weatherData.currentConditions.uvindex,
      windspeed: weatherData.currentConditions.windspeed,
      pressure: weatherData.currentConditions.pressure,
      description: weatherData.description,
      date: weatherData.days[0].datetime,
    },
    forecast: [
      {
        tempC: Math.round(weatherData.days[0].temp),
        tempF: celcToFahr(weatherData.days[0].temp),
        date: weatherData.days[0].datetime,
        icon: weatherData.days[0].icon,
      },
      {
        tempC: Math.round(weatherData.days[1].temp),
        tempF: celcToFahr(weatherData.days[1].temp),
        date: weatherData.days[1].datetime,
        icon: weatherData.days[1].icon,
      },
      {
        tempC: Math.round(weatherData.days[2].temp),
        tempF: celcToFahr(weatherData.days[2].temp),
        date: weatherData.days[2].datetime,
        icon: weatherData.days[2].icon,
      },
      {
        tempC: Math.round(weatherData.days[3].temp),
        tempF: celcToFahr(weatherData.days[3].temp),
        date: weatherData.days[3].datetime,
        icon: weatherData.days[3].icon,
      },
      {
        tempC: Math.round(weatherData.days[4].temp),
        tempF: celcToFahr(weatherData.days[4].temp),
        date: weatherData.days[4].datetime,
        icon: weatherData.days[4].icon,
      },
    ],
  };

  return weatherDetails;
}

export { processWeatherData };
