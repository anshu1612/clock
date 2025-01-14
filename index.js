let isRunning = false;
function init() {
  const stopwatch = document.getElementById("stopwatch");
  const timer = document.getElementById("timer");
  const alarm = document.getElementById("alarm");
  const clock = document.getElementById("clock");
  stopwatch.addEventListener("click", handleStopwatch);
}

function handleStopwatch() {
  stopwatch.disabled=true;
  const container = document.getElementById("box");
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
    playStopwatch(stopwatchTime, isRunning, btnDiv);
  });
}

function playStopwatch(stopwatchTime, isRunning, btnDiv) {
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

  resetBtn.addEventListener("click",handleStopwatch);

  let stopwatchTimeInMillis = 0;
  if (isRunning) {
    setInterval(function () {
      stopwatchTimeInMillis += 100;
      const minutes = Math.floor(stopwatchTimeInMillis / 60000);
      const seconds = Math.floor((stopwatchTimeInMillis % 60000) / 1000);
      const milliseconds = Math.floor((stopwatchTimeInMillis % 1000) / 100);
      stopwatchTime.textContent = minutes + ":" + seconds + "." + milliseconds;
    }, 100);
  }
}

function updateTime() {
  const date = new Date();
  let currTime = date.toLocaleTimeString();
  let currDate = date.toLocaleDateString("en-GB");
  document.getElementById("time").textContent = currTime;
  document.getElementById("date").textContent = currDate;
}
init();
