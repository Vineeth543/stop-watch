let t;
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
    let timer = setInterval(() => {
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
    t = timer;
  }
};

const pauseTimer = () => {
  clearInterval(t);
  timerRunning = false;
};

const resetTimer = () => {
  clearInterval(t);
  timerRunning = false;
  hour.innerHTML = minute.innerHTML = second.innerHTML = "00";
};
