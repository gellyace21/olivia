// let gutsArray = ['all-american bitch', 'get him back', 'lacy', 'love is embarassing', "pretty isn't pretty", 'vampire'];

// let sourArray = ['deja vu', "driver's license", 'favorite crime', 'happier', 'jealousy, jealousy', 'traitor'];


// function songAdd() {
//     let album = document.getElementById('gutsAlbum');
//     album.innerHTML = '';
    
//     gutsArray.forEach(title => {
//         let songItem = document.createElement('div');
//         songItem.classList.add('songItem');

//         songItem.innerHTML = `
//         <img src="res/images/homepage/gutsAlbum.webp" alt="" />
//             <div class="songInfo">
//                 <div class="bar">
//                     <audio id="audio" src="res/songs/sour/drivers license.m4a"></audio>
//                     <div class="progress-bar" id="progressBar">
//                         <span id="progress"></span>
//                     </div>
//                     <span id="currentTime">0:00</span>
//                 </div>
//               <span class="title">${title}</span>
//                 <span id="duration">0:00</span>
//                 <div class="volume-container">
//                     <label for="volume">Volume</label>
//                     <input type="range" id="volume" class="volume-slider" min="0" max="1" step="0.01" value="1" onchange="updateVolume()">
//                 </div>
//             </div>
//             <img src="res/images/play.png" id="play" alt="" onclick="togglePlay()">
//             <img src="res/images/pause.png" id="pause" alt="" onclick="togglePlay()">
//         `

//         album.appendChild(songItem)
//     });

// songAdd();
    
// }

// Arrays for the album songs
// Arrays for the album songs
const gutsArray = ['all-american bitch', 'get him back!', 'lacy', 'love is embarassing', "pretty isn't pretty", 'vampire'];
const sourArray = ['deja vu', "driver's license", 'favorite crime', 'happier', 'jealousy, jealousy', 'traitor'];

// Function to update both albums with their respective songs
function songAdd() {
  const gutsAlbum = document.getElementById('gutsAlbum');
  const sourAlbum = document.getElementById('sourAlbum');
  
  // Clear both album containers before adding the new songs
  gutsAlbum.innerHTML = '';
  sourAlbum.innerHTML = '';

  // Add songs to Guts album
  gutsArray.forEach((title, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('songItem');
    songItem.innerHTML = `
      <img src="res/images/homepage/gutsAlbum.webp" alt="" />
      <div class="songInfo">
        <div class="bar">
          <audio id="audio-${index}" src="res/songs/guts/${title}.m4a"></audio>
          <div class="progress-bar" id="progressBar-${index}">
            <span id="progress-${index}"></span>
          </div>
          <span id="currentTime-${index}">0:00</span>
        </div>
        <span class="title">${title}</span>
        <span id="duration-${index}">0:00</span>
        <div class="volume-container">
          <label for="volume-${index}">Volume</label>
          <input
            type="range"
            id="volume-${index}"
            class="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value="1"
            onchange="updateVolume(${index})"
          />
        </div>
      </div>
      <img
        src="res/images/play.png"
        class="play"
        id="play-${index}"
        alt="Play"
        onclick="togglePlay(${index})"
      />
      <img
        src="res/images/pause.png"
        class="pause"
        id="pause-${index}"
        alt="Pause"
        onclick="togglePlay(${index})"
        style="display: none;"
      />
    `;
    gutsAlbum.appendChild(songItem);
  });

  // Add songs to Sour album
  sourArray.forEach((title, index) => {
    const songItem = document.createElement('div');
    songItem.classList.add('songItem');
    songItem.innerHTML = `
      <img src="res/images/homepage/sour.webp" alt="" />
      <div class="songInfo">
        <div class="bar">
          <audio id="audio-${gutsArray.length + index}" src="res/songs/sour/${title}.m4a"></audio>
          <div class="progress-bar" id="progressBar-${gutsArray.length + index}">
            <span id="progress-${gutsArray.length + index}"></span>
          </div>
          <span id="currentTime-${gutsArray.length + index}">0:00</span>
        </div>
        <span class="title">${title}</span>
        <span id="duration-${gutsArray.length + index}">0:00</span>
        <div class="volume-container">
          <label for="volume-${gutsArray.length + index}">Volume</label>
          <input
            type="range"
            id="volume-${gutsArray.length + index}"
            class="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value="1"
            onchange="updateVolume(${gutsArray.length + index})"
          />
        </div>
      </div>
      <img
        src="res/images/play.png"
        class="play"
        id="play-${gutsArray.length + index}"
        alt="Play"
        onclick="togglePlay(${gutsArray.length + index})"
      />
      <img
        src="res/images/pause.png"
        class="pause"
        id="pause-${gutsArray.length + index}"
        alt="Pause"
        onclick="togglePlay(${gutsArray.length + index})"
        style="display: none;"
      />
    `;
    sourAlbum.appendChild(songItem);
  });

  // Setup audio metadata and event listeners
  document.querySelectorAll('audio').forEach((audio, index) => {
    audio.addEventListener('loadedmetadata', () => {
      const durationElem = document.getElementById(`duration-${index}`);
      durationElem.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => updateProgress(index));
  });

  // Add event listeners for the progress bars (to skip songs)
  document.querySelectorAll('.progress-bar').forEach((progressBar, index) => {
    progressBar.addEventListener('click', (event) => skipTo(event, index));
  });
}

// Format time in mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Update progress for each audio instance
function updateProgress(index) {
  const audio = document.getElementById(`audio-${index}`);
  const progress = document.getElementById(`progress-${index}`);
  const currentTimeElem = document.getElementById(`currentTime-${index}`);
  const durationElem = document.getElementById(`duration-${index}`);

  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // Update progress bar
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  // Update time labels
  currentTimeElem.textContent = formatTime(currentTime);
  durationElem.textContent = formatTime(duration);
}

// Play or pause the audio
function togglePlay(index) {
  const audio = document.getElementById(`audio-${index}`);
  const playButton = document.getElementById(`play-${index}`);
  const pauseButton = document.getElementById(`pause-${index}`);

  if (audio.paused) {
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
  } else {
    audio.pause();
    playButton.style.display = "inline";
    pauseButton.style.display = "none";
  }
}

// Volume adjustment
function updateVolume(index) {
  const audio = document.getElementById(`audio-${index}`);
  const volumeSlider = document.getElementById(`volume-${index}`);
  audio.volume = volumeSlider.value;
}

// Skip to the clicked part of the song
function skipTo(event, index) {
  const progressBar = event.currentTarget;
  const clickX = event.offsetX;
  const width = progressBar.clientWidth;
  const percent = clickX / width;
  const audio = document.getElementById(`audio-${index}`);
  const newTime = audio.duration * percent;
  audio.currentTime = newTime;
}




// Call the function to load the songs in both albums
songAdd();
