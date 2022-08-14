const video = document.getElementById("video");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const volumeBtn = document.getElementById("volume-btn");
const volume = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreen");
const player = document.getElementById("player");
const pipBtn = document.getElementById("pip");

//video storage
const videos = ["Sade", "catcity", "Luffy"];

let videoIndex = 0;

//load first video
loadVideo(videos[videoIndex]);

//loads video details
function loadVideo(vid) {
  video.src = `video/${vid}.mp4`;
}

//Play and Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
    document.getElementById("overlay").style.opacity = ".8";
    document.getElementById("navigation").style.opacity = ".65";
    document.getElementById("navigation").classList.add("glow");
  } else {
    video.pause();
    document.getElementById("overlay").style.opacity = "0";
    document.getElementById("navigation").style.opacity = ".8";
    document.getElementById("navigation").classList.remove("glow");
  }
}

//Update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

//update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress(pos) {
  video.currentTime = +pos * video.duration;
}

//next video
function nextVideo() {
  videoIndex++;
  if (videoIndex >= videos.length) {
    videoIndex = 0;
  }
  loadVideo(videos[videoIndex]);
  toggleVideoStatus();
  video.currentTime = 0;
}

//prev video
function prevVideo() {
  videoIndex--;
  if (videoIndex < 0) {
    videoIndex = videos.length - 1;
  }
  loadVideo(videos[videoIndex]);
  toggleVideoStatus();
  video.currentTime = 0;
}

//update volume
function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

//volume icon
function updateVolumeIcon() {
  if (video.muted || video.volume === 0) {
    volumeBtn.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>';
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeBtn.innerHTML = '<i class="fa fa-volume-down fa-2x"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>';
  }
}

//volume mute
function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute("data-volume", volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
  updateVolumeIcon();
}

//fullscreen toggle
function toggleFullscreen() {
  //if fullscreen exit it
  if (document.fullscreenElement) {
    document.exitFullscreen();
    // ^ but for safari
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
    //safari
  } else if (player.webkitRequestFullScreen) {
    player.webkitRequestFullscreen();
  } else {
    //go fullscreen
    player.requestFullscreen();
  }
}

//togglepip
function togglePip() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture();
    }
  }
}

//Event Listeners
pipBtn.addEventListener("click", togglePip);
fullscreenBtn.addEventListener("click", toggleFullscreen);
volumeBtn.addEventListener("click", toggleMute);
volume.addEventListener("input", updateVolume);
video.addEventListener("volumechange", updateVolumeIcon);
next.addEventListener("click", nextVideo);
prev.addEventListener("click", prevVideo);
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("ended", () => {
  document.getElementById("overlay").style.opacity = "0";
  document.getElementById("navigation").style.opacity = ".8";
  nextVideo();
});
play.addEventListener("click", toggleVideoStatus);
progress.addEventListener("click", (e) => {
  const posValue = e.offsetX / progress.clientWidth;
  setVideoProgress(posValue);
});

document.addEventListener("DOMContentLoaded", () => {
  if (!("pictureInPictureEnabled" in document)) {
    pipButton.classList.add("hidden");
  }
});
