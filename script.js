const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

songName.innerText = 'Do I wanna know ?';

const arctic_monkeys_spotify = {
  songName: 'Do I wanna know ?',
  artist: 'Arctic Monkeys',
  file: 'arctic_monkeys_spotify',
};

const master_of_puppets_spotify = {
  songName: 'Master of Puppts ?',
  artist: 'Metallica',
  file: 'master_of_puppets_spotify',
};

const swee_child_spotify = {
  songName: 'Sweet Child O Mine',
  artist: "Guns N' Roses",
  file: 'swee_child_spotify',
};

let isPlay = false;
const playList = [
  arctic_monkeys_spotify,
  master_of_puppets_spotify,
  swee_child_spotify,
];
let index = 0;

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
  if (isPlay) {
    pauseSong();
  } else {
    playSong();
  }
}

function initializeSong() {
  cover.src = `img/${playList[index].file}.png`;
  song.src = `songs/${playList[index].file}.mp3`;
  songName.innerText = playList[index].songName;
  bandName.innerText = playList[index].artist;
}

function previousSong() {
  if(index === 0) {
    index = playList.length -1
  } else {
    index--
  }
  initializeSong()
  playSong()
}

function nextSong() {
  if(index === playList.length - 1) {
    index = 0
  } else {
    index++
  }
  initializeSong()
  playSong()
}

initializeSong()

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong)
