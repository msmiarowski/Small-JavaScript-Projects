const images = document.getElementById('images');
const img = document.querySelectorAll('#images img')

let i = 0;

function run() {
  i++;
  if(i >= img.length) {
    i = 0;
  }
  images.style.transform = `translateX(${-i * 600}px)`;
}

setInterval(run, 5000);