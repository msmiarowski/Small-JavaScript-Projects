const form = document.getElementById('weather-form');
const input = document.getElementById('weather-input');
const weatherDisplay = document.getElementById('weather');
const apiId = 'ed9769a71f9020927347e6771be83c82';
const currentWeather = 'https://api.openweathermap.org/data/2.5/weather';
const forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
const weatherByCity = 'https://api.openweathermap.org/geo/1.0/direct';

// on load ask for location
window.addEventListener('load', () => {
  navigator.geolocation.getCurrentPosition(
    // success callback - user allowed their local weather
    getLocalWeather,
    // error callback - user won't allow their location
    // () => console.log('error')
    getDefaultFive
  );
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if(!input.value) return;
  
  if(parseInt(input.value)) {
    // if number
    console.log(input.value);
  } else {
    // string
    console.log(input.value)    
  }
});


async function getLocalWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getCurrentWeather(lat, lon);
}

// call weather api
async function getCurrentWeather(lat, lon) {
  let response = await fetch(`${currentWeather}?lat=${lat}&lon=${lon}&appid=${apiId}&units=imperial`);
  let weather = await response.json();

  generateView(weather);
}

// user did not allow location
async function getDefaultFive() {
  const defaultCities = ['New York City', 'London', 'Montreal', 'Tokyo', 'Sydney'];
  
  for(let i = 0; i < defaultCities.length; i++) {
    let response = await fetch(`${weatherByCity}?q=${defaultCities[i]}&appid=${apiId}`);
    let weather = await response.json();

    getCurrentWeather(weather[0].lat, weather[0].lon);
  }
}

function getForecast() {
  console.log(`${forecast}?lat=${lat}&lon=${lon}&appid=${apiId}`);
}

// generate DOM view
function generateView(data) {
  // console.log(data);
  let display = `<div class="weather-data">
    <h3 class="location"><span>${data.name}</span><sup>${data.sys.country}</sup></h3>
    <span class="temp">${Math.round(data.main.temp)}&deg;</span>
    <span class="icon">${weatherIcon(data.weather[0].id)}</span>
    <span class="desc">${data.weather[0].description}</span>
    </div>`;
  // weatherDisplay.insertAdjacentHTML('afterbegin', ``);
  weatherDisplay.insertAdjacentHTML('beforeend', display);
  weatherDisplay.classList.add('active');
}

function weatherIcon(id) {
  let icon = '';

  if(id <= 299) icon = '<i class="fa-solid fa-cloud-bolt"></i>'; // thunder
  if(id >= 300 && id <= 399) icon = '<i class="fa-solid fa-cloud-rain"></i>'; // drizzle
  if(id >= 500 && id <= 599) icon = '<i class="fa-solid fa-cloud-showers-heavy"></i>'; // rain
  if(id >= 600 && id <= 699) icon = '<i class="fa-regular fa-snowflake"></i>'; //snow
  if(id >= 700 && id <= 799) icon = '<i class="fa-solid fa-smog"></i>'; // atmosphere (mist/smoke/haze...)
  if(id === 800) icon = '<i class="fa-regular fa-sun"></i>'; // clear
  if(id >= 801 && id <= 899) icon = '<i class="fa-solid fa-cloud"></i>'; // clouds

  return icon;
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  OBJECT RESPONSE STRUCTURE FOR REFERENCE
  units=imperial 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    base: "stations"
    clouds: Object { all: 0 }
    cod: 200
    coord: Object { lon: -83.74, lat: 42.27 }
    dt: 1667847096
    id: 4984247
    main: Object { 
      ​​feels_like: 52.16
      ​​humidity: 35
      ​​pressure: 1028
      ​​temp: 55.29
      ​​temp_max: 58.14
      ​​temp_min: 52.18
    na​​me: "Ann Arbor"
    sy​s: Object {
      country: "US"
      id: 2010414
      sunrise: 1667823335
      sunset: 1667859704
      type: 2
    }
    timezone: -18000
    ​visibility: 10000
    ​weather: Array [
    ​​  0: Object {
        description: "clear sky"
        icon: "01d"
        id: 800
        main: "Clear"
      }
    ​​]
    wind: Object { speed: 13.8, deg: 290, gust: 21.85 }
    deg: 290
    gust: 21.85
    speed: 13.8
  }

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */