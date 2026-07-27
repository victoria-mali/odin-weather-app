const elements = {
  searchBar: document.getElementById("city-search"),
  searchBtn: document.querySelector(".search-btn"),
  temperature: document.querySelector(".temperature"),
  conditions: document.querySelector(".conditions"),
  feelslike: document.querySelector(".temp-feels-like"),
  location: document.querySelector(".location"),
  celsiusBtn: document.querySelector(".celsius-btn"),
  fahrenheitBtn: document.querySelector(".fahrenheit-btn"),
};

function renderWeather(weatherObj) {
  if (elements.celsiusBtn.classList.contains("active-btn")) {
    elements.temperature.textContent = weatherObj.tempC + "°C";
    elements.feelslike.textContent =
      "Feels like " + weatherObj.feelslikeC + "°C";
  } else if (elements.fahrenheitBtn.classList.contains("active-btn")) {
    elements.temperature.textContent = weatherObj.tempF + "°F";
    elements.feelslike.textContent =
      "Feels like " + weatherObj.feelslikeF + "°F";
  }
  elements.conditions.textContent = weatherObj.conditions;
}

export { elements, renderWeather };
