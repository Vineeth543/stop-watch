let timer, subTimer;
let timerRunning = false;
let timerEditing = false;
let forwardRunning = true;
let subTimerRunning = false;

// Function to switch play & pause button of main stop watch
const switchPlayPauseBtn = (btn) => {
  document.getElementById(
    "start"
  ).style.backgroundImage = `url(./images/${btn}.svg)`;
};

// Function to switch play & pause button of secendary stop watch
const switchSubStopWatchPlayPauseBtn = (btn) => {
  document.getElementById(
    "sub-start"
  ).style.backgroundImage = `url(./images/${btn}.svg)`;
};

// Function to disable reset button of main stop watch
const disableResetBtn = (disable) => {
  document.getElementById("reset").style.cursor = disable
    ? "not-allowed"
    : "pointer";
};

// Function to disable reset button of secendary stop watch
const disableSubStopWatchResetBtn = (disable) => {
  document.getElementById("sub-reset").style.cursor = disable
    ? "not-allowed"
    : "pointer";
};

// Function to disable start button of main stop watch
const disableStartBtn = (disable) => {
  document.getElementById("start").style.cursor = disable
    ? "not-allowed"
    : "pointer";
};

// Function to disable pause button of main stop watch
const disableStopBtn = (disable) => {
  document.getElementById("pause").style.cursor = disable
    ? "not-allowed"
    : "pointer";
};

// Function to disable add/edit button of main stop watch
const disableAddBtn = (disable) => {
  document.getElementById("add").style.cursor = disable
    ? "not-allowed"
    : "pointer";
};

const disableArrowBtn = (disable) => {
  document.getElementById("up").style.cursor = disable
    ? "not-allowed"
    : "pointer";
  document.getElementById("down").style.cursor = disable
    ? "not-allowed"
    : "pointer";
};

// Function to enable forward timer of main stop watch
const forwardTimer = () => {
  if (!timerRunning) {
    forwardRunning = true;
    document.getElementById("up").style.backgroundColor = "white";
    document.getElementById("down").style.backgroundColor =
      "rgb(119, 115, 115)";
  }
};

// Function to enable backwad timer of main stop watch
const backwardTimer = () => {
  if (!timerRunning) {
    forwardRunning = false;
    document.getElementById("up").style.backgroundColor = "rgb(119, 115, 115)";
    document.getElementById("down").style.backgroundColor = "white";
  }
};

// Function to check for valid timer values of main stop watch
const validateTime = (hour, minute, second, millisecond) => {
  if (hour.value < 0 || hour.value >= 24 || hour.value == "") {
    hour.style.outline = "2px solid red";
    hour.value = "00";
    alert("Invalid Hour.");
    return false;
  }
  hour.style.outline = "2px solid white";
  if (minute.value < 0 || minute.value >= 60 || minute.value == "") {
    minute.style.outline = "2px solid red";
    minute.value = "00";
    alert("Invalid Minute.");
    return false;
  }
  minute.style.outline = "2px solid white";
  if (second.value < 0 || second.value >= 60 || second.value == "") {
    second.style.outline = "2px solid red";
    second.value = "00";
    alert("Invalid Second.");
    return false;
  }
  second.style.outline = "2px solid white";
  if (
    millisecond.value < 0 ||
    millisecond.value >= 100 ||
    millisecond.value == ""
  ) {
    millisecond.style.outline = "2px solid red";
    millisecond.value = "00";
    alert("Invalid Millisecond.");
    return false;
  }
  millisecond.style.outline = "2px solid white";
  return true;
};

// Function to save the timer values of main stop watch
const saveTimer = () => {
  timerEditing = false;
  disableStartBtn(false);
  disableStopBtn(false);
  // disableResetBtn(false);
  let save = document.getElementById("add");
  let hour = document.getElementById("hour");
  let minute = document.getElementById("minute");
  let second = document.getElementById("second");
  let millisecond = document.getElementById("millisecond");
  if (validateTime(hour, minute, second, millisecond)) {
    hour.setAttribute("readonly", "readonly");
    minute.setAttribute("readonly", "readonly");
    second.setAttribute("readonly", "readonly");
    millisecond.setAttribute("readonly", "readonly");
    hour.style.outline =
      minute.style.outline =
      second.style.outline =
      millisecond.style.outline =
        "none";
    save.style.backgroundImage = "url(./images/add.svg)";
    save.onclick = addTimer;
    save.title = "Set Time";
  }
};

// Function to edit the timer values of main stop watch
const addTimer = () => {
  if (!timerRunning) {
    timerEditing = true;
    disableStartBtn(true);
    disableStopBtn(true);
    disableResetBtn(false);
    let add = document.getElementById("add");
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");
    let millisecond = document.getElementById("millisecond");
    hour.removeAttribute("readonly");
    minute.removeAttribute("readonly");
    second.removeAttribute("readonly");
    millisecond.removeAttribute("readonly");
    hour.style.outline =
      minute.style.outline =
      second.style.outline =
      millisecond.style.outline =
        "2px solid white";
    add.style.backgroundImage = `url(./images/save.svg)`;
    add.onclick = saveTimer;
    add.title = "Save Time";
  }
};

