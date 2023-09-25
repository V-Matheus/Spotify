const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');

songName.innerText = 'Do I wanna know ?';
let isPlay = false;

function playSong() {
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  song.play();
  isPlay = true;
}

function pauseSong() {
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  song.pause();
  isPlay = false;
}

function playPauseDecider() {
  if(isPlay) {
    pauseSong()
  } else {
    playSong()
  }
}

play.addEventListener('click', playPauseDecider);
