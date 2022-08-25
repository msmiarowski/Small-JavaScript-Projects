const userLocation = document.getElementById('user-location');

document.getElementById('get-location').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(successMessage, errorMessage);
});

function successMessage(position) {
  console.log(position);
  userLocation.innerHTML = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`;
}

function errorMessage() {
  console.log('error');
}