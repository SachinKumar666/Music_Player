// Get references to necessary elements
const thumbnail = document.querySelector('.thumbnail img');
const songTitle = document.querySelector('.song-title');
const artistName = document.querySelector('.artist-name');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const playPauseButton = document.querySelector('.play-pause');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const stopButton = document.querySelector('.stop');
const shuffleButton = document.querySelector('.shuffle');
const volumeButton = document.querySelector('.mute');
const volumeSlider = document.querySelector('.volume-slider');
const volumeProgress = document.querySelector('.volume-progress');
const songList = document.querySelector('.song-list ul');


//  List of songs
const songs = [
   {
    title: 'Dhuaan',
    artist: 'Arijit Singh',
    src: 'Assets/Muzic/Dhuaan Fugly 128 Kbps.mp3',
    thumbnail: 'Assets/Thumbnails/dhuaan-ArijitSingh.jpg',
   },
   {
    title: 'Ik Saal',
    artist: 'Jassi Gill',
    src: 'Assets/Muzic/Ik Saal.mp3',
    thumbnail: 'Assets/Thumbnails/Ik-Saal-jassiGill.jpg',
   },
   {
    title: 'Girlfriend',
    artist: 'Jass Manak',
    src: 'Assets/Muzic/GIRLFRIEND _ JASS MANAK (Official Video) Satti Dhi(MP3_70K).mp3',
    thumbnail: 'Assets/Thumbnails/girlfriend-jassmanak.jpeg',
  },
  {
    title: 'Chaar Botal Vodka',
    artist: 'Yo Yo Honey Singh',
    src: 'Assets/Muzic/Chaar Botal Vodka Full Song Feat. Yo Yo Honey Singh_ Sunny Leone _ Ragini MMS 2(MP3_70K).mp3',
    thumbnail: 'Assets/Thumbnails/chaarBotalVodkaYoYoHoneySingh.jpg',
  },
  {
    title: 'Bossmobi',
    artist: 'Arijit Singh',
    src: 'Assets/Muzic/Chhapaak - Title Track(bossmobi).mp3',
    thumbnail: 'Assets/Thumbnails/Chhapaak.jpg',
  },
  {
    title: 'Haath Toh Laga',
    artist: 'Fotty Seven ft. Rebel 7',
    src: 'Assets/Muzic/FOTTY SEVEN - HAATH TOH LAGA ft. REBEL 7 _ ASLI INDEPENDENT EP _ KALAMKAAR(MP3_70K)_1.mp3',
    thumbnail: 'Assets/Thumbnails/hathToLaga47.jpg',
  },
  {
    title: 'Firse Machayenge',
    artist: 'Emiway Bantai',
    src: 'Assets/Muzic/EMIWAY - FIRSE MACHAYENGE (OFFICIAL MUSIC VIDEO)(MP3_70K).mp3',
    thumbnail: 'Assets/Thumbnails/Firse-Machayenge.jpg',
  },
  {
    title: 'Ik Tera',
    artist: 'Mannider Butter',
    src: 'Assets/Muzic/Ik Tera-(Mr-Jatt.com).mp3',
    thumbnail: 'Assets/Thumbnails/Ik-Tera.jpg',
  },
  {
    title: 'Temporary Pyar',
    artist: 'Kaka',
    src: 'Assets/Muzic/Temporary Pyar.mp3',
    thumbnail: 'Assets/Thumbnails/temporaryPyarKaka.jpeg',
  },
  {
    title: 'YKWIM',
    artist: 'Karan Aujhla ft. Kr$na',
    src: 'Assets/Muzic/YKWIM (RiskyJatt.Com).mp3',
    thumbnail: 'Assets/Thumbnails/ykwimKaran.jpeg',
  },
  {
    title: 'Ye Jo Halka Halka Suroor Hai',
    artist: 'Manan Bhardwaj',
    src: 'Assets/Muzic/Ye Jo Halka Halka Suroor Hai - Manan Bhardwaj - Us(MP3_70K).mp3',
    thumbnail: 'Assets/Thumbnails/halkamanan.jpg',
  }
  // Add more songs as needed
];





 

// Global variables
let audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let isMuted = false;
let isShuffled = false;

// Function to update song details
function updateSongDetails() {
  const currentSong = songs[currentSongIndex];
  thumbnail.src = currentSong.thumbnail;
  songTitle.textContent = currentSong.title;
  artistName.textContent = currentSong.artist;
  audio.src = currentSong.src;
}

// Function to update progress bar
function updateProgressBar() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
}

// Function to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Function to play or pause audio
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    playPauseButton.querySelector('i.fa-play').style.display = 'none';
    playPauseButton.querySelector('i.fa-pause').style.display = 'inline-block';
  } else {
    audio.pause();
    isPlaying = false;
    playPauseButton.querySelector('i.fa-play').style.display = 'inline-block';
    playPauseButton.querySelector('i.fa-pause').style.display = 'none';
  }
}

// Function to go to previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongDetails();
  updateProgressBar();
  audio.play();
  isPlaying = true;
  playPauseButton.classList.add('playing');
}

// Function to go to next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongDetails();
  updateProgressBar();
  audio.play();
  isPlaying = true;
  playPauseButton.classList.add('playing');
}

// Function to stop audio
function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  playPauseButton.classList.remove('playing');
  updateProgressBar();
}

// Function to shuffle songs
function shuffleSongs() {
  isShuffled = !isShuffled;
  shuffleButton.classList.toggle('active');
  if (isShuffled) {
    songs = shuffleArray(songs);
    currentSongIndex = 0;
    updateSongDetails();
  }
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to toggle mute/unmute
function toggleMute() {
  isMuted = !isMuted;
  audio.muted = isMuted;
  volumeButton.classList.toggle('muted');
  volumeButton.querySelector('i.fa-volume-up').style.display = isMuted ? 'none' : 'inline-block';
  volumeButton.querySelector('i.fa-volume-mute').style.display = isMuted ? 'inline-block' : 'none';
}

// Function to update volume
function updateVolume(e) {
  const volume = e.target.value / 100;
  audio.volume = volume;
  volumeProgress.style.width = `${volume * 100}%`;
}

// Function to create song list
function createSongList() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      updateSongDetails();
      audio.play();
      isPlaying = true;
      playPauseButton.classList.add('playing');
      songList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
      li.classList.add('active');
    });
    songList.appendChild(li);
  });
}

// Event listeners
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
stopButton.addEventListener('click', stopAudio);
shuffleButton.addEventListener('click', shuffleSongs);
volumeButton.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', updateVolume);
progressContainer.addEventListener('click', (e) => {
  const progressWidth = progressContainer.offsetWidth;
  const clickPosition = e.offsetX;
  const seekTime = (clickPosition / progressWidth) * audio.duration;
  audio.currentTime = seekTime;
  updateProgressBar();
});
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', nextSong);

// Initialize
createSongList();
updateSongDetails();
