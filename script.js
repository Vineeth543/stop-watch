let t;
let timerRunning = false;

const startTimer = () => {
  if (!timerRunning) {
    timerRunning = true;
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");
    // let miliSecond = document.getElementById("miliSecond");
    let h = Number.parseInt(hour.innerHTML);
    let m = Number.parseInt(minute.innerHTML);
    let s = Number.parseInt(second.innerHTML);
    // let ms = Number.parseInt(miliSecond.innerHTML);
    let timer = setInterval(() => {
      //   setInterval(() => {
      //     ms++;
      //     if (ms == 20) {
      //       ms = 0;
      //     }
      //     miliSecond.innerHTML = ms < 10 ? "0" + ms : ms;
      //   }, 10);
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
      minute.innerHTML = m < 10 ? "0" + m : s;
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
  hour.innerHTML = "00";
  minute.innerHTML = "00";
  second.innerHTML = "00";
};
