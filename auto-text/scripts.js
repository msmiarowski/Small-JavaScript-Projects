const text = 'Auto Write Text';
const container = document.getElementById('text');

let index = 0;

function writeText() {
  container.innerText = text.slice(0, index);
  index++;
  if(index > text.length) {
    index = 0;
  }
}

setInterval(writeText, 150);