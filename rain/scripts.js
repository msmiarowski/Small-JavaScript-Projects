function createDrop() {
  const drop = document.createElement('div');
  drop.classList.add('drop');
  
  drop.style.left = Math.random() * 100 + 'vw';
  drop.style.animationDuration = Math.random() * 2 + 3 + 's';

  drop.innerText = '💧'; 
  document.body.appendChild(drop);

  setTimeout(() => {
    drop.remove();
  }, 5000);
}

setInterval(createDrop, 300);