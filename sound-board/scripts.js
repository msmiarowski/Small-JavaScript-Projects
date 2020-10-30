function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playsound(e) {
  let audio, key;

  if(e instanceof MouseEvent) {
    audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
    key = document.querySelector(`div[data-key="${this.dataset.key}"]`);
  }
  if(e instanceof KeyboardEvent) {
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  }

  if(!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
  key.addEventListener('click', playsound);
  key.addEventListener('transitionend', removeTransition);
});
window.addEventListener('keydown', playsound);