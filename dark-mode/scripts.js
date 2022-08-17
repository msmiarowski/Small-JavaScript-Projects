window.addEventListener('load', () => {
  let theme = localStorage.getItem('theme');
  let toggle = document.getElementById('toggle');

  if(theme === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }
});

document.getElementById('toggle').addEventListener('change', (e) => {
  let value = e.target.checked;
  
  value ? localStorage.setItem('theme', 'dark') : localStorage.clear();
  document.body.classList.toggle('dark', e.target.checked);
});