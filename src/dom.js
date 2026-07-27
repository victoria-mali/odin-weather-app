const elements = {
  searchBar: document.getElementById("city-search"),
  searchBtn: document.querySelector(".search-btn"),
  temperature: document.querySelector(".temperature"),
};

function renderWeather(weatherObj) {
  elements.temperature.textContent = weatherObj.temp;
}

export { elements, renderWeather };
