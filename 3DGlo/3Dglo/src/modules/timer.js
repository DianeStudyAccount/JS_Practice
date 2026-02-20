"use strict";
const timer = (deadline) => {
  const divTimer = document.querySelector("#timer");
  const timerHours = document.querySelector("#timer-hours");
  const timerMinutes = document.querySelector("#timer-minutes");
  const timerSeconds = document.querySelector("#timer-seconds");

  const colon = document.createElement("span");
  const timerDays = document.createElement("span");

  colon.textContent = ":";
  timerDays.id = "timer-days";
  timerDays.textContent = "00";
  divTimer.prepend(colon);
  divTimer.prepend(timerDays);

  const getTimeRemain = () => {
    let dateStop = new Date(deadline).getTime(); // get ms from them
    let dateNow = new Date().getTime(); // time now
    let timeRemain = Math.max(0, (dateStop - dateNow) / 1000); //ms until deadline, not to have negative values
    let days = Math.floor(timeRemain / 60 / 60 / 24);
    let hours = Math.floor((timeRemain / 60 / 60) % 24);
    let minutes = Math.floor((timeRemain / 60) % 60); // целые часы
    let seconds = Math.floor(timeRemain % 60); //целые минуты, поэтому считаем остаток от деления

    return {
      days,
      hours,
      minutes,
      seconds,
      timeRemain,
    };
  };

  const updateClock = () => {
    let getTime = getTimeRemain();

    if (getTime.timeRemain <= 0) {
      timerDays.textContent = "00";
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
      clearInterval(intervalID);
      return;
    }
    timerDays.textContent = String(getTime.days).padStart(2, "0");
    timerHours.textContent = String(getTime.hours).padStart(2, "0");
    timerMinutes.textContent = String(getTime.minutes).padStart(2, "0");
    timerSeconds.textContent = String(getTime.seconds).padStart(2, "0");
  };
  updateClock();
  const intervalID = setInterval(updateClock, 1000);
};

export default timer;
