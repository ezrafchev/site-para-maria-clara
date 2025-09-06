document.addEventListener('DOMContentLoaded', (event) => {
    // Apple-style AOS initialization with refined settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    // Apple-style preloader with smooth fade
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1200);
    });

    // Enhanced cursor with Apple-style precision
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Smoother cursor following with Apple-style easing
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        if (cursorFollower) {
            cursorFollower.style.left = cursorX + 'px';
            cursorFollower.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Apple-style hover effects with refined transitions
    const interactiveElements = document.querySelectorAll('a, button, .swiper-slide, .event, .promise-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursor.style.opacity = '0.8';
            }
            if (cursorFollower) {
                cursorFollower.style.transform = 'scale(1.8)';
                cursorFollower.style.opacity = '0.6';
            }
        });
        element.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursor.style.opacity = '1';
            }
            if (cursorFollower) {
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.opacity = '1';
            }
        });
    });

    // Apple-style mobile menu with smooth animations
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            // Apple-style icon transition
            menuToggle.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Add smooth scale animation
            menuToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                menuToggle.style.transform = 'scale(1)';
            }, 150);
        });

        // Close menu when clicking on a link with smooth transition
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Apple-style smooth scrolling with refined easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Apple-style header scroll effect with refined transitions
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // Enhanced parallax effects with Apple-style smoothness
    const moon = document.querySelector('.moon');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const scrollPercent = scrollPosition / window.innerHeight;
        
        // Refined moon parallax
        if (moon && scrollPosition < window.innerHeight) {
            const moonTransform = scrollPosition * 0.2;
            const moonRotation = scrollPosition * 0.02;
            moon.style.transform = `translateY(${moonTransform}px) rotate(${moonRotation}deg)`;
        }
        
        // Subtle hero parallax
        if (hero && scrollPosition < window.innerHeight) {
            const heroTransform = scrollPosition * 0.3;
            hero.style.transform = `translateY(${heroTransform}px)`;
        }
    }, { passive: true });

    // Apple-style enhanced stars creation
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${2 + Math.random() * 2}s`;
            starsContainer.appendChild(star);
        }
    }

    // Apple-style refined typing effect for love message
    const loveMessage = document.querySelector('.love-message');
    if (loveMessage) {
        const text = loveMessage.textContent;
        loveMessage.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                loveMessage.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40); // Smoother typing speed
            }
        }

        // Start typing when message section is visible
        const messageObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 800); // Refined delay
                messageObserver.unobserve(entries[0].target);
            }
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        const messageSection = document.querySelector('#mensagem');
        if (messageSection) {
            messageObserver.observe(messageSection);
        }
    }

    // Apple-style back to top button with refined behavior
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.pageYOffset > 400) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }, 10);
        }, { passive: true });

        backToTopButton.addEventListener('click', () => {
            // Apple-style smooth scroll to top
            const scrollToTop = () => {
                const currentPosition = window.pageYOffset;
                if (currentPosition > 0) {
                    window.scrollTo(0, currentPosition - currentPosition / 8);
                    requestAnimationFrame(scrollToTop);
                }
            };
            scrollToTop();
        });
    }

    // Apple-style enhanced music player
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    if (musicToggle && backgroundMusic) {
        // Set volume for better user experience
        backgroundMusic.volume = 0.3;
        
        function playMusic() {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
                musicToggle.setAttribute('aria-label', 'Pausar música');
            }).catch((error) => {
                console.log("Music autoplay blocked:", error);
            });
        }

        function pauseMusic() {
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.classList.remove('playing');
            musicToggle.setAttribute('aria-label', 'Tocar música');
        }

        // Handle music toggle with Apple-style feedback
        musicToggle.addEventListener('click', () => {
            // Add tactile feedback
            musicToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                musicToggle.style.transform = 'scale(1)';
            }, 150);
            
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

        // Try to play music on first user interaction
        document.body.addEventListener('click', () => {
            if (!isMusicPlaying && backgroundMusic.paused) {
                playMusic();
            }
        }, { once: true });
    }

    // Apple-style enhanced Swiper for gallery
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.gallery-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            speed: 600, // Apple-style smooth transitions
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 80,
                modifier: 2,
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
                    coverflowEffect: {
                        rotate: 30,
                        depth: 100,
                    }
                },
                768: {
                    slidesPerView: 2,
                    coverflowEffect: {
                        rotate: 25,
                        depth: 90,
                    }
                },
                1024: {
                    slidesPerView: 3,
                    coverflowEffect: {
                        rotate: 20,
                        depth: 80,
                    }
                },
            },
        });
    }

    // Apple-style refined floating hearts animation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 15 + 10 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = 'floatUp 8s ease-out infinite';
        heart.style.opacity = Math.random() * 0.4 + 0.2;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 8000);
    }

    // Apple-style floating hearts CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(-110vh) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create floating hearts with refined frequency
    setInterval(createFloatingHeart, 4000);

    // Apple-style timeline animations with staggered delays
    const timelineEvents = document.querySelectorAll('.event');
    timelineEvents.forEach((event, index) => {
        event.style.animationDelay = `${index * 0.15}s`;
    });

    // Apple-style magical sparkle effect with refined behavior
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '16px';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 1200);
    }

    // Apple-style sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(90deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(1.8) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Add refined sparkle effect to special elements
    const sparkleElements = document.querySelectorAll('.love-message, .section-title, .promise-card');
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            // Create fewer, more elegant sparkles
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    createSparkle(x, y);
                }, i * 150);
            }
        });
    });

    // Apple-style refined scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe content sections for refined animations
    document.querySelectorAll('.content-section, .promise-card').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });

    console.log('✨ Apple-style premium love site loaded with enhanced features! ✨');
});
