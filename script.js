let timer;
let timerRunning = false;

const startTimer = () => {
  if (!timerRunning) {
    timerRunning = true;
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");
    let h = Number.parseInt(hour.innerHTML);
    let m = Number.parseInt(minute.innerHTML);
    let s = Number.parseInt(second.innerHTML);
    timer = setInterval(() => {
      s++;
      if (s == 60) {
        m++;
        s = 0;
      }
      if (m == 60) {
        h++;
        m = 0;
      }
      if (h == 24) {
        h = 0;
      }
      hour.innerHTML = h < 10 ? "0" + h : h;
      minute.innerHTML = m < 10 ? "0" + m : m;
      second.innerHTML = s < 10 ? "0" + s : s;
    }, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(timer);
  timerRunning = false;
};

const resetTimer = () => {
  clearInterval(timer);
  timerRunning = false;
  hour.innerHTML = minute.innerHTML = second.innerHTML = "00";
};
