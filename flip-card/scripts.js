const card = document.querySelector('.card');
const flipBtns = document.querySelectorAll('.flip');

flipBtns.forEach(el => {
  el.addEventListener('click', function() {
      card.classList.toggle('clicked');
  });
});