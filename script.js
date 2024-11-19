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

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });

    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Efeito hover nos links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Animação da lua
    const moon = document.querySelector('.moon');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        moon.style.transform = `translateY(${scrollPosition * 0.5}px) rotate(${scrollPosition * 0.1}deg)`;
    });

    // Criação de estrelas
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }

    // Contagem regressiva
    const countdownDate = new Date("2024-12-31T00:00:00").getTime();
    const countdown = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdown.innerHTML = "O grande dia chegou!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});
