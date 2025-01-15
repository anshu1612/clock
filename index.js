const container = document.getElementById("box");
let isRunning = false;
let stopwatchInterval = null;
let interval = null;
let stopwatchTimeInMillis = 0;
let timerTimeInMillis;
let isRunningTimer = false;

function init() {
  const stopwatch = document.getElementById("stopwatch");
  const timer = document.getElementById("timer");
  const alarm = document.getElementById("alarm");
  const clock = document.getElementById("clock");
  stopwatch.addEventListener("click", handleStopwatch);
  clock.addEventListener("click", handleClock);
  timer.addEventListener("click", handleTimer);
}

// CLOCK FUNCTIONS//
function handleClock() {
  stopwatch.disabled = false;
  container.innerHTML = "";
  document.getElementById("name").textContent = "Clock";
  const displayTime = document.createElement("div");
  displayTime.className = "text-black text-4xl font-semibold";
  const displayDate = document.createElement("div");
  displayDate.className = "text-black/50 text-lg font-semibold";
  container.appendChild(displayTime);
  container.appendChild(displayDate);

  setInterval(() => {
    const date = new Date();
    let currTime = date.toLocaleTimeString();
    let currDate = date.toLocaleDateString("en-GB");
    displayTime.textContent = currTime;
    displayDate.textContent = currDate;
  }, 1000);
}

// STOPWATCH FUNCTIONS //
function handleStopwatch() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  isRunning = false;
  stopwatch.disabled = true;
  timer.disabled = false;
  container.innerHTML = "";
  document.getElementById("name").textContent = "Stopwatch";

  const stopwatchTime = document.createElement("div");
  stopwatchTime.textContent = "00:00.0";
  stopwatchTime.className = "text-center text-black text-4xl font-semibold";
  container.appendChild(stopwatchTime);

  const btnDiv = document.createElement("div");
  container.appendChild(btnDiv);

  const playBtn = document.createElement("button");
  playBtn.className = "bg-white px-6  rounded-full mt-36";

  const playIcon = document.createElement("i");
  playIcon.className = "fa-solid fa-play";
  playIcon.style = "color: #074ef2";

  playBtn.appendChild(playIcon);
  btnDiv.appendChild(playBtn);
  container.appendChild(btnDiv);

  playBtn.addEventListener("click", () => {
    isRunning = true;
    playStopwatch(stopwatchTime, btnDiv);
  });
}

