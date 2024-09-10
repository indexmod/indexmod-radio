// Функция для воспроизведения аудиофайла
function playAudio() {
  var audio = document.getElementById('audioPlayer');

  // Проверка: файл должен быть доступен
  if (audio) {
    audio.play().then(() => {
      console.log("Audio started playing");
    }).catch((error) => {
      console.error("Audio playback failed: ", error);
    });
  } else {
    console.error("Audio element not found");
  }
}
