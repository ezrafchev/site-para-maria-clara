let player;
let isMusicPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '65aNPjAwGnw',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'loop': 1,
            'fs': 0,
            'cc_load_policy': 0,
            'iv_load_policy': 3
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    const musicToggle = document.getElementById('music-toggle');
    musicToggle.addEventListener('click', toggleMusic);
    
    // Tenta iniciar a música automaticamente
    playMusic();

    // Adiciona um evento de interação do usuário para iniciar a música
    document.body.addEventListener('click', () => {
        if (!isMusicPlaying) {
            playMusic();
        }
    }, { once: true });
}

function playMusic() {
    player.playVideo();
    isMusicPlaying = true;
    updateMusicToggleIcon();
}

function pauseMusic() {
    player.pauseVideo();
    isMusicPlaying = false;
    updateMusicToggleIcon();
}

function toggleMusic() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function updateMusicToggleIcon() {
    const musicToggle = document.getElementById('music-toggle');
    musicToggle.innerHTML = isMusicPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // ... (rest of the existing code remains the same) ...

    // Remova o código antigo relacionado ao player de música e substitua pelo novo código acima
});
