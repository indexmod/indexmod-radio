// Получаем элементы страницы
const startButton = document.getElementById('startButton');
const progressBar = document.getElementById('progressBar');
const trackName = document.getElementById('trackName');
const elapsedTimeElement = document.getElementById('elapsedTime');
const remainingTimeElement = document.getElementById('remainingTime');
const nextTrackName = document.getElementById('nextTrackName');
const audioPlayer = document.getElementById('audioPlayer');

// Плейлист программ
const playlist = [
    { name: "Program 00", file: "audio/program00.mp3" },
    { name: "Program 01", file: "audio/program01.mp3" },
    { name: "Program 02", file: "audio/program02.mp3" },
    { name: "Program 03", file: "audio/program03.mp3" },
    { name: "Program 04", file: "audio/program04.mp3" },
    { name: "Program 05", file: "audio/program05.mp3" },
    { name: "Program 06", file: "audio/program06.mp3" },
    { name: "Program 07", file: "audio/program07.mp3" },
    { name: "Program 08", file: "audio/program08.mp3" },
    { name: "Program 09", file: "audio/program09.mp3" },
    { name: "Program 10", file: "audio/program10.mp3" },
    { name: "Program 11", file: "audio/program11.mp3" },
    { name: "Program 12", file: "audio/program12.mp3" },
    { name: "Program 13", file: "audio/program13.mp3" },
    { name: "Program 14", file: "audio/program14.mp3" },
    { name: "Program 15", file: "audio/program15.mp3" },
    { name: "Program 16", file: "audio/program16.mp3" },
    { name: "Program 17", file: "audio/program17.mp3" },
    { name: "Program 18", file: "audio/program18.mp3" },
    { name: "Program 19", file: "audio/program19.mp3" },
    { name: "Program 20", file: "audio/program20.mp3" },
    { name: "Program 21", file: "audio/program21.mp3" },
    { name: "Program 22", file: "audio/program22.mp3" },
    { name: "Program 23", file: "audio/program23.mp3" }
];

let currentTrackIndex = 0;  // Индекс текущего трека
let startFromTime = 0;      // Время начала текущего трека в секундах

// Функция для форматирования времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Обновление информации о треке
function updateTrackInfo() {
    console.log('Updating track info...');
    const currentTrack = playlist[currentTrackIndex];
    const nextTrack = playlist[(currentTrackIndex + 1) % playlist.length];

    if (!currentTrack) {
        console.error('Current track not found!');
        return;
    }

    trackName.textContent = currentTrack.name;
    nextTrackName.textContent = nextTrack ? nextTrack.name : 'None';

    // Установить источник для плеера
    audioPlayer.src = currentTrack.file;
    audioPlayer.currentTime = startFromTime;
}

// Обновление прогресс-бара и времени
function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    // Обновляем прогресс-бар
    progressBar.value = (currentTime / duration) * 100;

    // Обновляем время
    elapsedTimeElement.textContent = formatTime(currentTime);
    remainingTimeElement.textContent = formatTime(duration - currentTime);
}

// Обработчик завершения трека для перехода к следующему
audioPlayer.addEventListener('ended', () => {
    console.log('Track ended, moving to next track...');
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;  // Следующий трек
    startFromTime = 0;  // Начало следующего трека с нуля
    updateTrackInfo();  // Обновляем информацию о треке
    audioPlayer.play();  // Проигрываем следующий трек
});

// Функция запуска воспроизведения
function startRadio() {
    console.log('Starting radio...');
    updateTrackInfo();
    audioPlayer.play();

    // Обновляем прогресс-бар каждые 500 мс
    setInterval(updateProgressBar, 500);
}

// Добавляем обработчик на кнопку "Start"
startButton.addEventListener('click', startRadio);
