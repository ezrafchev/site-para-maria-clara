document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializar AOS com configurações premium
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Preloader premium
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Show loader for 1.5 seconds
    });

    // Enhanced cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Smooth cursor following
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Enhanced hover effects
    const interactiveElements = document.querySelectorAll('a, button, .swiper-slide, .event');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(2)';
            cursor.style.borderColor = 'var(--secondary-color)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });

    // Enhanced mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Enhanced smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Enhanced parallax effects
    const moon = document.querySelector('.moon');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const scrollPercent = scrollPosition / window.innerHeight;
        
        // Moon parallax
        if (moon) {
            moon.style.transform = `translateY(${scrollPosition * 0.3}px) rotate(${scrollPosition * 0.05}deg)`;
        }
        
        // Hero parallax
        if (hero && scrollPosition < window.innerHeight) {
            hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });

    // Enhanced stars creation
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const size = Math.random() * 4 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${2 + Math.random() * 2}s`;
            starsContainer.appendChild(star);
        }
    }

    // Enhanced typing effect for love message
    const loveMessage = document.querySelector('.love-message');
    if (loveMessage) {
        const text = loveMessage.textContent;
        loveMessage.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                loveMessage.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Faster typing
            }
        }

        // Start typing when message section is visible
        const messageObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500); // Delay start
                messageObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        messageObserver.observe(document.querySelector('#mensagem'));
    }

    // Enhanced back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }

    // Enhanced music player with playlist
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const prevButton = document.getElementById('prev-song');
    const nextButton = document.getElementById('next-song');
    const volumeSlider = document.getElementById('volume-slider');
    const songTitle = document.getElementById('song-title');
    let isMusicPlaying = false;
    let currentSongIndex = 0;

    // Romantic playlist (using web-based demo audio for functionality)
    const playlist = [
        {
            title: "Música Romântica 1",
            src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJmMmQQAQgpGCkEKRwpHCkYKQgpBCj4KQwpGCkYKQgpBCj4"
        },
        {
            title: "Serenata de Amor",
            src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJmMmQQAQgpGCkEKRwpHCkYKQgpBCj4KQwpGCkYKQgpBCj4"
        },
        {
            title: "Melodia do Coração",
            src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJmMmQQAQgpGCkEKRwpHCkYKQgpBCj4KQwpGCkYKQgpBCj4"
        }
    ];

    if (musicToggle && backgroundMusic) {
        // Set initial volume
        backgroundMusic.volume = 0.7;

        function loadSong(index) {
            const song = playlist[index];
            backgroundMusic.src = song.src;
            songTitle.textContent = song.title;
        }

        function playMusic() {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
            }).catch((error) => {
                console.log("Music autoplay blocked:", error);
                // Show user-friendly message
                showMusicMessage("Clique para tocar música 🎵");
            });
        }

        function pauseMusic() {
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.classList.remove('playing');
        }

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
            loadSong(currentSongIndex);
            if (isMusicPlaying) {
                playMusic();
            }
        }

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            loadSong(currentSongIndex);
            if (isMusicPlaying) {
                playMusic();
            }
        }

        function showMusicMessage(message) {
            const musicMessage = document.createElement('div');
            musicMessage.className = 'music-message';
            musicMessage.textContent = message;
            musicMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--love-gradient);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                z-index: 10000;
                animation: slideInRight 0.5s ease-out;
            `;
            document.body.appendChild(musicMessage);
            setTimeout(() => musicMessage.remove(), 3000);
        }

        // Load initial song
        loadSong(currentSongIndex);

        // Event listeners
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

        if (nextButton) {
            nextButton.addEventListener('click', nextSong);
        }

        if (prevButton) {
            prevButton.addEventListener('click', prevSong);
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                backgroundMusic.volume = e.target.value / 100;
            });
        }

        // Auto-play next song when current ends
        backgroundMusic.addEventListener('ended', nextSong);

        // Try to play music on first user interaction
        document.body.addEventListener('click', () => {
            if (!isMusicPlaying) {
                playMusic();
            }
        }, { once: true });
    }

    // Enhanced Swiper for gallery
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.gallery-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1.5,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // Add floating hearts animation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = 'floatUp 6s linear infinite';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Add floating hearts CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create floating hearts periodically
    setInterval(createFloatingHeart, 3000);

    // Enhanced timeline animations
    const timelineEvents = document.querySelectorAll('.event');
    timelineEvents.forEach((event, index) => {
        event.style.animationDelay = `${index * 0.2}s`;
    });

    // Add magical sparkle effect on hover for special elements
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Add sparkle effect to love message
    const sparkleElements = document.querySelectorAll('.love-message, .section-title');
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    createSparkle(x, y);
                }, i * 100);
            }
        });
    });

    // Love Counter - Days Together
    function initLoveCounter() {
        const startDate = new Date('2015-06-24'); // June 24, 2015
        const daysElement = document.getElementById('days-together');
        const hoursElement = document.getElementById('hours-together');
        const minutesElement = document.getElementById('minutes-together');

        function updateCounter() {
            const now = new Date();
            const diffTime = Math.abs(now - startDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

            if (daysElement) {
                animateCounterTo(daysElement, diffDays);
            }
            if (hoursElement) {
                animateCounterTo(hoursElement, diffHours);
            }
            if (minutesElement) {
                animateCounterTo(minutesElement, diffMinutes);
            }
        }

        function animateCounterTo(element, targetValue) {
            const currentValue = parseInt(element.textContent) || 0;
            const increment = targetValue > currentValue ? 1 : -1;
            const duration = Math.abs(targetValue - currentValue) * 20; // Animation speed

            if (currentValue !== targetValue) {
                const step = () => {
                    const newValue = parseInt(element.textContent) + increment;
                    element.textContent = newValue;
                    if (newValue !== targetValue) {
                        setTimeout(step, Math.max(1, duration / Math.abs(targetValue - currentValue)));
                    }
                };
                setTimeout(step, 50);
            }
        }

        // Update counter immediately and then every minute
        updateCounter();
        setInterval(updateCounter, 60000);
    }

    // Initialize love counter when section is visible
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initLoveCounter();
            counterObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.love-counter');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    // Romantic Quote Generator
    const romanticQuotes = [
        "Você é minha pessoa favorita em todos os universos possíveis.",
        "Cada batida do meu coração sussurra seu nome.",
        "Em seus olhos encontro meu lar, em seus braços encontro minha paz.",
        "Você transformou meus sonhos em realidade simplesmente existindo.",
        "Nosso amor é a música mais bela que meu coração já conheceu.",
        "Com você, cada dia é uma nova página de nossa história de amor.",
        "Você é minha estrela guia em todas as tempestades da vida.",
        "Amar você é respirar - natural, essencial, impossível de parar.",
        "Seu sorriso é minha dose diária de felicidade.",
        "Você é a resposta para orações que eu nem sabia que estava fazendo.",
        "Em um mundo cheio de arte, você é minha obra-prima favorita.",
        "Nosso amor é eterno como as estrelas e infinito como o universo.",
        "Você fez do amor uma linguagem que minha alma entende perfeitamente.",
        "Cada momento com você é um presente que guardo no coração.",
        "Você é meu hoje, meu amanhã e meu para sempre."
    ];

    function initQuoteGenerator() {
        const quoteElement = document.getElementById('daily-quote');
        const newQuoteBtn = document.getElementById('new-quote-btn');

        function displayRandomQuote() {
            const randomIndex = Math.floor(Math.random() * romanticQuotes.length);
            const quote = romanticQuotes[randomIndex];
            
            if (quoteElement) {
                // Fade out
                quoteElement.style.opacity = '0';
                quoteElement.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    quoteElement.textContent = quote;
                    // Fade in
                    quoteElement.style.opacity = '1';
                    quoteElement.style.transform = 'translateY(0)';
                }, 300);
            }
        }

        function displayDailyQuote() {
            // Use date as seed for consistent daily quote
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            const quoteIndex = dayOfYear % romanticQuotes.length;
            
            if (quoteElement) {
                quoteElement.textContent = romanticQuotes[quoteIndex];
                quoteElement.style.opacity = '1';
                quoteElement.style.transform = 'translateY(0)';
            }
        }

        // Initialize with daily quote
        displayDailyQuote();

        // Add click handler for new quote button
        if (newQuoteBtn) {
            newQuoteBtn.addEventListener('click', () => {
                displayRandomQuote();
                // Add click animation
                newQuoteBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    newQuoteBtn.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }

    // Initialize quote generator
    initQuoteGenerator();

    // Photo Upload Functionality
    function initPhotoUpload() {
        const uploadArea = document.getElementById('upload-area');
        const photoInput = document.getElementById('photo-input');
        const uploadedPreview = document.getElementById('uploaded-preview');
        const previewImg = document.getElementById('preview-img');
        const removePhotoBtn = document.getElementById('remove-photo');

        if (!uploadArea || !photoInput) return;

        // Click to upload
        uploadArea.addEventListener('click', () => {
            photoInput.click();
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });

        // File input change
        photoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });

        // Remove photo
        if (removePhotoBtn) {
            removePhotoBtn.addEventListener('click', () => {
                uploadedPreview.style.display = 'none';
                uploadArea.style.display = 'flex';
                photoInput.value = '';
            });
        }

        function handleFileUpload(file) {
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione apenas arquivos de imagem.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                uploadArea.style.display = 'none';
                uploadedPreview.style.display = 'block';
                
                // Add to gallery (simulation)
                setTimeout(() => {
                    showUploadSuccess();
                }, 500);
            };
            reader.readAsDataURL(file);
        }

        function showUploadSuccess() {
            const successMessage = document.createElement('div');
            successMessage.className = 'upload-success';
            successMessage.innerHTML = '✅ Foto adicionada com sucesso à nossa galeria de amor!';
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--love-gradient);
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                z-index: 10000;
                animation: popIn 0.5s ease-out;
                text-align: center;
                box-shadow: var(--shadow-xl);
            `;
            
            document.body.appendChild(successMessage);
            setTimeout(() => successMessage.remove(), 3000);
        }
    }

    // Initialize photo upload
    initPhotoUpload();

    console.log('💖 Premium love site loaded with enhanced features! 💖');
});
