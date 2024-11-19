document.addEventListener('DOMContentLoaded', (event) => {
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
    const links = document.querySelectorAll('a');
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

    // Animação suave de rolagem para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
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

    // Efeito de fade-in para seções
    const sections = document.querySelectorAll('section');
    const fadeInSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(fadeInSection, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Efeito de digitação para a mensagem de amor
    const loveMessage = document.querySelector('.love-message');
    const text = loveMessage.textContent;
    loveMessage.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            loveMessage.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Inicia o efeito de digitação quando a seção de mensagem estiver visível
    const messageObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            messageObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });

    messageObserver.observe(document.querySelector('#mensagem'));

    // Parallax effect for gallery images
    const galleryImages = document.querySelectorAll('.gallery-img');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        galleryImages.forEach((img, index) => {
            img.style.transform = `translateY(${scrollPosition * 0.1 * (index + 1)}px)`;
        });
    });

    // Botão "Voltar ao topo"
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
