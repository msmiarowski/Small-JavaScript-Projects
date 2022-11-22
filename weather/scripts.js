const form = document.getElementById('weather-form');
const formWrapper = document.getElementById('form-wrap');
const input = document.getElementById('weather-input');
const cityList = document.getElementById('city-list');
const weatherDisplay = document.getElementById('weather');
const apiId = 'ed9769a71f9020927347e6771be83c82';
const currentWeather = 'https://api.openweathermap.org/data/2.5/weather';
const weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const weatherByCity = 'https://api.openweathermap.org/geo/1.0/direct';
const weatherByZip = 'https://api.openweathermap.org/geo/1.0/zip';

let prevValue = '';
let searchList = '';

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

document.addEventListener('click', e => {
  if(!formWrapper.contains(e.target)) {
    if(cityList.classList.contains('active')) {
      cityList.classList.remove('active');
    }
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if(!input.value) return;
  
  if(parseInt(input.value)) {
    // if number (i.e. - zip code)
    clearResults();
    searchWeather(`${weatherByZip}?zip=${input.value}&appid=${apiId}`);
  } else {
    // string - get weather by city name
    clearResults();
    searchWeather(`${weatherByCity}?q=${input.value}&limit=10&appid=${apiId}`);
  }
});

async function searchWeather(query) {
  let city = await getCityInfo(query);
  if(city.length > 0) {
    getForecast(city[0].lat, city[0].lon, city[0]);
  } else {
    getForecast(city.lat, city.lon, city);
  }
  
}

function clearResults() {
  while(weatherDisplay.firstChild) {
    weatherDisplay.removeChild(weatherDisplay.firstChild);
  }
}

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
const getInputValue = debounce(async (value) => {
  if(!value) {
    cityList.innerHTML = '';
    cityList.classList.remove('active');
    return;
  }
  if(prevValue == value) return;
  
  let cities = await getCityInfo(`${weatherByCity}?q=${value}&limit=10&appid=${apiId}`);
  prevValue = value;
  searchList = '';
  
  displaySearchList(cities);
}, 500);

input.addEventListener('keyup', e => getInputValue(e.target.value));

function displaySearchList(cities) {
  if(cities.length === 0) {
    searchList += `<span class="helper-text">No results matching <em>${input.value}</em></span>`;
  } else {
    cities.forEach(city => {
      if(city.state) {
        searchList += `<div class="list-item">
          <button onclick="getForecast(${city.lat}, ${city.lon})">
            ${city.name}, ${city.state} 
            <span class="country">${city.country}</span>
          </button>
        </div>
        `;
      } else {
        searchList += `<div class="list-item">
          <button onclick="getForecast(${city.lat}, ${city.lon})">
            ${city.name}
            <span class="country">${city.country}</span>
          </button>
        </div>
        `;
      }
      
    });
  }

  cityList.innerHTML = '';
  cityList.innerHTML = searchList;
  cityList.classList.add('active');
}

async function getLocalWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getForecast(lat, lon);
}

// call weather api
async function weatherByLatLon(lat, lon) {
  let response = await fetch(`${currentWeather}?lat=${lat}&lon=${lon}&appid=${apiId}&units=imperial`);
  let weather = await response.json();

  generateView(weather);
}

// user did not allow location
async function getDefaultFive() {
  const defaultCities = ['San Francisco', 'London', 'Montreal', 'Tokyo', 'Sydney'];
  
  for(let i = 0; i < defaultCities.length; i++) {
    let city = await getCityInfo(`${weatherByCity}?q=${defaultCities[i]}&limit=10&appid=${apiId}`);
    weatherByLatLon(city[0].lat, city[0].lon);
  }
}

async function getCityInfo(query) {
  // let response = await fetch(`${weatherByCity}?q=${city}&limit=10&appid=${apiId}`);
  let response = await fetch(query);
  let cityInfo = await response.json();
  
  return cityInfo;
}

async function getForecast(lat, lon, city = undefined) {
  let response = await fetch(`${weatherForecast}?lat=${lat}&lon=${lon}&appid=${apiId}&units=imperial`);
  let forecast = await response.json();

  input.value = '';
  cityList.classList.remove('active');
  clearResults();
  if(city == undefined) {
    generateForecast(forecast.list, forecast.city);
  } else {
    generateForecast(forecast.list, city);
  }
}

// generate DOM view
function generateView(data) {
  let display = `<div class="weather-data">
    <h3 class="location"><span>${data.name}</span><sup>${data.sys.country}</sup></h3>
    <span class="temp">${Math.round(data.main.temp)}&deg;</span>
    <span class="icon">${weatherIcon(data.weather[0].id)}</span>
    <span class="desc">${data.weather[0].description}</span>
    </div>`;
  weatherDisplay.insertAdjacentHTML('beforeend', display);
  weatherDisplay.classList.add('active');
}

function generateForecast(forecast, city) {
  filtered = forecast.filter((el, i) => {
    if(i % 8 === 0) {
      return el;
    }
  });
  if(city.state == undefined) {
    weatherDisplay.insertAdjacentHTML('afterbegin', `<h3 class="location">Forecast for ${city.name}</h3>`);
  } else {
    weatherDisplay.insertAdjacentHTML('afterbegin', `<h3 class="location">Forecast for ${city.name}, ${city.state}</h3>`);
  }
  

  filtered.forEach(el => {
    let display = `<div class="weather-data">
    <h3 class="location"><span>${formatDate(el.dt_txt)}</span></h3>
    <span class="temp">${Math.round(el.main.temp)}&deg;</span>
    <span class="icon">${weatherIcon(el.weather[0].id)}</span>
    <span class="desc">${el.weather[0].description}</span>
    </div>`;
    weatherDisplay.insertAdjacentHTML('beforeend', display);
    weatherDisplay.classList.add('active');
  })
}

function formatDate(dateString) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let allDate = dateString.split(' ');
  let thisDate = allDate[0].split('-');
  return `${months[thisDate[1] - 1]}, ${thisDate[2]}`; // returning date like "Nov, 18"
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