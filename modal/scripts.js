const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.getElementById('container');

open.addEventListener('click', () => {
  container.classList.add('active');
});

close.addEventListener('click', () => {
  container.classList.remove('active');
});

document.addEventListener('keydown', e => {
  if(e.keyCode === 27) {
    container.classList.remove('active');
  }
});