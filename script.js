document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });

    // ... (rest of the existing code)

    // Player de música
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    function playMusic() {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch((error) => {
            console.log("Erro ao tocar música:", error);
        });
    }

    // Tenta iniciar a música automaticamente
    playMusic();

    // Adiciona um evento de interação do usuário para iniciar a música
    document.body.addEventListener('click', () => {
        if (!isMusicPlaying) {
            playMusic();
        }
    }, { once: true });

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            playMusic();
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // ... (rest of the existing code)
});
