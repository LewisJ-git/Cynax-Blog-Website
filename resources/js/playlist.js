let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_desc = document.querySelector(".track-desc");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let download_btn = document.querySelector(".download-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.getElementById("myAudio");

let track_list = [
  {
    name: "Ecstasy",
    desc: "Genre: techno",
    image: "resources/img/ecstasy-logo.jpg",
    path: "resources/audio/869191_Ecstasy.mp3",
    file: "869191_Ecstasy.mp3"
  },
  {
    name: "Al'Fantasia",
    desc: "Genre: glitch",
    image: "resources/img/alfantasia-logo.jpg",
    path: "resources/audio/882862_AlFantasia-GlitchBounceFut.mp3",
    file: "882862_AlFantasia-GlitchBounceFut.mp3"
  },
  {
    name: "Glitch Cassette",
    desc: "Genre: glitch",
    image: "resources/img/glitch-cassette-logo.jpg",
    path: "resources/audio/894946_Glitch-Cassette.mp3",
    file: "894946_Glitch-Cassette.mp3"
  },
  {
    name: "Alter",
    desc: "Genre: techno",
    image: "resources/img/alter-logo.jpg",
    path: "resources/audio/939236_Alter.mp3",
    file: "939236_Alter.mp3"
  },
  {
    name: "Memoirs",
    desc: "Genre: cinematic",
    image: "resources/img/memoirs-logo.jpg",
    path: "resources/audio/940282_Memoirs.mp3",
    file: "940282_Memoirs.mp3"
  },
  {
    name: "Arcane",
    desc: "Genre: techno",
    image: "resources/img/arcane-logo.jpg",
    path: "resources/audio/948032_Arcane.mp3",
    file: "948032_Arcane.mp3"
  },
  {
    name: "Dismal",
    desc: "Genre: techno",
    image: "resources/img/dismal-logo.jpg",
    path: "resources/audio/954848_Dismal.mp3",
    file: "954848_Dismal.mp3"
  },
  {
    name: "Desolate",
    desc: "Genre: lo-fi",
    image: "resources/img/desolate-logo.jpg",
    path: "resources/audio/956806_desolate.mp3",
    file: "956806_desolate.mp3"
  },
  {
    name: "bUwU",
    desc: "Genre: experimental",
    image: "resources/img/buwu-logo.jpg",
    path: "resources/audio/981217_buwu.mp3",
    file: "981217_buwu.mp3"
  },
  {
    name: "Jester",
    desc: "Genre: techno",
    image: "resources/img/jester-logo.jpg",
    path: "resources/audio/987792_Jester.mp3",
    file: "987792_Jester.mp3"
  },
  {
    name: "Breeze",
    desc: "Genre: techno",
    image: "resources/img/breeze-logo.jpg",
    path: "resources/audio/Breeze-.mp3",
    file: "Breeze-.mp3"
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_desc.textContent = track_list[track_index].desc;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

playpause_btn.addEventListener("click", playpauseTrack);
function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

next_btn.addEventListener("click", nextTrack);
function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  download_trk(track_index);
  playTrack();
}

prev_btn.addEventListener("click", prevTrack);
function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  download_trk(track_index);
  playTrack();
}

function download_trk(track_index) {
  download_btn.setAttribute("download", track_list[track_index].file);
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
download_trk(track_index);