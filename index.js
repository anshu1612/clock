const container = document.getElementById("box");
let isRunning = false;
let stopwatchInterval = null;
let stopwatchTimeInMillis = 0;

function init() {
  const stopwatch = document.getElementById("stopwatch");
  const timer = document.getElementById("timer");
  const alarm = document.getElementById("alarm");
  const clock = document.getElementById("clock");
  stopwatch.addEventListener("click", handleStopwatch);
  clock.addEventListener("click", handleClock);
}

// CLOCK FUNCTIONS//
function handleClock() {
  stopwatch.disabled=false;
  container.innerHTML = "";
  document.getElementById("name").textContent = "Clock";
  const displayTime = document.createElement("div");
  displayTime.className = "text-black text-4xl font-semibold";
  const displayDate = document.createElement("div");
  displayDate.className = "text-black/50 text-lg font-semibold";
  container.appendChild(displayTime);
  container.appendChild(displayDate);
  

  setInterval(()=>{
  const date = new Date();
  let currTime = date.toLocaleTimeString();
  let currDate = date.toLocaleDateString("en-GB");
  displayTime.textContent = currTime;
  displayDate.textContent = currDate;},1000)
}

// STOPWATCH FUNCTIONS //
function handleStopwatch() {
  isRunning = false;
  stopwatch.disabled = true;
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
      stopwatchTime.textContent = minutes + ":" + seconds + "." + milliseconds;
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

init();
