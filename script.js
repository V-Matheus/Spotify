const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

songName.innerText = 'Do I wanna know ?';

const arctic_monkeys_spotify = {
  songName: 'Do I wanna know ?',
  artist: 'Arctic Monkeys',
  file: 'arctic_monkeys_spotify',
  liked: false,
};

const master_of_puppets_spotify = {
  songName: 'Master of Puppts ?',
  artist: 'Metallica',
  file: 'master_of_puppets_spotify',
  liked: false,
};

const swee_child_spotify = {
  songName: 'Sweet Child O Mine',
  artist: "Guns N' Roses",
  file: 'swee_child_spotify',
  liked: false,
};

let isPlay = false;
let isShuffled = false;
let repeatOn = false;
const playList = JSON.parse(localStorage.getItem('playlist')) ?? [
  arctic_monkeys_spotify,
  master_of_puppets_spotify,
  swee_child_spotify,
];
let sortedPlaylist = [...playList];
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

function likeButtonRender() {
  if (sortedPlaylist[index].liked) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function initializeSong() {
  cover.src = `img/${sortedPlaylist[index].file}.png`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  likeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = playList.length - 1;
  } else {
    index--;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === playList.length - 1) {
    index = 0;
  } else {
    index++;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let ramdomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[ramdomIndex];
    preShuffleArray[ramdomIndex] = aux;
    currentIndex -= 1;
    console.log(sortedPlaylist);
  }
}

function shuffeButtonClicked() {
  if (!isShuffled) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add('button-active');
  } else {
    isShuffled = false;
    sortedPlaylist = [...playList];
    shuffleButton.classList.remove('button-active');
  }
}

function repeatButtonClicked() {
  if (!repeatOn) {
    repeatOn = true;
    repeatButton.classList.add('button-active');
  } else {
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}

function nexOrRepeat() {
  if (!repeatOn) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  return `
      ${hours.toString().padStart(2, '0')}:${min
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}
    `;
}

function updateTotalTime() {
  toHHMMSS(song.duration);
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
  if (!sortedPlaylist[index].liked) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem('playlist', JSON.stringify(playList));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nexOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffeButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
