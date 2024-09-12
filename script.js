// Функция для старта программы и отображения таблицы
function startProgram() {
  playAudioByTime(); // Запуск программы

  // Скрываем кнопку запуска
  var startButton = document.getElementById('startButton');
  startButton.style.display = 'none';

  // Отображаем таблицу с расписанием программ
  loadSchedule();
}

// Функция для загрузки и отображения таблицы расписания программ
function loadSchedule() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'schedule.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var scheduleContainer = document.getElementById('scheduleContainer');
        scheduleContainer.innerHTML = xhr.responseText;
        scheduleContainer.style.display = 'block'; // Показываем таблицу

        // Обновляем таблицу с расписанием
        updateSchedule();
      } else {
        console.error("Failed to load schedule. Status:", xhr.status);
      }
    }
  };
  xhr.send();
}

// Функция для обновления таблицы расписания
function updateSchedule() {
  var now = new Date();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();
  var currentSecond = now.getSeconds();

  var rows = document.querySelectorAll('#scheduleContainer tbody tr');
  rows.forEach((row, index) => {
    var statusCell = row.querySelector('.status');
    var startTimeCell = row.querySelector('.startTime');
    var programNameCell = row.querySelector('.programName');
    var remainingTimeCell = row.querySelector('.remainingTime');

    var programHour = index;
    var programStart = new Date();
    programStart.setHours(programHour, 0, 0);
    var programEnd = new Date(programStart);
    programEnd.setMinutes(programStart.getMinutes() + 59);
    programEnd.setSeconds(programStart.getSeconds() + 45);

    var programName = `Program ${programHour}`;
    var remainingTime = (programEnd - now) / 1000; // Время в секундах

    // Обновляем состояние текущей программы
    if (index === currentHour && now >= programStart && now < programEnd) {
      statusCell.innerHTML = '<span style="color:green;">&#8226;</span>'; // Зеленый кружок
    } else {
      statusCell.innerHTML = '';
    }

    startTimeCell.textContent = programStart.toTimeString().slice(0, 5);
    programNameCell.textContent = programName;

    var minutes = Math.floor(remainingTime / 60);
    var seconds = Math.floor(remainingTime % 60);
    remainingTimeCell.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });
}

// Функция для воспроизведения аудиофайла по текущему времени
function playAudioByTime() {
  var audio = document.getElementById('audioPlayer');
  var jingle = new Audio('/indexmod-radio/audio/jingle.mp3'); // Джингл

  var playlist = [
    "/indexmod-radio/audio/program00.mp3",  // 00:00
    "/indexmod-radio/audio/program01.mp3",  // 01:00
    "/indexmod-radio/audio/program02.mp3",  // 02:00
    "/indexmod-radio/audio/program03.mp3",  // 03:00
    "/indexmod-radio/audio/program04.mp3",  // 04:00
    "/indexmod-radio/audio/program05.mp3",  // 05:00
    "/indexmod-radio/audio/program06.mp3",  // 06:00
    "/indexmod-radio/audio/program07.mp3",  // 07:00
    "/indexmod-radio/audio/program08.mp3",  // 08:00
    "/indexmod-radio/audio/program09.mp3",  // 09:00
    "/indexmod-radio/audio/program10.mp3",  // 10:00
    "/indexmod-radio/audio/program11.mp3",  // 11:00
    "/indexmod-radio/audio/program12.mp3",  // 12:00
    "/indexmod-radio/audio/program13.mp3",  // 13:00
    "/indexmod-radio/audio/program14.mp3",  // 14:00
    "/indexmod-radio/audio/program15.mp3",  // 15:00
    "/indexmod-radio/audio/program16.mp3",  // 16:00
    "/indexmod-radio/audio/program17.mp3",  // 17:00
    "/indexmod-radio/audio/program18.mp3",  // 18:00
    "/indexmod-radio/audio/program19.mp3",  // 19:00
    "/indexmod-radio/audio/program20.mp3",  // 20:00
    "/indexmod-radio/audio/program21.mp3",  // 21:00
    "/indexmod-radio/audio/program22.mp3",  // 22:00
    "/indexmod-radio/audio/program23.mp3"   // 23:00
  ];

  var now = new Date();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();
  var currentSecond = now.getSeconds();

  var selectedAudioFile = playlist[currentHour];
  audio.src = selectedAudioFile;
  audio.currentTime = 0;

  audio.play().then(() => {
    console.log(`Playing ${selectedAudioFile}`);

    var jingleStart = (60 * 60 - (currentMinute * 60 + currentSecond) - 15) * 1000; // 15 секунд до конца
    setTimeout(() => {
      jingle.play().catch((error) => {
        console.error("Jingle playback failed:", error);
      });
    }, jingleStart);

    var timeToNextHour = (60 * 60 - (currentMinute * 60 + currentSecond)) * 1000; // До следующего часа
    setTimeout(() => {
      audio.pause();
      console.log("Program ended");

      var nextHour = (currentHour + 1) % 24;
      var nextAudioFile = playlist[nextHour];
      audio.src = nextAudioFile;
      audio.currentTime = 0;

      audio.play().then(() => {
        console.log(`Playing ${nextAudioFile}`);
      }).catch((error) => {
        console.error("Next hour's audio playback failed:", error);
      });

    }, timeToNextHour);

  }).catch((error) => {
    console.error("Audio playback failed:", error);
  });
}
