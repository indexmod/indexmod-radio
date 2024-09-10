const audioPlayer = document.getElementById('audioPlayer');
const trackName = document.getElementById('trackName');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime');
const scheduleTableBody = document.querySelector('#scheduleTable tbody');

let playlist = [];
let currentTrack = 0;
let startFromTime = 0;

// Заполнение расписания
function createSchedule() {
    for (let i = 0; i < 24; i++) {
        const row = document.createElement('tr');
        const startTime = i === 0 ? '00:00' : `${i.toString().padStart(2, '0')}:00`;
        const programTitle = `Program ${i}`;
        const fileName = `audio/program${i.toString().padStart(2, '0')}.mp3`;
        row.innerHTML = `
            <td>${startTime}</td>
            <td>${programTitle}</td>
            <td>${fileName}</td>
            <td><span class="status-indicator"></span></td>
        `;
        scheduleTableBody.appendChild(row);
    }
}

// Обновление статуса программы
function updateScheduleStatus() {
    const rows = scheduleTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const statusCell = row.querySelector('.status-indicator');
        statusCell.classList.remove('active');
    });
    const activeRow = scheduleTableBody.children[currentTrack];
    if (activeRow) {
        const statusCell = activeRow.querySelector('.status-indicator');
        statusCell.classList.add('active');
    }
}

// Форматирование времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Рассчитать трек и время
function calculateStartPosition() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    currentTrack = hours;  // Программа соответствует часу
    startFromTime = minutes * 60 + seconds;  // Текущее время в секундах
}

// Начать воспроизведение трека
function playTrack() {
    audioPlayer.src = `audio/program${currentTrack.toString().padStart(2, '0')}.mp3`;
    trackName.textContent = `Now Playing: audio/program${currentTrack.toString().padStart(2, '0')}.mp3`;
    audioPlayer.currentTime = startFromTime;
    audioPlayer.play();

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        progressBar.value = (currentTime / duration) * 100;
        currentTimeElement.textContent = formatTime(currentTime);
    });

    updateScheduleStatus();  // Обновить статус активного трека
}

// Инициализация
function init() {
    createSchedule();
    calculateStartPosition();
    playTrack();
}

window.addEventListener('DOMContentLoaded', init);