function playStopwatch(stopwatchTime, btnDiv) {
  btnDiv.innerHTML = "";

  const resetBtn = document.createElement("button");
  resetBtn.className = "bg-white px-6  rounded-full mt-36 mr-8";

  const resetIcon = document.createElement("i");
  resetIcon.className = "fas fa-stop";
  resetIcon.style = "color: #074ef2";

  resetBtn.appendChild(resetIcon);
  btnDiv.appendChild(resetBtn);

  const pauseBtn = document.createElement("button");
  pauseBtn.className = "bg-white px-6  rounded-full mt-36";

  const pauseIcon = document.createElement("i");
  pauseIcon.className = "fa-solid fa-pause";
  pauseIcon.style = "color: #074ef2";

  pauseBtn.appendChild(pauseIcon);
  btnDiv.appendChild(pauseBtn);

  resetBtn.addEventListener("click", handleStopwatch);
  pauseBtn.addEventListener("click", () => {
    pauseStopwatch(stopwatchTime, btnDiv);
  });

  if (isRunning) {
    stopwatchInterval = setInterval(function () {
      stopwatchTimeInMillis += 100;
      const minutes = Math.floor(stopwatchTimeInMillis / 60000);
      const seconds = Math.floor((stopwatchTimeInMillis % 60000) / 1000);
      const milliseconds = Math.floor((stopwatchTimeInMillis % 1000) / 100);
      stopwatchTime.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
        .toString()
        .padEnd(2, "0")}`;
    }, 100);
  }
}

function pauseStopwatch(stopwatchTime, btnDiv) {
  clearInterval(stopwatchInterval);
  btnDiv.innerHTML = "";
  const resetBtn = document.createElement("button");
  resetBtn.className = "bg-white px-6  rounded-full mt-36 mr-8";

  const resetIcon = document.createElement("i");
  resetIcon.className = "fas fa-stop";
  resetIcon.style = "color: #074ef2";

  resetBtn.appendChild(resetIcon);
  btnDiv.appendChild(resetBtn);

  const replay = document.createElement("button");
  replay.className = "bg-white px-6  rounded-full mt-36 mr-8";
  const replayIcon = document.createElement("i");
  replayIcon.className = "fa-solid fa-play";
  replayIcon.style = "color: #074ef2";
  replay.appendChild(replayIcon);
  btnDiv.appendChild(replay);

  resetBtn.addEventListener("click", handleStopwatch);
  replay.addEventListener("click", () => {
    playStopwatch(stopwatchTime, btnDiv);
  });
}

// TIMER FUNCTIONS//
function handleTimer() {
  timer.disabled = true;
  stopwatch.disabled = false;
  container.innerHTML = "";
  document.getElementById("name").textContent = "Timer";

  const inputTimer = document.createElement("div");
  inputTimer.id = "inputDiv";
  inputTimer.className = "flex";
  container.appendChild(inputTimer);

  const hr = document.createElement("input");
  hr.className =
    "border rounded text-4xl w-10 bg-gray-100 outline-none text-center";
  hr.type = "number";
  hr.id = "hourInput";
  hr.min = 0;
  hr.max = 23;
  hr.placeholder = "00";
  inputTimer.appendChild(hr);

  const colon = document.createElement("p");
  colon.textContent = ":";
  colon.className = "text-4xl font-semibold";
  inputTimer.appendChild(colon);

  const min = document.createElement("input");
  min.className =
    "border rounded text-4xl w-10 bg-gray-100 outline-none text-center";
  min.type = "number";
  min.id = "minInput";
  min.min = 0;
  min.max = 59;
  min.placeholder = "00";
  inputTimer.appendChild(min);

  const colon2 = document.createElement("p");
  colon2.textContent = ":";
  colon2.className = "text-4xl font-semibold";
  inputTimer.appendChild(colon2);

  const sec = document.createElement("input");
  sec.className =
    "border rounded text-4xl w-10 bg-gray-100 outline-none text-center";
  sec.type = "number";
  sec.id = "secInput";
  sec.min = 0;
  sec.max = 59;
  sec.placeholder = "00";
  inputTimer.appendChild(sec);

  const displayTimer = document.createElement("div");
  displayTimer.id = "displayTimer";
  displayTimer.textContent = "00:00:00";
  displayTimer.className =
    "hidden text-center text-black text-4xl font-semibold";
  container.appendChild(displayTimer);

  const btnDiv = document.createElement("div");
  container.appendChild(btnDiv);

  const playBtn = document.createElement("button");
  playBtn.className = "bg-white px-6  rounded-full mt-36";

  const playIcon = document.createElement("i");
  playIcon.className = "fa-solid fa-play";
  playIcon.style = "color: #074ef2";

  playBtn.appendChild(playIcon);
  btnDiv.appendChild(playBtn);
  container.appendChild(btnDiv);

  playBtn.addEventListener("click", () => {
    document.getElementById("displayTimer").classList.remove("hidden");
    document.getElementById("inputDiv").classList.add("hidden");
    isRunningTimer = true;
    timerTimeInMillis =
      (parseInt(hr.value) || 0) * 3600000 +
      (parseInt(min.value) || 0) * 60000 +
      (parseInt(sec.value) || 0) * 1000;

    playTimer(btnDiv);
  });
}

function playTimer(btnDiv) {
  btnDiv.innerHTML = "";

  const resetBtn = document.createElement("button");
  resetBtn.className = "bg-white px-6  rounded-full mt-36 mr-8";

  const resetIcon = document.createElement("i");
  resetIcon.className = "fas fa-stop";
  resetIcon.style = "color: #074ef2";

  resetBtn.appendChild(resetIcon);
  btnDiv.appendChild(resetBtn);

  const pauseBtn = document.createElement("button");
  pauseBtn.className = "bg-white px-6  rounded-full mt-36";

  const pauseIcon = document.createElement("i");
  pauseIcon.className = "fa-solid fa-pause";
  pauseIcon.style = "color: #074ef2";

  pauseBtn.appendChild(pauseIcon);
  btnDiv.appendChild(pauseBtn);

  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    isRunningTimer = false;
    timerTimeInMillis = 0;
    document.getElementById("displayTimer").textContent = "00:00:00"; // Reset display to 00:00:00
    handleTimer();
  });

  pauseBtn.addEventListener("click", () => {
    pauseTimer(btnDiv);
  });

  interval = setInterval(function () {
    if (isRunningTimer) {
      timerTimeInMillis -= 1000;
      const hours = Math.floor(timerTimeInMillis / 3600000);
      const minutes = Math.floor((timerTimeInMillis % 3600000) / 60000);
      const seconds = Math.floor((timerTimeInMillis % 60000) / 1000);

      document.getElementById("displayTimer").textContent = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

      if (timerTimeInMillis <= 0) {
        clearInterval(interval);
        isRunningTimer = false;
        setTimeout(() => {
          window.alert("TIME UP");
        }, 1000);
      }
    }
  }, 1000);
}

function pauseTimer(btnDiv) {
  clearInterval(interval);
  btnDiv.innerHTML = "";
  const resetBtn = document.createElement("button");
  resetBtn.className = "bg-white px-6  rounded-full mt-36 mr-8";

  const resetIcon = document.createElement("i");
  resetIcon.className = "fas fa-stop";
  resetIcon.style = "color: #074ef2";

  resetBtn.appendChild(resetIcon);
  btnDiv.appendChild(resetBtn);

  const replay = document.createElement("button");
  replay.className = "bg-white px-6  rounded-full mt-36 mr-8";
  const replayIcon = document.createElement("i");
  replayIcon.className = "fa-solid fa-play";
  replayIcon.style = "color: #074ef2";
  replay.appendChild(replayIcon);
  btnDiv.appendChild(replay);

  resetBtn.addEventListener("click", handleStopwatch);
  replay.addEventListener("click", () => {
    playTimer(btnDiv);
  });
}

init();
