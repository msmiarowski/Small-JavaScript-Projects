const btn = document.querySelector('#stop-watch-btn'),
watch = document.querySelector('#watch'),
resetBtn = document.querySelector('#reset-btn');

let stoptime = true,
hr = 0,
min = 0,
sec = 0;

btn.addEventListener('click', () => {
  stoptime = !stoptime;
  stopWatch();
});

resetBtn.addEventListener('click', () => {
  stoptime = true;
  btnStartText();
  hr = 0;
  min = 0;
  sec = 0;

  watch.innerHTML = '00:00:00';
  resetBtn.style.display = 'none';
});

function stopWatch() {
  if(stoptime == false) { // run stopwatch
    btn.innerText = 'Stop';
    btn.classList.add('error');
    resetBtn.style.display = 'inline';

    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if(sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if(min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if(sec < 10 || sec == 0) {
      sec = `0${sec}`;
    }
    if(min < 10 || min == 0) {
      min = `0${min}`;
    }
    if(hr < 10 || hr == 0) {
      hr = `0${hr}`;
    }
    watch.innerHTML = `${hr}:${min}:${sec}`;

    setTimeout('stopWatch()', 1000);
  } else { // stop stopwatch
    btnStartText();
  }
}

function btnStartText() {
  btn.innerText = 'Start';
  btn.classList.remove('error');
}