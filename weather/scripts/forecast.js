const apiId = 'ed9769a71f9020927347e6771be83c82';
const weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast';
import { formatDate, getWeatherIcon } from './utils.js';

export async function getForecast(lat, lon) {
  let response = await fetch(`${weatherForecast}?lat=${lat}&lon=${lon}&appid=${apiId}&units=imperial`);
  let forecast = await response.json();

  input.value = '';
  cityList.classList.remove('active');
  clearResults();
  generateForecast(forecast.list, forecast.city)
}


function generateForecast(forecast, city) {
  filtered = forecast.filter((el, i) => {
    if(i % 8 === 0) {
      return el;
    }
  });
  console.log(forecast, city);
  weatherDisplay.insertAdjacentHTML('afterbegin', `<h3>Forecast for ${city.name}</h3>`);

  filtered.forEach(el => {
    // console.log(el);
    // console.log(formatDate(el.dt_txt));

    let display = `<div class="weather-data">
    <h3 class="location"><span>${formatDate(el.dt_txt)}</span></h3>
    <span class="temp">${Math.round(el.main.temp)}&deg;</span>
    <span class="icon">${getWeatherIcon(el.weather[0].id)}</span>
    <span class="desc">${el.weather[0].description}</span>
    </div>`;
    weatherDisplay.insertAdjacentHTML('beforeend', display);
    weatherDisplay.classList.add('active');
  })
}