function formatDate(dateString) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let allDate = dateString.split(' ');
  let thisDate = allDate[0].split('-');
  return `${months[thisDate[1] - 1]}, ${thisDate[2]}`; // returning date like "Nov, 18"
}

function getWeatherIcon(id) {
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

module.exports = {
  formatDate,
  getWeatherIcon
}