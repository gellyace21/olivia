const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const currentTimeElem = document.getElementById("currentTime");
const durationElem = document.getElementById("duration");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById('volume');
let isDragging = false;

function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // Update progress bar
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  // Update time labels
  currentTimeElem.textContent = formatTime(currentTime);
  durationElem.textContent = formatTime(duration);
}

// Format time in mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Play or pause the audio
function togglePlay() {
  if (audio.paused) {
    audio.play();
    play.style.display = "none";
    pause.style.display = "block";
  } else {
    audio.pause();
    play.style.display = "block";
    pause.style.display = "none";
  }
}

// Load duration once audio metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  durationElem.textContent = formatTime(audio.duration);
});

// Update progress bar as audio plays
audio.addEventListener("timeupdate", updateProgress);

function updateVolume() {
  audio.volume = volumeSlider.value;
}

function skipTo(event) {
  const progressBar = event.currentTarget;
  const clickX = event.offsetX;
  const width = progressBar.clientWidth;
  const percent = clickX / width;
  const newTime = audio.duration * percent;
  audio.currentTime = newTime;
}

// Start dragging the progress bar
function startDrag(event) {
  isDragging = true;
  updateProgressBar(event);
  document.addEventListener("mousemove", updateProgressBar);
  document.addEventListener("mouseup", stopDrag);
}

// Update progress bar during dragging
function updateProgressBar(event) {
  if (isDragging) {
    const progressBarWidth = progressBar.clientWidth;
    const offsetX = event.offsetX;
    const percentage = offsetX / progressBarWidth;
    const newTime = percentage * audio.duration;
    audio.currentTime = newTime;
    progress.style.width = `${percentage * 100}%`;
  }
}

// Stop dragging the progress bar
function stopDrag() {
  isDragging = false;
  document.removeEventListener("mousemove", updateProgressBar);
  document.removeEventListener("mouseup", stopDrag);
}

// Add event listeners for progress bar actions
progressBar.addEventListener("click", skipTo);
progressBar.addEventListener("mousedown", startDrag);
