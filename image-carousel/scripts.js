const images = document.getElementById('images');
const img = document.querySelectorAll('#images img');

let wrapperWidth = images.offsetWidth;

window.addEventListener('resize', () => {
  wrapperWidth = images.offsetWidth;
  console.log(wrapperWidth)
});

let i = 0;

function run() {
  i++;
  if(i >= img.length) {
    i = 0;
  }
  images.style.transform = `translateX(${-i * wrapperWidth}px)`;
}

setInterval(run, 5000);