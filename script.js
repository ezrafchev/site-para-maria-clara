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

    // Enhanced music player
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    if (musicToggle && backgroundMusic) {
        function playMusic() {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
            }).catch((error) => {
                console.log("Music autoplay blocked:", error);
            });
        }

        function pauseMusic() {
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.classList.remove('playing');
        }

        // Handle music toggle
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

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

    console.log('💖 Premium love site loaded with enhanced features! 💖');
});
