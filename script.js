
document.addEventListener('DOMContentLoaded', (event) => {
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
        moon.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

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
    const loveMessage = document.querySelector('#mensagem p');
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
});