// Function to start the main stop watch
const startTimer = () => {
  let hour = document.getElementById("hour");
  let minute = document.getElementById("minute");
  let second = document.getElementById("second");
  let millisecond = document.getElementById("millisecond");
  let h = Number(hour.value);
  let m = Number(minute.value);
  let s = Number(second.value);
  let ms = Number(millisecond.value);
  if (!timerRunning && !timerEditing) {
    if (!forwardRunning && !ms && !s && !m && !h) {
      disableStartBtn(true);
      return;
    } else if (ms >= 99 && s >= 59 && m >= 59 && h >= 23) {
      disableStartBtn(true);
      return;
    }
    timerRunning = true;
    switchPlayPauseBtn("pause");
    disableStartBtn(false);
    disableStopBtn(false);
    disableResetBtn(false);
    disableArrowBtn(true);
    disableAddBtn(true);
    start.title = "Pause";
    timer = setInterval(() => {
      if (forwardRunning) {
        ms++;
        if (ms >= 99 && s >= 59 && m >= 59 && h >= 23) pauseTimer();
        else if (ms > 99 || ms < 0) {
          ms %= 100;
          s++;
          if (s > 59 || s < 0) {
            m++;
            s %= 60;
            if (m > 59 || m < 0) {
              h++;
              m %= 60;
            }
            if (h > 23 || h < 0) {
              h %= 24;
            }
          }
        }
      } else {
        ms--;
        if (!ms && !s && !m && !h) pauseTimer();
        else if (ms < 0 || ms > 99) {
          ms = 99;
          s--;
          if (s < 0 || s > 59) {
            m--;
            s = 59;
            if (m < 0 || m > 59) {
              h--;
              m = 59;
            }
            if (h < 0 || h > 23) {
              h = 23;
            }
          }
        }
      }
      hour.value = h < 10 ? "0" + h : h;
      minute.value = m < 10 ? "0" + m : m;
      second.value = s < 10 ? "0" + s : s;
      millisecond.value = ms < 10 ? "0" + ms : ms;
    }, 10);
  } else pauseTimer();
};

// Function to pause the main stop watch
const pauseTimer = () => {
  if (!timerEditing) {
    clearInterval(timer);
    switchPlayPauseBtn("play");
    disableStopBtn(true);
    disableAddBtn(false);
    disableArrowBtn(false);
    start.title = "Start";
    timerRunning = false;
  }
};

// Function to reset the main stop watch
const resetTimer = () => {
  clearInterval(timer);
  switchPlayPauseBtn("play");
  timerRunning = false;
  disableStopBtn(true);
  disableResetBtn(true);
  if (timerEditing) disableResetBtn(false);
  disableAddBtn(false);
  hour.value = minute.value = second.value = millisecond.value = "00";
};

// Function to display the secendary stop watch
const showSubTimer = () => {
  document.getElementById("circle").style.display = "none";
  document.getElementById("sub-watch-screen").style.display = "flex";
  document.getElementById("sub-watch-control").style.display = "flex";
  document.getElementById("close").style.display = "flex";
};

// Function to hide the secendary stop waatch
const hideSubTimer = () => {
  document.getElementById("circle").style.display = "flex";
  document.getElementById("sub-watch-screen").style.display = "none";
  document.getElementById("sub-watch-control").style.display = "none";
  document.getElementById("close").style.display = "none";
};

// Function to start the secendary stop watch
const startSubTimer = () => {
  if (!subTimerRunning) {
    subTimerRunning = true;
    switchSubStopWatchPlayPauseBtn("pause");
    disableSubStopWatchResetBtn(false);
    document.getElementById("sub-start").title = "Pause";
    let hour = document.getElementById("sub-hour");
    let minute = document.getElementById("sub-minute");
    let second = document.getElementById("sub-second");
    let h = Number(hour.value);
    let m = Number(minute.value);
    let s = Number(second.value);
    subTimer = setInterval(() => {
      s++;
      if (s > 59 || s < 0) {
        m++;
        s %= 60;
        if (m > 59 || m < 0) {
          h++;
          m %= 60;
        }
        if (h > 23 || h < 0) {
          h %= 24;
        }
      }
      hour.value = h < 10 ? "0" + h : h;
      minute.value = m < 10 ? "0" + m : m;
      second.value = s < 10 ? "0" + s : s;
    }, 1000);
  } else pauseSubTimer();
};

// Function to pause the secendary stop watch
const pauseSubTimer = () => {
  clearInterval(subTimer);
  switchSubStopWatchPlayPauseBtn("play");
  document.getElementById("sub-start").title = "Start";
  subTimerRunning = false;
};

// Function to reset the secendary stop watch
const resetSubTimer = () => {
  subTimerRunning = false;
  clearInterval(subTimer);
  disableSubStopWatchResetBtn(true);
  switchSubStopWatchPlayPauseBtn("play");
  let hour = document.getElementById("sub-hour");
  let minute = document.getElementById("sub-minute");
  let second = document.getElementById("sub-second");
  hour.value = minute.value = second.value = "00";
};
