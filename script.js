const audioPlayer = document.getElementById('audioPlayer');
const trackName = document.getElementById('trackName');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime');
const playlistUrl = 'playlist.m3u'; // Путь к вашему плейлисту
const scheduleTableBody = document.querySelector('#scheduleTable tbody');
const startButton = document.getElementById('startButton');

let playlist = [];
let currentTrack = 0;
let trackStartTime = 0; // Время начала трека в секундах

// Функция для парсинга плейлиста
function parsePlaylist(data) {
    return data.split('\n')
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.trim());
}

// Получаем длительность трека
function getTrackDuration(track) {
    return new Promise((resolve) => {
        const tempAudio = new Audio(track);
        tempAudio.addEventListener('loadedmetadata', () => {
            resolve(tempAudio.duration);
        });
    });
}

// Воспроизведение следующего трека
async function playNextTrack() {
    if (playlist.length === 0) {
        console.error('Playlist is empty!');
        return;
    }

    const trackDuration = await getTrackDuration(playlist[currentTrack]);

    audioPlayer.src = playlist[currentTrack];
    trackName.textContent = `Now Playing: ${playlist[currentTrack]}`;
    audioPlayer.currentTime = trackStartTime; // Устанавливаем время начала воспроизведения
    audioPlayer.play();

    // Обновление прогресса и времени каждую секунду
    const interval = setInterval(() => {
        const currentTime = audioPlayer.currentTime;
        progressBar.value = (currentTime / trackDuration) * 100;
        currentTimeElement.textContent = formatTime(currentTime);
    }, 1000);

    // Событие завершения трека
    audioPlayer.addEventListener('ended', () => {
        clearInterval(interval);
        currentTrack = (currentTrack + 1) % playlist.length;
        trackStartTime = 0; // Следующий трек начинаем с начала
        playNextTrack();
    });

    updateScheduleStatus(); // Обновляем статус в расписании
}

// Форматирование времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Рассчитываем трек и время для начала воспроизведения
function calculateStartPosition() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    currentTrack = hours % 24; // Текущий трек соответствует текущему часу (0–23)

    const startTimeInMinutes = minutes + (seconds / 60); // Текущие минуты и секунды
    trackStartTime = startTimeInMinutes * 60; // Начало с текущих минут и секунд
}

// Обновление статуса в расписании
function updateScheduleStatus() {
    const rows = scheduleTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const statusCell = row.querySelector('td:last-child .status-indicator');
        statusCell.classList.remove('active');
    });
    const activeRow = scheduleTableBody.children[currentTrack];
    if (activeRow) {
        const statusCell = activeRow.querySelector('td:last-child .status-indicator');
        statusCell.classList.add('active');
    }
}

// Создание расписания
function createSchedule() {
    for (let i = 0; i < 24; i++) {
        const row = document.createElement('tr');
        const startTime = i === 0 ? '00:00' : `${i.toString().padStart(2, '0')}:00`;
        const programTitle = `Program ${i + 1}`;
        const fileName = `audio/program${i + 1}.mp3`;
        row.innerHTML = `
            <td>${startTime}</td>
            <td>${programTitle}</td>
            <td>${fileName}</td>
            <td><span class="status-indicator"></span></td>
        `;
        scheduleTableBody.appendChild(row);
    }
}

// Запуск воспроизведения с нужного момента
function startPlayback() {
    calculateStartPosition();
    playNextTrack();
}

// Запуск воспроизведения при нажатии кнопки
startButton.addEventListener('click', () => {
    startPlayback();
});

// Загрузка и парсинг плейлиста
fetch(playlistUrl)
    .then(response => response.text())
    .then(data => {
        playlist = parsePlaylist(data);
        createSchedule(); // Создаем расписание
    })
    .catch(error => {
        console.error('Ошибка при загрузке плейлиста:', error);
    });
