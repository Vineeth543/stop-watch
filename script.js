// Function to switch play & pause button of main stop watch & secendary stop watch
const switchPlayPauseBtn = (id, btn) =>
  id.setAttribute(
    "d",
    btn == "play"
      ? "M18.95 32.85 32.9 24l-13.95-8.9ZM24 45.05q-4.35 0-8.2-1.625-3.85-1.625-6.725-4.5Q6.2 36.05 4.575 32.2 2.95 28.35 2.95 24t1.625-8.2q1.625-3.85 4.5-6.725Q11.95 6.2 15.8 4.55q3.85-1.65 8.15-1.65 4.4 0 8.275 1.65t6.725 4.525q2.85 2.875 4.5 6.725 1.65 3.85 1.65 8.25 0 4.3-1.65 8.15-1.65 3.85-4.525 6.725-2.875 2.875-6.725 4.5-3.85 1.625-8.2 1.625Zm0-4.55q6.85 0 11.675-4.825Q40.5 30.85 40.5 24q0-6.85-4.825-11.675Q30.85 7.5 24 7.5q-6.85 0-11.675 4.825Q7.5 17.15 7.5 24q0 6.85 4.825 11.675Q17.15 40.5 24 40.5ZM24 24Z`"
      : "M28.2 40.1V7.85h11.05V40.1Zm-19.45 0V7.85H19.8V40.1Z"
  );

// Function to disable/enable buttons based on id
const disableBtn = (id, value) =>
  (id.style.cursor = value ? "not-allowed" : "pointer");

// Function to enable forward timer of main stop watch
const timerDirection = (status) => {
  if (!start.value) {
    up.value = status;
    up.style.backgroundColor = status ? "white" : "rgb(119, 115, 115)";
    down.style.backgroundColor = status ? "rgb(119, 115, 115)" : "white";
  }
};

// Function to display the alert messages for invalid entry
const showAlert = (id, value) => {
  id.style.outline = "2px solid red";
  id.value = "00";
  alert(`Invalid ${value}.`);
  return false;
};

const getTimerHistory = () => {
  let data = JSON.parse(localStorage.timerData);
  if (data) {
    let history = document.getElementById("history");
    history.innerHTML = "";
    data.forEach((element, index) => {
      history.innerHTML += `<p>${index + 1}. ${element.slice(
        0,
        12
      )}<img src='./images/info.png' class='delete-icon' title="${element.slice(
        12
      )}" onclick='alert("${element.slice(
        12
      )}")' /><img src='./images/delete.png' class='info-icon' onclick='deleteHistory(${index})' /></p>`;
    });
  }
  getDateAndTime();
};

const deleteHistory = (index) => {
  let timerHistory = JSON.parse(localStorage.timerData);
  timerHistory.splice(index, 1);
  localStorage.setItem("timerData", JSON.stringify(timerHistory));
  getTimerHistory();
};

// Function to check for valid timer values of main stop watch
const validateTime = (hour, minute, second, milisec) => {
  if (hour.value < 0 || hour.value >= 100 || hour.value == "") {
    return showAlert(hour, "Hour");
  }
  hour.style.outline = "2px solid white";
  if (minute.value < 0 || minute.value >= 100 || minute.value == "") {
    return showAlert(minute, "Minute");
  } else if (minute.value >= 60) {
    hour.value++;
    hour.value = hour.value < 10 ? "0" + hour.value : hour.value;
    minute.value %= 60;
  }
  minute.style.outline = "2px solid white";
  if (second.value < 0 || second.value >= 100 || second.value == "") {
    return showAlert(second, "Second");
  } else if (second.value >= 60) {
    minute.value++;
    minute.value = minute.value < 10 ? "0" + minute.value : minute.value;
    second.value %= 60;
  }
  second.style.outline = "2px solid white";
  if (milisec.value < 0 || milisec.value >= 100 || milisec.value == "") {
    return showAlert(milisec, "Millisecond");
  }
  milisec.style.outline = "2px solid white";
  return true;
};

// Function to save the timer values of main stop watch
const saveTimer = () => {
  let day = new Date();
  add.value = false;
  disableBtn(start, false);
  disableBtn(pause, false);
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
    add.children[0].setAttribute(
      "d",
      "m39.65 14.95-6.3-6.25 1.95-2q.95-.95 2.325-.95 1.375 0 2.475 1l1.55 1.55q1.1 1.05.975 2.425Q42.5 12.1 41.55 13.05ZM37.6 17 12.25 42.35H6v-6.3L31.3 10.8Z"
    );
    add.onclick = addTimer;
    add.children[1].textContent = "Set Time";
    let timerHistory = localStorage.timerData
      ? JSON.parse(localStorage.timerData)
      : [];
    timerHistory.unshift(
      `${hour.value} : ${minute.value} : ${second.value} ${day
        .toString()
        .slice(0, 15)}${day.toString().slice(15, 24)}`
    );
    localStorage.setItem("timerData", JSON.stringify(timerHistory));
    getTimerHistory();
  }
};

