function playAudioByTime() {
  var audio = document.getElementById('audioPlayer');
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

  // Получаем текущее время (часы и минуты)
  var now = new Date();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();

  // Выбираем соответствующую программу на основе текущего часа
  var selectedAudioFile = playlist[currentHour];
  audio.src = selectedAudioFile;

  // Рассчитываем время для начала воспроизведения с учётом минут
  var startTimeInSeconds = currentMinute * 60;

  // Запускаем воспроизведение с определённой минуты
  audio.currentTime = startTimeInSeconds;

  // Воспроизводим файл
  audio.play().then(() => {
    console.log(`Playing ${selectedAudioFile} from ${currentMinute} minute`);
  }).catch((error) => {
    console.error("Audio playback failed:", error);
  });
}

// Запускаем функцию при загрузке страницы
window.onload = playAudioByTime;
