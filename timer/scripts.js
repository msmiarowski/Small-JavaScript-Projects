const start = document.getElementById('start');
const pause = document.getElementById('pause');

const hour = document.getElementById('hour');
const min = document.getElementById('min');
const sec = document.getElementById('sec');

start.addEventListener('click', e => {
  console.log(hour, min, sec);
});