// Function to edit the timer values of main stop watch
const addTimer = () => {
  if (!start.value) {
    add.value = true;
    disableBtn(start, true);
    disableBtn(pause, true);
    disableBtn(reset, false);
    hour.removeAttribute("readonly");
    minute.removeAttribute("readonly");
    second.removeAttribute("readonly");
    millisecond.removeAttribute("readonly");
    hour.style.outline =
      minute.style.outline =
      second.style.outline =
      millisecond.style.outline =
        "2px solid white";
    add.children[0].setAttribute(
      "d",
      "M18.9 36.75 6.65 24.5l3.3-3.3 8.95 9L38 11.1l3.3 3.25Z"
    );
    add.onclick = saveTimer;
    add.children[1].textContent = "Save Time";
  }
};

// Function to start the main stop watch
const startTimer = (timerRunning) => {
  let h = Number(hour.value);
  let m = Number(minute.value);
  let s = Number(second.value);
  let ms = Number(millisecond.value);
  if (!timerRunning && !add.value) {
    if (up.value === undefined) up.value = true;
    else if (
      (!up.value && !ms && !s && !m && !h) ||
      (up.value && ms >= 99 && s >= 59 && m >= 59 && h >= 23)
    ) {
      disableBtn(start, true);
      return;
    }
    start.value = true;
    switchPlayPauseBtn(start.children[0], "pause");
    disableBtn(start, false);
    disableBtn(pause, false);
    disableBtn(reset, false);
    disableBtn(up, true);
    disableBtn(down, true);
    disableBtn(add, true);
    // Updating the title
    start.children[1].textContent = "Pause";
    start.timer = setInterval(() => {
      if (up.value) {
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
        if (!ms && !s && !m && !h) {
          pauseTimer();
        } else if (ms < 0 || ms > 99) {
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
  if (!add.value) {
    clearInterval(start.timer);
    switchPlayPauseBtn(start.children[0], "play");
    disableBtn(pause, true);
    disableBtn(add, false);
    disableBtn(up, false);
    disableBtn(down, false);
    start.children[1].textContent = "Start";
    start.value = false;
  }
};

// Function to reset the main stop watch
const resetTimer = () => {
  start.value = false;
  clearInterval(start.timer);
  switchPlayPauseBtn(start.children[0], "play");
  disableBtn(add, false);
  disableBtn(pause, true);
  disableBtn(reset, true);
  if (add.value) disableBtn(reset, false);
  hour.value = minute.value = second.value = millisecond.value = "00";
};

// Function to display/hide the secendary stop watch
const showOrHideSubTimer = (show1, show2) => {
  document.getElementById("open").style.display = show1;
  window["sub-watch-screen"].style.display = show2;
  window["sub-watch-control"].style.display = show2;
  document.getElementById("close").style.display = show2;
  if (show2) setTimerToZero();
};

const setTimerToZero = () => {
  clearInterval(window["sub-start"].subTimer);
  window["sub-hour"].value =
    window["sub-minute"].value =
    window["sub-second"].value =
      "00";
};

// Function to start the secendary stop watch
const startSubTimer = (subTimerRunning) => {
  if (!subTimerRunning) {
    window["sub-start"].value = true;
    switchPlayPauseBtn(window["sub-start-svg"], "pause");
    disableBtn(window["sub-reset"], false);
    window["sub-start"].children[1].textContent = "Pause";
    let h = Number(window["sub-hour"].value);
    let m = Number(window["sub-minute"].value);
    let s = Number(window["sub-second"].value);
    window["sub-start"].subTimer = setInterval(() => {
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
      window["sub-hour"].value = h < 10 ? "0" + h : h;
      window["sub-minute"].value = m < 10 ? "0" + m : m;
      window["sub-second"].value = s < 10 ? "0" + s : s;
    }, 1000);
  } else pauseSubTimer(window["sub-start"].subTimer);
};

// Function to pause the secendary stop watch
const pauseSubTimer = () => {
  clearInterval(window["sub-start"].subTimer);
  switchPlayPauseBtn(window["sub-start-svg"], "play");
  window["sub-start"].children[1].textContent = "Start";
  window["sub-start"].value = false;
};

// Function to reset the secendary stop watch
const resetSubTimer = () => {
  window["sub-start"].value = false;
  disableBtn(window["sub-reset"], true);
  switchPlayPauseBtn(window["sub-start-svg"], "play");
  setTimerToZero();
};

const getDateAndTime = () => {
  let day = new Date();
  document.getElementById("current-date").innerHTML = day
    .toString()
    .slice(0, 15);
  document.getElementById("current-time").innerHTML = day
    .toString()
    .slice(15, 24);
};

setInterval(getDateAndTime, 1000);
