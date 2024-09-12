// Функция для воспроизведения аудиофайлов по текущему времени
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

  // Получаем текущее время (часы и минуты)
  var now = new Date();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();
  var currentSecond = now.getSeconds();

  // Выбираем соответствующую программу на основе текущего часа
  var selectedAudioFile = playlist[currentHour];
  audio.src = selectedAudioFile;

  // Устанавливаем текущее время аудио в 0 (начало трека)
  audio.currentTime = 0;

  // Запускаем воспроизведение программы
  audio.play().then(() => {
    console.log(`Playing ${selectedAudioFile}`);

    // Запускаем джингл за 15 секунд до конца текущего часа
    var jingleStart = (60 * 60 - (currentMinute * 60 + currentSecond) - 15) * 1000; // 15 секунд до конца
    setTimeout(() => {
      jingle.play().catch((error) => {
        console.error("Jingle playback failed:", error);
      });
    }, jingleStart);

    // Запускаем таймер для остановки программы и перехода к следующему файлу в плейлисте
    var timeToNextHour = (60 * 60 - (currentMinute * 60 + currentSecond)) * 1000; // До следующего часа
    setTimeout(() => {
      audio.pause();
      console.log("Program ended");

      // Устанавливаем источник для следующего часа
      var nextHour = (currentHour + 1) % 24;
      var nextAudioFile = playlist[nextHour];
      audio.src = nextAudioFile;

      // Устанавливаем текущее время аудио в 0 (начало следующего трека)
      audio.currentTime = 0;

      // Запускаем следующий трек
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
