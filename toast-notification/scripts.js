const btn = document.getElementById('btn');
const container = document.getElementById('container');

btn.addEventListener('click', () => {
  createNotification();
});

function createNotification() {
  const notificaiton = document.createElement('div');
  notificaiton.classList.add('toast');
  notificaiton.innerText = "Why have you pressed this button?!";
  container.appendChild(notificaiton);

  setTimeout(() => {
    notificaiton.remove();
  }, 3000);
}