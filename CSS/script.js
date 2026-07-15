document.addEventListener('DOMContentLoaded', () => {

    /* ===== FEATHER ICONS ===== */
    feather.replace({
        width: 20,
        height: 20,
        'stroke-width': 2
    });


    /* ===== HAMBURGER MENU ===== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.navbar-nav');
    const overlay = document.getElementById('overlay');

    function openMenu() {
        navMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // ganti icon jadi X
        hamburger.setAttribute('data-feather', 'x');
        feather.replace({ width: 20, height: 20, 'stroke-width': 2 });
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // kembalikan icon menu
        hamburger.setAttribute('data-feather', 'menu');
        feather.replace({ width: 20, height: 20, 'stroke-width': 2 });
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Tutup menu saat klik overlay
    overlay.addEventListener('click', closeMenu);

    // Tutup menu saat klik salah satu link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    /* ===== NAVBAR SHADOW ON SCROLL ===== */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.boxShadow = '0 4px 24px rgba(92,51,23,.12)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });


    /* ===== ACTIVE NAV LINK ON SCROLL ===== */
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.navbar-nav a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(sec => observer.observe(sec));


    /* ===== CARD ENTRANCE ANIMATION ===== */
    const cards = document.querySelectorAll('.card, .testimonial');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${i * 0.1}s`;
                entry.target.classList.add('animate-in');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        cardObserver.observe(card);
    });

});